import { createSlice } from "@reduxjs/toolkit";
import React from "react";

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const exist = state.items.find((item) => item._id === product._id);
      if (!exist) {
        state.items.push({ ...product, quantity: 1 });
      }
      else{
        alert("Product already in cart");
      }
    },
   
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item._id !== id);
    },
    increaseQuantity: (state, action) => {
      const id = action.payload;
      const item = state.items.find((i) => i._id === id);
      if (item) item.quantity += 1;
    },
    decreaseQuantity: (state, action) => {
      const id = action.payload;
      const item = state.items.find((i) => i._id === id);
      if (item && item.quantity > 1) item.quantity -= 1;
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = CartSlice.actions;
export default CartSlice.reducer;
