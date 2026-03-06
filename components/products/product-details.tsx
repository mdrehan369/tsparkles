"use client";

import { useState } from "react";
import { Star, Heart, Share2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/auth-context";
import { addProductToCart } from "@/actions/cart";
import { useRouter } from "next/navigation";

interface ProductDetailsProps {
  id: number;
  title: string;
  description?: string;
  price: number;
  comparePrice?: number;
  rating: number;
  reviewCount: number;
  // sku?: string;
  // weight?: string;
  category: {
    name: string;
  };
  subCategory: {
    name: string;
  };
}

export function ProductDetails({
  id,
  title,
  description,
  price,
  comparePrice,
  rating,
  reviewCount,
  // sku,
  // weight,
  category,
  subCategory,
}: ProductDetailsProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [showCopied, setShowCopied] = useState(false);

  const [loading, setLoading] = useState(false);

  const { user, openLogin, updateCart } = useAuth();
  const router = useRouter();

  const discountPercent = comparePrice
    ? Math.round(((comparePrice - price) / comparePrice) * 100)
    : 0;
  const savingsAmount = comparePrice ? (comparePrice - price).toFixed(2) : 0;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title,
        text: description || title,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    }
  };

  const handleAddToCart = async () => {
    if (user?.cart.CartItem.find((ct) => ct.productId == id))
      router.push("/cart");
    if (!user) openLogin();
    else {
      try {
        setLoading(true);
        const { data, error } = await addProductToCart(user.id, id, quantity);
        if (error) throw new Error(error);
        updateCart({ ...user.cart, CartItem: [...user.cart.CartItem, data!] });
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="flex flex-col gap-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>{category.name}</span>
        <span>/</span>
        <span>{subCategory.name}</span>
      </div>

      {/* Title */}
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold text-balance">{title}</h1>

        {/* Rating and Reviews */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.round(rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-muted-foreground"
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-medium">{rating.toFixed(1)}</span>
          <span className="text-sm text-muted-foreground">
            ({reviewCount} reviews)
          </span>
        </div>
      </div>

      <Separator />

      {/* Pricing */}
      <div className="space-y-3">
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-bold">${price.toFixed(2)}</span>
          {comparePrice && comparePrice > price && (
            <>
              <span className="text-lg text-muted-foreground line-through">
                ${comparePrice.toFixed(2)}
              </span>
              <Badge variant="destructive" className="ml-2">
                Save ${savingsAmount}
              </Badge>
            </>
          )}
        </div>
        {discountPercent > 0 && (
          <p className="text-sm text-green-600">
            You save {discountPercent}% on this item
          </p>
        )}
      </div>

      {/* Description */}
      {description && (
        <div className="space-y-2">
          <h3 className="font-semibold text-sm">Description</h3>
          <p className="text-muted-foreground leading-relaxed">{description}</p>
        </div>
      )}

      <Separator />

      {/* Product Info */}
      {/*
      <div className="grid grid-cols-2 gap-4 text-sm">
        {sku && (
          <div>
            <p className="text-muted-foreground">SKU</p>
            <p className="font-medium">{sku}</p>
          </div>
        )}
        {weight && (
          <div>
            <p className="text-muted-foreground">Weight</p>
            <p className="font-medium">{weight}</p>
          </div>
        )}
      </div>
      */}

      {/* Quantity and Actions */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center border border-muted-foreground/20 rounded-lg">
            <button
              onClick={decrementQuantity}
              className="px-4 py-2 hover:bg-muted transition-colors"
            >
              −
            </button>
            <span className="px-6 py-2 border-l border-r border-muted-foreground/20 font-medium">
              {quantity}
            </span>
            <button
              onClick={incrementQuantity}
              className="px-4 py-2 hover:bg-muted transition-colors"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            className="flex-1 cursor-pointer disabled:brightness-75"
            size="lg"
            disabled={loading}
            onClick={() => handleAddToCart()}
          >
            {user?.cart?.CartItem.find((ct) => ct.productId == id)
              ? "View Cart"
              : "Add to Cart"}
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="px-6"
            onClick={() => setIsWishlisted(!isWishlisted)}
          >
            <Heart
              className={`h-5 w-5 ${isWishlisted ? "fill-current text-red-500" : ""}`}
            />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="px-6"
            onClick={handleShare}
            title="Share product"
          >
            <Share2 className="h-5 w-5" />
          </Button>
        </div>

        {showCopied && (
          <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 p-3 rounded-lg">
            <Check className="h-4 w-4" />
            Link copied to clipboard
          </div>
        )}
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-3 gap-3 bg-muted/50 p-4 rounded-lg">
        <div className="text-center">
          <div className="text-2xl mb-1">✓</div>
          <p className="text-xs font-medium">Free Shipping</p>
        </div>
        <div className="text-center">
          <div className="text-2xl mb-1">↩</div>
          <p className="text-xs font-medium">Easy Returns</p>
        </div>
        <div className="text-center">
          <div className="text-2xl mb-1">🛡</div>
          <p className="text-xs font-medium">Secure Payment</p>
        </div>
      </div>
    </div>
  );
}
