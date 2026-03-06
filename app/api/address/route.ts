import { STATUS_CODES } from "@/constants";
import { AddressType } from "@/lib/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const userId = req.headers.get("x-user-id");
    if (!userId)
      return NextResponse.json(
        {
          error: "No account found",
        },
        { status: STATUS_CODES.NOT_AUTHENTICATED },
      );
    const address = await prisma.address.findFirst({
      where: {
        accountId: Number(userId),
        type: AddressType.SHIPPING,
      },
      orderBy: [
        { isDefault: "desc" }, // default first
        { updatedAt: "desc" }, // then recent
      ],
    });

    if (!address)
      return NextResponse.json({
        data: null,
        message: "No address found",
      });

    const [firstName, ...rest] = address.fullName.split(" ");

    return NextResponse.json(
      {
        data: {
          firstName,
          lastName: rest.join(" "),
          phone: address.phoneNumber,
          address: address.line1,
          city: address.city,
          state: address.state,
          zipCode: address.postalCode,
          country: address.country,
        },
      },
      { status: STATUS_CODES.SUCCESS },
    );
  } catch (err: any) {
    console.log(err);
    return NextResponse.json(
      {
        error: err,
        message: "Some error occured",
      },
      { status: STATUS_CODES.INTERNAL_SERVER_ERROR },
    );
  }
}
