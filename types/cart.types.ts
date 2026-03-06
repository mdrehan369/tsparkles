import { Prisma } from "@/lib/generated/prisma/client";

export type CartWithCartItem = Prisma.CartGetPayload<{
  include: { CartItem: true };
}>;

export type CartItemWithProduct = Prisma.CartItemGetPayload<{
  include: {
    Product: {
      include: {
        Asset: true;
      };
    };
  };
}>;
