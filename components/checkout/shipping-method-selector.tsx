"use client";

import { Truck, Zap } from "lucide-react";

interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  cost: number;
  estimatedDays: string;
  icon?: "truck" | "zap";
}

interface ShippingMethodSelectorProps {
  methods: ShippingMethod[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export default function ShippingMethodSelector({
  methods,
  selectedId,
  onSelect,
}: ShippingMethodSelectorProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Shipping Method</h3>

      <div className="space-y-3">
        {methods.map((method) => (
          <label
            key={method.id}
            className="flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all"
            style={{
              borderColor: selectedId === method.id ? "#7A4DE8" : "#E5E7EB",
              backgroundColor: selectedId === method.id ? "#F3E8FF" : "#FFFFFF",
            }}
          >
            <input
              type="radio"
              name="shipping"
              value={method.id}
              checked={selectedId === method.id}
              onChange={() => onSelect(method.id)}
              className="w-4 h-4 cursor-pointer"
            />

            <div className="flex-1 ml-4">
              <div className="flex items-center gap-2 mb-1">
                {method.icon === "zap" && (
                  <Zap size={18} className="text-yellow-500" />
                )}
                {method.icon === "truck" && (
                  <Truck size={18} className="text-gray-600" />
                )}
                <span className="font-semibold text-gray-900">
                  {method.name}
                </span>
              </div>
              <p className="text-sm text-gray-600">{method.description}</p>
              <p className="text-xs text-gray-500 mt-1">
                {method.estimatedDays}
              </p>
            </div>

            <div className="text-right">
              <p className="font-semibold text-gray-900">
                {method.cost === 0 ? "Free" : `$${method.cost.toFixed(2)}`}
              </p>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
