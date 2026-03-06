import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductImageGallery } from "@/components/products/product-image-gallery";
import { ProductDetails } from "@/components/products/product-details";
import { ProductReviewsShowcase } from "@/components/products/product-reviews-showcase";
import { FullProduct } from "@/types/products.types";

async function getProduct(
  slug: string,
): Promise<{ status: boolean; data: FullProduct } | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000"}/products/${slug}`,
    );

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const response = await getProduct(slug);

  if (!response) {
    return {
      title: "Product Not Found",
      description: "The product you are looking for does not exist.",
    };
  }

  const product = response.data;
  const imageUrl = product.Asset?.[0]?.url || "/placeholder.jpg";

  return {
    title: product.title,
    description:
      product.description ||
      `Shop ${product.title} - $${product.price.toFixed(2)}`,
    openGraph: {
      title: product.title,
      description: product.description || `Shop ${product.title}`,
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 800,
          alt: product.title,
        },
      ],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const response = await getProduct(slug);

  if (!response) {
    notFound();
  }

  const product = response.data;

  const averageRating =
    product.Review.length > 0
      ? product.Review.reduce((sum, r) => sum + r.rating, 0) /
        product.Review.length
      : 0;

  return (
    <>
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-6xl px-4 py-8 md:py-12">
          {/* Product Detail Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-16">
            {/* Left Column - Image Gallery */}
            <div className="flex flex-col gap-6">
              <ProductImageGallery
                assets={product.Asset}
                productTitle={product.title}
              />
            </div>

            {/* Right Column - Product Details */}
            <div className="flex flex-col justify-start">
              <ProductDetails
                id={product.id}
                title={product.title}
                description={product.description || ""}
                price={product.price}
                comparePrice={product.comparePrice || 1000}
                rating={averageRating}
                reviewCount={product.Review.length}
                // sku={product.sku}
                // weight={product.weight}
                category={product.Category}
                subCategory={product.SubCategory}
              />
            </div>
          </div>

          <Separator className="my-12" />

          {/* Reviews Section */}
          <div className="max-w-4xl mx-auto">
            <ProductReviewsShowcase
              reviews={product.Review}
              averageRating={averageRating}
              totalReviews={product.Review.length}
            />
          </div>
        </div>
      </main>
    </>
  );
}

// Loading Skeleton for streaming
export function ProductPageSkeleton() {
  return (
    <>
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-6xl px-4 py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-16">
            {/* Left Column Skeleton */}
            <div className="space-y-4">
              <Skeleton className="w-full aspect-square rounded-lg" />
              <div className="flex gap-3">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="w-20 h-20 rounded-lg" />
                ))}
              </div>
            </div>

            {/* Right Column Skeleton */}
            <div className="space-y-6">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-8 w-1/3" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
