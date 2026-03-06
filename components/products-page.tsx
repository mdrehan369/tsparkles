"use client";

import { useState } from "react";
import { ProductCard } from "./product-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { getAllProductsQuery } from "@/queries/products.queries";
import { getAllCategoriesQuery } from "@/queries/categories.queries";
import Pagination from "./pagination";
import { ProductWithAssetReview } from "@/types/products.types";
import { CategoryWithSubCategory } from "@/types/categories.types";

export function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("");
  const [page, setPage] = useState(1);

  const { data: productsResponse, isFetching: productsLoading } = useQuery<{
    products: ProductWithAssetReview[];
    totalPages: number;
  }>({
    queryFn: () =>
      getAllProductsQuery({
        page,
        categoryId: Number(selectedCategory),
        subCategoryId: Number(selectedSubCategory),
      }),
    queryKey: ["products", selectedCategory, selectedSubCategory, page],
    initialData: { products: [], totalPages: 1 },
  });

  const { data: categories, isFetching: categoriesLoading } = useQuery<
    CategoryWithSubCategory[]
  >({
    queryFn: () => getAllCategoriesQuery(),
    queryKey: ["categories"],
  });

  const products = productsResponse.products;
  const totalPages = productsResponse.totalPages;

  const currentCategory = categories?.find(
    (c) => c.id.toString() === selectedCategory,
  );
  const subCategories = currentCategory?.SubCategory || [];

  return (
    <div className="w-full py-12">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Our Products</h1>
          <p className="text-muted-foreground">
            Browse our collection of handcrafted items
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row">
          {!categoriesLoading && categories!.length > 0 && (
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Category</label>
              <Select
                value={selectedCategory || "all"} // Fallback to "all" for the UI
                onValueChange={(val) => {
                  setSelectedSubCategory("");
                  setSelectedCategory(val === "all" ? "" : val);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  {/* Use "all" instead of "" */}
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories!.map((category) => (
                    <SelectItem
                      key={category.id}
                      value={category.id.toString()}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          {subCategories.length > 0 && (
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">
                Sub Category
              </label>
              <Select
                value={selectedSubCategory}
                onValueChange={(val) =>
                  setSelectedSubCategory(val === "all" ? "" : val)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Sub Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sub Categories</SelectItem>
                  {subCategories.map((subCategory) => (
                    <SelectItem
                      key={subCategory.id}
                      value={subCategory.id.toString() || ""}
                    >
                      {subCategory.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {(selectedCategory || selectedSubCategory) && (
            <div className="flex items-end">
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedCategory("");
                  setSelectedSubCategory("");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>

        {/* Products Grid */}
        {productsLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-4/3 w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-lg text-muted-foreground mb-4">
              No products found
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSelectedCategory("");
                setSelectedSubCategory("");
              }}
            >
              View All Products
            </Button>
          </div>
        ) : (
          <>
            <div className="mb-4 text-sm text-muted-foreground">
              Showing {products.length} product
              {products.length !== 1 ? "s" : ""}
            </div>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  slug={product.slug}
                  title={product.title}
                  price={product.price}
                  comparePrice={product.comparePrice || 0}
                  image={product.Asset[0]}
                  reviews={product.Review}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </div>
  );
}
