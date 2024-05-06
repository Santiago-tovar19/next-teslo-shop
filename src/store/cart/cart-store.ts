import { CartProducts } from "./../../interfaces/product.interface";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProducts[];

  getTotalItems: () => number;
  getSummaryInformation: () => {
    subTotal: number;
    tax: number;
    total: number;
    itemsInCart: number;
  };
  addProducttoCart: (product: CartProducts) => void;
  updateProductQuantity: (product: CartProducts, quantity: number) => void;
  removeProduct: (product: CartProducts) => void;
  clearCart: () => void;
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],

      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((acc, item) => acc + item.quantity, 0);
      },

      getSummaryInformation: () => {
        const { cart } = get();
        const subTotal = cart.reduce(
          (subTotal, product) => product.quantity * product.price + subTotal,
          0
        );

        const tax = subTotal * 0.15;
        const total = subTotal + tax;
        const itemsInCart = cart.reduce((acc, item) => acc + item.quantity, 0);

        return {
          subTotal,
          tax,
          total,
          itemsInCart,
        };
      },

      addProducttoCart: (product: CartProducts) => {
        const { cart } = get();

        const productInCart = cart.some((item) => {
          return item.id === product.id && item.size === product.size;
        });

        if (!productInCart) {
          set({ cart: [...cart, product] });
          return;
        }

        const updatedCartProduct = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: item.quantity + product.quantity };
          }

          return item;
        });

        set({ cart: updatedCartProduct });
      },

      updateProductQuantity(product: CartProducts, quantity: number) {
        const { cart } = get();
        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity };
          }

          return item;
        });

        set({ cart: updatedCartProducts });
      },

      removeProduct(product: CartProducts) {
        const { cart } = get();
        const updatedCartProducts = cart.filter(
          (item) => item.id !== product.id || item.size !== product.size
        );

        set({ cart: updatedCartProducts });
      },

      clearCart: () => {
        set({ cart: [] });
      },
    }),
    {
      name: "shopping-cart",
    }
  )
);
