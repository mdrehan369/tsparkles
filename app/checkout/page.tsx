"use client";

import { useState } from "react";
import CheckoutForm from "@/components/checkout/checkout-form";
import OrderSummary from "@/components/cart/order-summary";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { CartItemWithProduct } from "@/types/cart.types";
import { useQuery } from "@tanstack/react-query";
import { getCartQuery } from "@/queries/cart.queries";
import { saveCheckoutAddresses } from "@/actions/address";
import { useAuth } from "@/context/auth-context";
import Payment from "@/components/payments/razorpay";
import { client } from "@/config/axios.config";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();
  const { user, openLogin } = useAuth();
  const [selectedShipping, setSelectedShipping] = useState("standard");
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);

  const { data: cartItems } = useQuery<CartItemWithProduct[]>({
    queryKey: ["Cart"],
    queryFn: getCartQuery,
    initialData: [],
  });

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.Product.price * item.quantity,
    0,
  );
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const shippingCost = selectedShipping === "express" ? 15.0 : 0;

  const handleFormSubmit = async (formData: any) => {
    if (!user) openLogin();
    else {
      setIsPaymentProcessing(true);
      const response = await saveCheckoutAddresses(user.id, formData);
      console.log(response);

      try {
        const orderId: string = await createOrderId();
        const options = {
          key: process.env.NEXT_PUBLIC_KEY_ID,
          amount: subtotal * 100,
          currency: "INR",
          name: "Firdaus Collective",
          description: "description",
          order_id: orderId,
          handler: async function (response: any) {
            const data = {
              orderCreationId: orderId,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            };

            const verificationResponse = await client.post(
              "/razorpay/verify",
              data,
            );
            router.push(`/order/${verificationResponse.data.data.slug}`);
            console.log(verificationResponse.data);
          },
          prefill: {
            name: formData.firstName,
            email: user.email,
          },
          theme: {
            color: "#3399cc",
          },
        };
        const paymentObject = new (window as any).Razorpay(options);
        paymentObject.open();
      } catch (error) {
        console.log(error);
      } finally {
        setIsPaymentProcessing(false);
      }
    }
  };

  const createOrderId = async () => {
    try {
      const response = await client.post("/razorpay/order");
      if (response.status >= 400) {
        throw new Error("Network response was not ok");
      }

      const data = response.data;
      return data.orderId;
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 pt-20 pb-16">
      <Payment />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/cart"
                className="text-gray-600 hover:text-purple-600"
              >
                Cart
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <span className="text-gray-900 font-semibold">Checkout</span>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Checkout</h1>
          <p className="text-gray-600">
            Complete your purchase in just a few steps
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <CheckoutForm
              onSubmit={handleFormSubmit}
              isPaymentProcessing={isPaymentProcessing}
            />
          </div>

          {/* Order Summary Sidebar */}
          <div>
            <OrderSummary
              subtotal={subtotal}
              shippingCost={shippingCost}
              tax={0}
              itemCount={itemCount}
              isCheckout={true}
              checkoutLabel="Complete Purchase"
            />

            {/* Order Items Preview */}
            <div className="mt-6 bg-yellow-50 rounded-xl border border-amber-300 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Order Items</h3>
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center py-2 border-b border-amber-300 last:border-0"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {item.Product.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">
                      Rs. {(item.Product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
