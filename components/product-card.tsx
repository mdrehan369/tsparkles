"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { Asset, Review } from "@/lib/generated/prisma/client";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  id: number;
  slug: string;
  title: string;
  price: number;
  comparePrice?: number;
  image?: Asset;
  reviews: Review[];
}

export function ProductCard({
  id,
  slug,
  title,
  price,
  comparePrice,
  image,
  reviews,
}: ProductCardProps) {
  const router = useRouter();
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  const discountPercent = comparePrice
    ? Math.round(((comparePrice - price) / comparePrice) * 100)
    : 0;

  return (
    <Card className="overflow-hidden bg-card hover:shadow-lg transition-shadow">
      <CardContent className="p-0 relative overflow-hidden bg-muted">
        <div className="aspect-[4/3] w-full bg-muted flex items-center justify-center p-3">
          {image?.url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={image.url}
              alt={image.altText || title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-muted to-muted-foreground/10 flex items-center justify-center">
              <span className="text-muted-foreground text-sm">No image</span>
            </div>
          )}
        </div>
        {discountPercent > 0 && (
          <Badge className="absolute top-3 right-3 bg-red-500 hover:bg-red-600">
            -{discountPercent}%
          </Badge>
        )}
      </CardContent>

      <CardFooter className="flex flex-col gap-3 p-4">
        <div className="w-full">
          <h3 className="font-medium text-sm line-clamp-2 mb-2">{title}</h3>

          {/* Rating */}
          {reviews.length > 0 && (
            <div className="flex items-center gap-1 mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3.5 w-3.5 ${
                      i < Math.round(averageRating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                ({reviews.length})
              </span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="font-semibold text-lg">${price.toFixed(2)}</span>
            {comparePrice && comparePrice > price && (
              <span className="text-sm text-muted-foreground line-through">
                ${comparePrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        <Button
          className="w-full"
          size="sm"
          onClick={() => router.push(`/products/${slug}`)}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
