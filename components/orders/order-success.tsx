"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle, Package, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface OrderSuccessProps {
  orderNumber?: string;
  email?: string;
  estimatedDelivery?: string;
}

export function OrderSuccess({
  orderNumber = "#ORD-2024-001234",
  email = "customer@example.com",
  estimatedDelivery = "3-5 business days",
}: OrderSuccessProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 flex items-center justify-center px-4 py-12">
      <style>{`
        @keyframes checkmark-scale {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse-ring {
          0% {
            box-shadow: 0 0 0 0 rgba(122, 77, 232, 0.7);
          }
          70% {
            box-shadow: 0 0 0 20px rgba(122, 77, 232, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(122, 77, 232, 0);
          }
        }

        .checkmark-icon {
          animation: checkmark-scale 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .pulse-ring {
          animation: pulse-ring 2s infinite;
        }

        .slide-content {
          animation: slide-up 0.6s ease-out;
        }

        .slide-content:nth-child(2) {
          animation-delay: 0.1s;
        }

        .slide-content:nth-child(3) {
          animation-delay: 0.2s;
        }

        .slide-content:nth-child(4) {
          animation-delay: 0.3s;
        }

        .slide-content:nth-child(5) {
          animation-delay: 0.4s;
        }
      `}</style>

      <div className="w-full max-w-2xl">
        {/* Success Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="checkmark-icon pulse-ring w-24 h-24 bg-gradient-to-br from-purple-500/10 to-purple-500/5 rounded-full flex items-center justify-center">
              <CheckCircle className="w-16 h-16 text-purple-600 fill-purple-600" />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="text-center mb-12 slide-content">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3 text-balance">
            Order Placed Successfully
          </h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Thank you for your purchase! We've received your order and will get
            it ready for you soon.
          </p>
        </div>

        {/* Order Details Card */}
        <Card className="slide-content border-2 border-purple-100 bg-white/50 backdrop-blur mb-8 p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground font-medium mb-1">
                  Order Number
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {orderNumber}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium mb-1">
                  Order Date
                </p>
                <p className="text-foreground">
                  {new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground font-medium mb-1">
                  Estimated Delivery
                </p>
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-purple-600" />
                  <p className="text-foreground">{estimatedDelivery}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium mb-1">
                  Confirmation Email
                </p>
                <p className="text-foreground break-all">{email}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* What's Next */}
        <div className="slide-content bg-gradient-to-br from-purple-50 to-purple-50/50 rounded-lg p-6 mb-8 border border-purple-100">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            What's Next?
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-600 text-white text-sm flex items-center justify-center font-bold mt-0.5">
                1
              </div>
              <div>
                <p className="font-medium text-foreground">Order Confirmed</p>
                <p className="text-sm text-muted-foreground">
                  We've sent a confirmation email with your order details
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-600 text-white text-sm flex items-center justify-center font-bold mt-0.5">
                2
              </div>
              <div>
                <p className="font-medium text-foreground">
                  Processing Payment
                </p>
                <p className="text-sm text-muted-foreground">
                  Your order is being processed securely
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-600 text-white text-sm flex items-center justify-center font-bold mt-0.5">
                3
              </div>
              <div>
                <p className="font-medium text-foreground">
                  Shipped & Tracking
                </p>
                <p className="text-sm text-muted-foreground">
                  You'll receive tracking info within 24 hours
                </p>
              </div>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="slide-content flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/products" className="flex-1">
            <Button variant="outline" className="w-full" size="lg">
              Continue Shopping
            </Button>
          </Link>
          <Link href="/" className="flex-1">
            <Button
              className="w-full bg-purple-600 hover:bg-purple-700 text-white size-lg"
              size="lg"
            >
              Back to Home
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        {/* Support */}
        <p className="text-center text-sm text-muted-foreground mt-8 slide-content">
          Questions?{" "}
          <Link
            href="/contact"
            className="text-purple-600 hover:text-purple-700 font-medium"
          >
            Contact our support team
          </Link>
        </p>
      </div>
    </div>
  );
}
