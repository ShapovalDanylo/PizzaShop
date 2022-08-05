import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: [],
    total: 0,
    prodQuant: 0,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProduct: (state, action) => {
            state.products.push(action.payload)
            state.prodQuant += 1
            state.total += action.payload.price * action.payload.quant
        },
        resetCart: state => {
            state.products = []
            state.prodQuant = 0
            state.total = 0
        }
    }
})

export const { addProduct, resetCart } = cartSlice.actions

export default cartSlice.reducer