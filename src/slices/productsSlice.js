import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchProducts = createAsyncThunk('fetchProducts', async () => {
  const res = await axios.get('http://localhost:4000/products')
  return res.data
})

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    processing: false,
    error: null,
    data: [],
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.processing = true
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.processing = false
        state.data = action.payload
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.processing = false
        state.error = true
      })
  },
})

export default productsSlice
