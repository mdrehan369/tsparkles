"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema, CheckoutFormValues } from "@/schemas/checkout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import ShippingMethodSelector from "./shipping-method-selector";
import PaymentMethod from "./payment-method";
import { Mail, MapPin, Phone } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getRecentAddressQuery } from "@/queries/address.queries";
import { useEffect } from "react";
import { useAuth } from "@/context/auth-context";

const SHIPPING_METHODS = [
  {
    id: "standard",
    name: "Standard Shipping",
    description: "Delivery via USPS or UPS",
    cost: 0,
    estimatedDays: "5-7 business days",
    icon: "truck" as const,
  },
  // {
  //   id: "express",
  //   name: "Express Shipping",
  //   description: "Fastest delivery available",
  //   cost: 15,
  //   estimatedDays: "2-3 business days",
  //   icon: "zap" as const,
  // },
];

interface CheckoutFormProps {
  onSubmit?: (data: CheckoutFormValues) => void;
  isPaymentProcessing: boolean;
}

export default function CheckoutForm({
  onSubmit,
  isPaymentProcessing,
}: CheckoutFormProps) {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    getValues,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      country: "India",
      shippingMethod: "standard",
      sameAsShipping: true,
      email: user?.email,
    },
  });

  const { data } = useQuery({
    queryKey: ["Address"],
    queryFn: getRecentAddressQuery,
  });

  useEffect(() => {
    if (data) {
      reset({
        ...getValues(),
        ...data,
      });
    }
  }, [data]);

  const sameAsShipping = watch("sameAsShipping");
  const selectedShipping = watch("shippingMethod");

  return (
    <form
      onSubmit={handleSubmit((data) => onSubmit?.(data))}
      className="space-y-8"
    >
      {/* Shipping Address */}
      <div className="bg-amber-50 rounded-xl border-amber-300 border-[1px] p-6">
        <div className="flex items-center gap-3 mb-6">
          <MapPin size={20} />
          <h2 className="text-lg font-bold">Shipping Address</h2>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <Label className="mb-2">First Name *</Label>
            <Input {...register("firstName")} />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-2">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div>
            <Label className="mb-2">Last Name *</Label>
            <Input {...register("lastName")} />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-2">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <Label className="mb-2">Email *</Label>
            <div className="relative">
              <Input
                disabled
                type="email"
                {...register("email")}
                className="pl-10"
              />
              <Mail
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-2">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <Label className="mb-2">Phone *</Label>
            <div className="relative">
              <Input type="tel" {...register("phone")} className="pl-10" />
              <Phone
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2"
              />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-sm mt-2">
                {errors.phone.message}
              </p>
            )}
          </div>
        </div>

        <div className="mb-4">
          <Label className="mb-2">Street Address *</Label>
          <Input {...register("address")} />
          {errors.address && (
            <p className="text-red-500 text-sm mt-2">
              {errors.address.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <Input placeholder="City" {...register("city")} />
            {errors.city && (
              <p className="text-red-500 text-sm mt-2">{errors.city.message}</p>
            )}
          </div>
          <div>
            <Input placeholder="State" {...register("state")} />
            {errors.state && (
              <p className="text-red-500 text-sm mt-2">
                {errors.state.message}
              </p>
            )}
          </div>
          <div>
            <Input placeholder="ZIP" {...register("zipCode")} />
            {errors.zipCode && (
              <p className="text-red-500 text-sm mt-2">
                {errors.zipCode.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Shipping Method */}
      <div className="bg-amber-50 rounded-xl border border-amber-300 p-6">
        <ShippingMethodSelector
          methods={SHIPPING_METHODS}
          selectedId={selectedShipping}
          onSelect={(id) => setValue("shippingMethod", id)}
        />
      </div>

      {/* Billing */}
      <div className="bg-amber-50 rounded-xl border border-amber-300 p-6">
        <div className="flex items-start gap-3 mb-4 flex-col">
          <div className="flex items-center gap-3 mb-2">
            <MapPin size={20} />
            <h2 className="text-lg font-bold">Billing Address</h2>
          </div>
          <div className="flex items-center justify-start gap-2">
            <Checkbox
              checked={sameAsShipping}
              id="shipping"
              onCheckedChange={(val) =>
                setValue("sameAsShipping", Boolean(val))
              }
            />
            <Label htmlFor="shipping">Same as shipping</Label>
          </div>
        </div>

        {!sameAsShipping && (
          <div className="space-y-4">
            <div>
              <Input
                placeholder="First Name"
                {...register("billingFirstName")}
              />
              {errors.billingFirstName && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.billingFirstName.message}
                </p>
              )}
            </div>
            <div>
              <Input placeholder="Last Name" {...register("billingLastName")} />
              {errors.billingLastName && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.billingLastName.message}
                </p>
              )}
            </div>
            <div>
              <Input placeholder="Address" {...register("billingAddress")} />
              {errors.billingAddress && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.billingAddress.message}
                </p>
              )}
            </div>
            <div>
              <Input placeholder="City" {...register("billingCity")} />
              {errors.billingCity && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.billingCity.message}
                </p>
              )}
            </div>
            <div>
              <Input placeholder="State" {...register("billingState")} />
              {errors.billingState && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.billingState.message}
                </p>
              )}
            </div>
            <div>
              <Input placeholder="ZIP Code" {...register("billingZipCode")} />
              {errors.billingZipCode && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.billingZipCode.message}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="bg-amber-50 rounded-xl border-[1px] border-amber-300 p-6">
        <PaymentMethod />
      </div>

      <Button
        type="submit"
        className="w-full disabled:brightness-75"
        disabled={isPaymentProcessing}
      >
        Complete Purchase
      </Button>
    </form>
  );
}
