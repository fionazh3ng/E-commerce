import { createSlice } from "@reduxjs/toolkit";
import {cartApi} from "../api/cartApi"

const cartSlice =createSlice({
    name:"cartSlice",
    initialState: {cart:[]},
    reducers:{},
    extraReducers: (builder)=>{
        builder.addMatcher(
            cartApi.endpoints.getCart.matchFulfilled,
            (state, {payload})=>{
                state.cart=payload
                return state
            }
        );
        builder.addMatcher(
            cartApi.endpoints.addToCart.matchFulfilled,
            (state, {payload})=>{
                state.cart.push(payload)
                return state
            }
        );
        builder.addMatcher(
            cartApi.endpoints.deleteCart.matchFulfilled,
            (state, {payload})=>{
                state.cart=state.cart.map((product)=>{
                    if(product.productid!==payload.productid){
                        return product
                    }
                })
                return state
            }
        );
    }
})
export default cartSlice.reducer