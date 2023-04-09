import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Header from '../components/Header'
import Spinner from 'react-bootstrap/Spinner'
import Alert from 'react-bootstrap/Alert'
import { fetchProductDetail } from '../slices/productDetailSlice'
import { addToCart } from '../slices/cartSlice'

function ProductPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    processing,
    error,
    data,
    user,
    cartDetails,
    addingToCart,
    errorAddingToCart,
  } = useSelector(function (state) {
    return {
      processing: state.productDetail.processing,
      addingToCart: state.cart.addingToCart,
      error: state.productDetail.error,
      data: state.productDetail.data,
      user: state.user.data,
      cartDetails: state.cart.data[0],
      errorAddingToCart: state.cart.errorAddingToCart,
    }
  })
  const [selectedImage, setSelectedImage] = useState(null)
  let { id } = useParams()

  useEffect(() => {
    if (data) {
      setSelectedImage(data.images[0])
    }
  }, [data])

  useEffect(() => {
    dispatch(fetchProductDetail(id))
  }, [dispatch, id])

  const handleAddToCart = () => {
    if (user) {
      // logged in
      // make api call to add to cart
      dispatch(
        addToCart({
          cartDetails,
          productDetails: {
            id: data.id,
            title: data.title,
            price: data.price,
            discountPercentage: data.discountPercentage,
          },
          userId: user.id,
        }),
      )
    } else {
      // not logged in
      navigate('/login')
    }
  }

  let content = <div />

  if (processing) {
    content = (
      <div
        style={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    )
  } else if (error) {
    content = (
      <Alert variant="danger">
        An error occurred while fetching product details
      </Alert>
    )
  } else if (data) {
    content = (
      <div className="product-detail-container">
        <div className="product-detail-carousel">
          {data.images.map(function (imageUrl) {
            return (
              <img
                key={imageUrl}
                src={imageUrl}
                alt={data.title}
                style={{
                  border:
                    selectedImage === imageUrl ? '2px solid blue' : undefined,
                }}
                onClick={() => {
                  setSelectedImage(imageUrl)
                }}
              />
            )
          })}
        </div>
        <div className="product-detail-image">
          <img src={selectedImage} alt={data.title} />
        </div>
        <div className="product-detail-info">
          <h3>{data.title}</h3>
          <h4 style={{ color: 'green' }}>${data.price}</h4>
          <p>Discount: {data.discountPercentage}</p>
          <div className="label">
            <span>{data.category}</span>
          </div>
          <p>
            Only <strong>{data.stock}</strong> left, hurry up!
          </p>
          <p>{data.description}</p>

          <Button variant="primary" onClick={handleAddToCart}>
            {addingToCart ? (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              'Add to Cart'
            )}
          </Button>

          {errorAddingToCart && (
            <Alert variant="danger">
              An error occurred while adding to cart
            </Alert>
          )}
        </div>
      </div>
    )
  }

  return (
    <div>
      <Header />

      {content}
    </div>
  )
}

export default ProductPage
