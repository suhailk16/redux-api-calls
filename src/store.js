import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/userSlice'
import productsSlice from './slices/productsSlice'
import cartSlice from './slices/cartSlice'
import productDetailSlice from './slices/productDetailSlice'

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    products: productsSlice.reducer,
    cart: cartSlice.reducer,
    productDetail: productDetailSlice.reducer,
  },
  devTools: true,
})

export default store
