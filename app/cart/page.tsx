"use client";

import { useRouter } from "next/navigation";
import CartItem from "@/components/cart/cart-item";
import OrderSummary from "@/components/cart/order-summary";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getCartQuery } from "@/queries/cart.queries";
import { CartItemWithProduct } from "@/types/cart.types";
import { Skeleton } from "@/components/ui/skeleton";

export default function CartPage() {
  const router = useRouter();

  const {
    data: cartItems,
    isFetching,
    isPending,
    refetch,
  } = useQuery<CartItemWithProduct[]>({
    queryKey: ["Cart"],
    queryFn: getCartQuery,
    initialData: [],
  });

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.Product.price * item.quantity,
    0,
  );
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    router.push("/checkout");
  };

  if (!isFetching && cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Your cart is empty
            </h1>
            <p className="text-gray-600 mb-8">
              Add some beautiful items to get started
            </p>
            <Button
              onClick={() => router.push("/products")}
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3 px-8 rounded-lg"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Shopping Cart
          </h1>
          <p className="text-gray-600">{itemCount} item(s) in your cart</p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 bg-transparent">
          {/* Cart Items */}
          {isPending ? (
            <Skeleton className="lg:col-span-2" />
          ) : (
            <div className="lg:col-span-2 bg-yellow-50">
              <div className="bg-yellow-50 rounded-xl border border-amber-200 p-6">
                {/* Column Headers */}
                <div className="hidden md:grid grid-cols-4 gap-4 pb-4 border-b border-amber-200 mb-4 bg-transparent">
                  <div className="col-span-2">
                    <p className="text-sm font-semibold text-gray-600">
                      Product
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600">
                      Quantity
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-600">Total</p>
                  </div>
                </div>

                {/* Cart Items List */}
                <div>
                  {cartItems.map((item) => (
                    <CartItem
                      key={item.id}
                      id={item.id}
                      name={item.Product.title}
                      image={item.Product.Asset[0].url}
                      price={item.Product.price}
                      comparePrice={
                        item.Product.comparePrice || item.Product.price
                      }
                      initialQuantity={item.quantity}
                      refetch={refetch}
                    />
                  ))}
                </div>

                {/* Continue Shopping Button */}
                <div className="mt-8 pt-6 border-t border-amber-200">
                  <Button
                    variant="outline"
                    onClick={() => router.push("/products")}
                    className="border-amber-300 text-gray-900 hover:bg-gray-50"
                  >
                    Continue Shopping
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Order Summary Sidebar */}
          <div>
            <OrderSummary
              subtotal={subtotal}
              shippingCost={0}
              itemCount={itemCount}
              onCheckout={handleCheckout}
              checkoutLabel="Proceed to Checkout"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
