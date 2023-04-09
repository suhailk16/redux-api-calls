import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { fetchCart } from './cartSlice'

export const fetchProfile = createAsyncThunk(
  'fetchProfile',
  async (_, thunkAPI) => {
    const res = await axios.get('http://localhost:4000/profile')
    thunkAPI.dispatch(fetchCart(res.data.id))
    return res.data
  },
)

/*
  processing the request -> pending state
    processing: true
  processing is successful -> fullfilled state
    processing: false
    data: { name, email, id, imageUrl }
  processing is failed -> rejected state
    processing: false
    error: true
*/

const userSlice = createSlice({
  name: 'user',
  initialState: {
    processing: false,
    error: null,
    data: null,
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProfile.pending, (state, action) => {
        state.processing = true
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.processing = false
        state.data = action.payload
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.processing = false
        state.error = true
      })
  },
})

export default userSlice
