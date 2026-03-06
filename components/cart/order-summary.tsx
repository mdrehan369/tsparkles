"use client";

import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface OrderSummaryProps {
  subtotal: number;
  shippingCost?: number;
  tax?: number;
  discount?: number;
  itemCount: number;
  onCheckout?: () => void;
  checkoutLabel?: string;
  isCheckout?: boolean;
}

export default function OrderSummary({
  subtotal,
  shippingCost = 0,
  tax = 0,
  discount = 0,
  itemCount,
  onCheckout,
  checkoutLabel = "Proceed to Checkout",
  isCheckout = false,
}: OrderSummaryProps) {
  const total = subtotal + shippingCost + tax - discount;

  return (
    <div className="sticky top-8 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

      {/* Order Details */}
      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">
            Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})
          </span>
          <span className="font-semibold text-gray-900">
            Rs. {subtotal.toFixed(2)}
          </span>
        </div>

        {shippingCost > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Shipping</span>
            <span className="font-semibold text-gray-900">
              Rs. {shippingCost.toFixed(2)}
            </span>
          </div>
        )}

        {shippingCost === 0 && !isCheckout && (
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Shipping</span>
            <span className="text-green-600 font-semibold">Free</span>
          </div>
        )}

        {tax > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Tax</span>
            <span className="font-semibold text-gray-900">
              Rs. {tax.toFixed(2)}
            </span>
          </div>
        )}

        {discount > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Discount</span>
            <span className="font-semibold text-green-600">
              - Rs. {discount.toFixed(2)}
            </span>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="border-t border-amber-300 my-4"></div>

      {/* Total */}
      <div className="flex justify-between items-center mb-6">
        <span className="text-lg font-bold text-gray-900">Total</span>
        <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-amber-500 bg-clip-text text-transparent">
          Rs. {total.toFixed(2)}
        </span>
      </div>

      {/* CTA Button */}
      {onCheckout && (
        <Button
          onClick={onCheckout}
          className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3 rounded-lg transition-all shadow-md hover:shadow-lg"
        >
          <ShoppingCart size={18} className="mr-2" />
          {checkoutLabel}
        </Button>
      )}
      {/* Trust badges */}
      <div className="mt-6 pt-6 border-t border-amber-200 space-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
            <span className="text-green-600 font-bold text-xs">✓</span>
          </div>
          <span>Secure checkout</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
            <span className="text-green-600 font-bold text-xs">✓</span>
          </div>
          <span>Free returns</span>
        </div>
      </div>
    </div>
  );
}
