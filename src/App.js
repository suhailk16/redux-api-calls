import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage from './pages/CartPage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import TermsAndConditionsPage from './pages/TermsAndConditionsPage'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Provider } from 'react-redux'
import store from './store'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/product/:id',
    element: <ProductDetailPage />,
  },
  {
    path: '/cart',
    element: <CartPage />,
  },
  {
    path: '/privacy-policy',
    element: <PrivacyPolicyPage />,
  },
  {
    path: '/terms-and-conditions',
    element: <TermsAndConditionsPage />,
  },
])

function App() {
  return (
    <div>
      <Toaster />

      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </div>
  )
}

export default App

/*
  Login Page
    - Login Form (/login)
      - Email
      - Password
    - Home Page (/)
      - List of Products
    - Product Page (/product/:id) (dynamic route)
      - Product Details
    - Carts (/cart)
      - List of Cart Items
    - Privacy Policy (/privacy-policy)
    - Terms and Conditions (/terms-and-conditions)
*/
