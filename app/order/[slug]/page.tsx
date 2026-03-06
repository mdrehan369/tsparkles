"use client";

import { useSearchParams } from "next/navigation";
import { OrderSuccess } from "@/components/orders/order-success";
import { OrderError } from "@/components/orders/order-error";
import { use } from "react";
import { useQuery } from "@tanstack/react-query";
import { getOrderStatusQuery } from "@/queries/order.queries";
import { useAuth } from "@/context/auth-context";
import { Skeleton } from "@/components/ui/skeleton";

export default function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { user } = useAuth();

  const { data, isFetching, isError } = useQuery({
    queryKey: ["Order"],
    queryFn: () => getOrderStatusQuery(slug),
  });

  if (isFetching) return <Skeleton className="w-3/4 h-3/4" />;

  // For demo purposes, you can use: ?status=error&code=PAYMENT_FAILED
  if (isError) {
    const errorCode = "PAYMENT_FAILED";
    const errorMessage = "Payment Could Not Be Processed";
    const errorDescription =
      "Your payment could not be processed at this time. Please check your card details and try again.";

    return (
      <OrderError
        errorCode={errorCode}
        errorMessage={errorMessage}
        errorDescription={errorDescription}
      />
    );
  }

  const orderNumber = data.slug;
  const email = user?.email;
  const estimatedDelivery = "3-5 business days";

  return (
    <OrderSuccess
      orderNumber={orderNumber}
      email={email}
      estimatedDelivery={estimatedDelivery}
    />
  );
}
