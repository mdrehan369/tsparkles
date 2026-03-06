"use server";

import { Address } from "@/lib/generated/prisma/client";
import { AddressCreateInput } from "@/lib/generated/prisma/models";
import { prisma } from "@/lib/prisma";
import { CheckoutFormValues } from "@/schemas/checkout";
import { buildComparableAddress, isSameAddress } from "@/utils/utilityMethods";

export const findExistingAddress = async (
  accountId: number,
  comparable: ReturnType<typeof buildComparableAddress>,
) => {
  const addresses = await prisma.address.findMany({
    where: { accountId },
  });

  return addresses.find((addr) =>
    isSameAddress(buildComparableAddress(addr), comparable),
  );
};

export const saveCheckoutAddresses = async (
  accountId: number,
  data: CheckoutFormValues,
) => {
  return await prisma.$transaction(async (tx) => {
    await tx.address.deleteMany({
      where: { accountId },
    });

    const address: any = {
      fullName: `${data.firstName} ${data.lastName}`,
      phoneNumber: data.phone,
      line1: data.address,
      city: data.city,
      state: data.state,
      postalCode: data.zipCode,
      country: data.country,
      isDefault: true,
    };

    const shippingAddress = await tx.address.create({
      data: {
        ...address,
        account: { connect: { id: accountId } },
        type: "SHIPPING",
      },
    });

    let billingAddressData = address;

    // 3️⃣ Create Billing Address if different
    if (!data.sameAsShipping)
      billingAddressData = {
        fullName: `${data.billingFirstName} ${data.billingLastName}`,
        phoneNumber: data.phone,
        line1: data.billingAddress!,
        city: data.billingCity!,
        state: data.billingState!,
        postalCode: data.billingZipCode!,
        country: data.country,
        isDefault: false,
      };

    const billingAddress = await tx.address.create({
      data: {
        ...billingAddressData,
        account: { connect: { id: accountId } },
        type: "BILLING",
      },
    });

    return {
      shippingAddress,
      billingAddress,
    };
  });
};

export const getRecentlyUsedAddress = async (accountId: number) => {
  const address = await prisma.address.findFirst({
    where: {
      accountId,
      type: "SHIPPING",
    },
    orderBy: [
      { isDefault: "desc" }, // default first
      { updatedAt: "desc" }, // then recent
    ],
  });

  if (!address) return null;

  const [firstName, ...rest] = address.fullName.split(" ");

  return {
    firstName,
    lastName: rest.join(" "),
    phone: address.phoneNumber,
    address: address.line1,
    city: address.city,
    state: address.state,
    zipCode: address.postalCode,
    country: address.country,
  };
};
