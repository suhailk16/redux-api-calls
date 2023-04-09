import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'
import Header from '../components/Header'
import Table from 'react-bootstrap/Table'
import { Container } from 'react-bootstrap'

function CartPage() {
  const navigate = useNavigate()

  const { user, cartItems, cartDetails } = useSelector(function (state) {
    return {
      user: state.user.data,
      cartItems: state.cart.data.length > 0 ? state.cart.data[0].products : [],
      cartDetails: state.cart.data.length > 0 ? state.cart.data[0] : {},
    }
  })

  useEffect(() => {
    if (user === null)  {
      navigate('/login')
    }
  }, [navigate, user])

  return (
    <div>
      <Header />

      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Subtotal</th>
              <th>Discount %</th>
              <th>Final Total</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((cartItem, index) => {
              return (
                <tr key={cartItem.id}>
                  <td>{index + 1}</td>
                  <td>{cartItem.title}</td>
                  <td>${cartItem.price}</td>
                  <td>{cartItem.quantity}</td>
                  <td>${cartItem.total}</td>
                  <td>{cartItem.discountPercentage}%</td>
                  <td>${cartItem.discountedPrice}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <ListGroup style={{ maxWidth: 200 }}>
            <ListGroup.Item>
              Total Product: <strong>{cartDetails.totalProducts}</strong>
            </ListGroup.Item>
            <ListGroup.Item>
              Total Qty: <strong>{cartDetails.totalQuantity}</strong>
            </ListGroup.Item>
            <ListGroup.Item>
              Total: <strong>${cartDetails.total}</strong>
            </ListGroup.Item>
            <ListGroup.Item>
              Grand Total: <strong>${cartDetails.discountedTotal}</strong>
            </ListGroup.Item>
          </ListGroup>
        </div>
      </Container>
    </div>
  )
}

export default CartPage
