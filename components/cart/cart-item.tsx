"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Trash2, Minus, Plus } from "lucide-react";
import { changeQuantity } from "@/actions/cart";
import { useAuth } from "@/context/auth-context";

interface CartItemProps {
  id: number;
  name: string;
  image: string;
  price: number;
  comparePrice?: number;
  initialQuantity: number;
  refetch: () => void;
}

export default function CartItem({
  id,
  name,
  image,
  price,
  comparePrice,
  initialQuantity,
  refetch,
}: CartItemProps) {
  const [quantity, setQuantity] = useState(initialQuantity || 1);
  const { user } = useAuth();
  const discount = comparePrice
    ? Math.round(((comparePrice - price) / comparePrice) * 100)
    : 0;
  const total = price * quantity;
  const timeout = useRef<NodeJS.Timeout | null>(null);

  const onQuantityChange = async (quantity: number) => {
    setQuantity(quantity);
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = setTimeout(async () => {
      await changeQuantity(id, quantity, user!.id!);
      refetch();
    }, 500);
  };

  const handleRemoveItem = async () => {
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = setTimeout(async () => {
      await changeQuantity(id, 0, user!.id!);
      refetch();
    }, 500);
  };
  return (
    <div className="flex gap-4 py-6 border-b border-amber-200">
      {/* Product Image */}
      <div className="relative w-24 h-24 flex-shrink-0">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover rounded-lg"
        />
        {discount > 0 && (
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
            -{discount}%
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="flex-1">
        <h3 className="text-base font-semibold text-gray-900 mb-1">{name}</h3>

        {/* Pricing */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-lg font-bold text-gray-900">
            Rs. {price.toFixed(2)}
          </span>
          {comparePrice && (
            <span className="text-sm text-gray-500 line-through">
              Rs. {comparePrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center border border-amber-300 rounded-lg">
            <button
              onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
              className="p-1 text-gray-500 hover:text-gray-700"
              aria-label="Decrease quantity"
            >
              <Minus size={16} />
            </button>
            <span className="px-4 py-1 min-w-12 text-center font-medium">
              {quantity}
            </span>
            <button
              onClick={() => onQuantityChange(quantity + 1)}
              className="p-1 text-gray-500 hover:text-gray-700"
              aria-label="Increase quantity"
            >
              <Plus size={16} />
            </button>
          </div>
          <button
            onClick={() => handleRemoveItem()}
            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
            aria-label="Remove item"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* Total Price */}
      <div className="text-right">
        <p className="text-lg font-bold text-gray-900">
          Rs. {total.toFixed(2)}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Rs. {price.toFixed(2)} each
        </p>
      </div>
    </div>
  );
}
