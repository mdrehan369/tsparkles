"use server";

import { STATUS_CODES } from "@/constants";
import { prisma } from "@/lib/prisma";

export const addProductToCart = async (
  userId: number,
  productId: number,
  quantity: number,
) => {
  try {
    const product = await prisma.product.findFirst({
      where: { id: productId },
    });

    if (!product)
      return {
        code: STATUS_CODES.NOT_FOUND,
        error: "Product not found!",
        data: null,
      };
    const user = await prisma.account.findFirst({
      where: { id: userId },
      include: { cart: true },
    });

    if (!user)
      return {
        code: STATUS_CODES.NOT_FOUND,
        error: "User not found!",
        data: null,
      };

    const cart = await prisma.cart.findUnique({
      where: { accountId: userId },
      include: { CartItem: true },
    });

    if (cart?.CartItem.find((ct) => ct.productId == productId))
      return {
        code: STATUS_CODES.BAD_REQUEST,
        error: "Product already added",
        data: null,
      };

    const createdCartItem = await prisma.cartItem.create({
      data: {
        productId,
        cartId: user.cart!.id,
        quantity,
      },
    });

    return {
      code: STATUS_CODES.SUCCESS,
      error: null,
      data: createdCartItem,
    };
  } catch (err: any) {
    console.log(err);
    return {
      code: STATUS_CODES.INTERNAL_SERVER_ERROR,
      error: err,
      data: null,
    };
  }
};

export const changeQuantity = async (
  cartItemId: number,
  to: number,
  userId: number,
) => {
  try {
    // 1. Validation: Prevent negative numbers
    if (to == 0) {
      await prisma.cartItem.delete({
        where: { id: cartItemId, Cart: { accountId: userId } },
      });
      return {
        code: STATUS_CODES.NO_CONTENT,
        error: null,
        data: null,
      };
    }
    if (to < 0) {
      return {
        code: STATUS_CODES.BAD_REQUEST,
        error: "Quantity must be at least 1",
        data: null,
      };
    }

    const updatedItem = await prisma.cartItem.update({
      where: {
        id: cartItemId,
        Cart: { accountId: userId }, // Relation check: Item -> Cart -> User
      },
      data: { quantity: to },
    });

    return {
      code: STATUS_CODES.SUCCESS,
      error: null,
      data: updatedItem,
    };
  } catch (err: any) {
    if (err.code === "P2025") {
      return {
        code: STATUS_CODES.NOT_FOUND,
        error: "Item not found or unauthorized",
        data: null,
      };
    }

    console.error("Change Quantity Error:", err);
    return {
      code: STATUS_CODES.INTERNAL_SERVER_ERROR,
      error: "Failed to update quantity",
      data: null,
    };
  }
};
