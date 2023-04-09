import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchProductDetail = createAsyncThunk(
  'fetchProduct',
  async (productId) => {
    const res = await axios.get(`http://localhost:4000/products/${productId}`)
    return res.data
  },
)

const productDetailSlice = createSlice({
  name: 'productDetail',
  initialState: {
    processing: false,
    error: null,
    data: null,
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProductDetail.pending, (state) => {
        state.processing = true
      })
      .addCase(fetchProductDetail.fulfilled, (state, action) => {
        state.processing = false
        state.data = action.payload
      })
      .addCase(fetchProductDetail.rejected, (state) => {
        state.processing = false
        state.error = true
      })
  },
})

export default productDetailSlice
