import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast'

export const fetchCart = createAsyncThunk('fetchCart', async (userId) => {
  const res = await axios.get(`http://localhost:4000/carts?userId=${userId}`)
  return res.data
})

export const addToCart = createAsyncThunk('addToCart', async (params) => {
  const { cartDetails, productDetails, userId } = params
  const discountedPrice =
    productDetails.price -
    (productDetails.discountPercentage / 100) * productDetails.price
  const res = await axios.put(`http://localhost:4000/carts/${cartDetails.id}`, {
    id: cartDetails.id,
    products: [
      ...cartDetails.products,
      {
        id: productDetails.id,
        title: productDetails.title,
        price: productDetails.price,
        quantity: 1,
        total: productDetails.price,
        discountPercentage: productDetails.discountPercentage,
        discountedPrice: discountedPrice,
      },
    ],
    total: cartDetails.total + productDetails.price,
    discountedTotal: cartDetails.discountedTotal + discountedPrice,
    userId: userId,
    totalProducts: cartDetails.totalProducts + 1,
    totalQuantity: cartDetails.totalQuantity + 1,
  })

  toast.success(`${productDetails.title} is added to cart`)

  return res.data
})

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    processing: false,
    error: null,
    data: [],
    addingToCart: false,
    errorAddingToCart: null,
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.processing = true
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.processing = false
        state.data = action.payload
      })
      .addCase(fetchCart.rejected, (state) => {
        state.processing = false
        state.error = true
      })
      .addCase(addToCart.pending, (state) => {
        state.addingToCart = true
        state.errorAddingToCart = null
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.data = [action.payload]
        state.addingToCart = false
      })
      .addCase(addToCart.rejected, (state) => {
        state.errorAddingToCart = true
        state.addingToCart = false
      })
  },
})

export default cartSlice
