"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AlertCircle, ArrowLeft, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface OrderErrorProps {
  errorCode?: string;
  errorMessage?: string;
  errorDescription?: string;
}

export function OrderError({
  errorCode = "PAYMENT_FAILED",
  errorMessage = "Payment Could Not Be Processed",
  errorDescription = "Your payment could not be processed at this time. Please check your card details and try again.",
}: OrderErrorProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const getErrorDetails = () => {
    switch (errorCode) {
      case "PAYMENT_FAILED":
        return {
          tips: [
            "Check that your card number, expiry date, and CVV are correct",
            "Ensure your card is not expired or blocked",
            "Verify your billing address matches your bank records",
            "Try a different payment method if available",
          ],
        };
      case "INVENTORY_ERROR":
        return {
          tips: [
            "One or more items in your cart are out of stock",
            "Remove unavailable items and try again",
            "Check back later as items are restocked regularly",
            "Consider similar products as alternatives",
          ],
        };
      case "SHIPPING_ERROR":
        return {
          tips: [
            "Verify your shipping address is correct",
            "Check if we deliver to your location",
            "Contact our support team for assistance",
            "Try a different delivery address",
          ],
        };
      default:
        return {
          tips: [
            "Review your order details",
            "Clear your browser cache and try again",
            "Use a different browser or device",
            "Contact our support team for help",
          ],
        };
    }
  };

  const details = getErrorDetails();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 flex items-center justify-center px-4 py-12">
      <style>{`
        @keyframes shake {
          0%, 100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-5px);
          }
          75% {
            transform: translateX(5px);
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

        @keyframes pulse-error {
          0% {
            box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
          }
          70% {
            box-shadow: 0 0 0 20px rgba(239, 68, 68, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(239, 68, 68, 0);
          }
        }

        .error-icon {
          animation: shake 0.5s cubic-bezier(0.36, 0, 0.66, -0.56);
        }

        .pulse-error {
          animation: pulse-error 2s infinite;
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
        {/* Error Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="error-icon pulse-error w-24 h-24 bg-gradient-to-br from-red-500/10 to-red-500/5 rounded-full flex items-center justify-center">
              <AlertCircle className="w-16 h-16 text-red-600" />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="text-center mb-12 slide-content">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3 text-balance">
            {errorMessage}
          </h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            {errorDescription}
          </p>
        </div>

        {/* Error Code Card */}
        <Card className="slide-content border-2 border-red-100 bg-red-50/30 backdrop-blur mb-8 p-6">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-1">
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="font-semibold text-foreground mb-1">
                Error Code: {errorCode}
              </p>
              <p className="text-sm text-muted-foreground">
                Please reference this code when contacting our support team.
              </p>
            </div>
          </div>
        </Card>

        {/* Troubleshooting Tips */}
        <div className="slide-content bg-gradient-to-br from-amber-50 to-amber-50/50 rounded-lg p-6 mb-8 border border-amber-100">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Troubleshooting Tips
          </h3>
          <ul className="space-y-3">
            {details.tips.map((tip, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-600 text-white text-sm flex items-center justify-center font-bold mt-0.5">
                  {index + 1}
                </div>
                <p className="text-foreground text-sm mt-0.5">{tip}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="slide-content flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/cart" className="flex-1">
            <Button variant="outline" className="w-full" size="lg">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Return to Cart
            </Button>
          </Link>
          <Link href="/contact" className="flex-1">
            <Button
              className="w-full bg-red-600 hover:bg-red-700 text-white size-lg"
              size="lg"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Contact Support
            </Button>
          </Link>
        </div>

        {/* Additional Help */}
        <div className="mt-8 p-6 rounded-lg bg-muted/50 border border-border slide-content">
          <p className="text-center text-sm">
            <span className="text-muted-foreground">Still having issues? </span>
            <Link
              href="/contact"
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              Reach out to our support team
            </Link>
            <span className="text-muted-foreground">
              {" "}
              and we'll help you out.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
