"use client";

import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Review } from "@/lib/generated/prisma/client";

interface ProductReviewsShowcaseProps {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
}

export function ProductReviewsShowcase({
  reviews,
  averageRating,
  totalReviews,
}: ProductReviewsShowcaseProps) {
  // Calculate rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => {
    const count = reviews.filter((r) => r.rating === rating).length;
    const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
    return { rating, count, percentage };
  });

  const topReviews = reviews.slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Reviews Header */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>

        {/* Overall Rating */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-bold">
                {averageRating.toFixed(1)}
              </span>
              <span className="text-muted-foreground">out of 5</span>
            </div>

            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.round(averageRating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>

            <p className="text-sm text-muted-foreground">
              Based on {totalReviews}{" "}
              {totalReviews === 1 ? "review" : "reviews"}
            </p>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-3">
            {ratingDistribution.map(({ rating, count, percentage }) => (
              <div key={rating} className="flex items-center gap-3">
                <span className="w-12 text-sm font-medium text-right">
                  {rating} star
                </span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400 transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="w-8 text-sm text-muted-foreground text-right">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Separator />

      {/* Top Reviews */}
      {topReviews.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Top Reviews</h3>
          <div className="grid gap-4">
            {topReviews.map((review) => (
              <Card key={review.id} className="p-4">
                <div className="space-y-3">
                  {/* Review Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-muted-foreground"
                              }`}
                            />
                          ))}
                        </div>
                        {review.authorName && (
                          <span className="text-sm text-muted-foreground">
                            by {review.authorName}
                          </span>
                        )}
                      </div>
                    </div>
                    <Badge variant="outline" className="flex-shrink-0">
                      {review.rating.toFixed(1)} ⭐
                    </Badge>
                  </div>

                  {/* Review Content */}
                  {review.comment && (
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {review.comment}
                    </p>
                  )}

                  {/* Review Date */}
                  <p className="text-xs text-muted-foreground">
                    {new Date(review.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </Card>
            ))}
          </div>

          {reviews.length > 3 && (
            <button className="w-full py-3 border border-dashed border-muted-foreground/30 rounded-lg text-sm font-medium hover:bg-muted transition-colors">
              View all {reviews.length} reviews
            </button>
          )}
        </div>
      )}

      {/* No Reviews */}
      {reviews.length === 0 && (
        <div className="text-center py-8 bg-muted/50 rounded-lg">
          <p className="text-muted-foreground">
            No reviews yet. Be the first to review this product!
          </p>
        </div>
      )}
    </div>
  );
}
