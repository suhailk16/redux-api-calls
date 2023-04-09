import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from 'react-bootstrap/Spinner'
import Alert from 'react-bootstrap/Alert'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import { fetchProducts } from '../slices/productsSlice'
import { Container } from 'react-bootstrap'
import Header from '../components/Header'
import { Link } from 'react-router-dom'

function HomePage() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  const { processing, error, data } = useSelector(function (state) {
    return {
      processing: state.products.processing,
      error: state.products.error,
      data: state.products.data,
    }
  })

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
      <Alert variant="danger">An error occurred while fetching products</Alert>
    )
  } else if (data) {
    content = (
      <Row>
        {data.map((product) => {
          return (
            <Col style={{ marginBottom: 20 }}>
              <Card key={product.id} style={{ width: '18rem' }}>
                <Card.Img variant="top" src={product.thumbnail} />
                <Card.Body>
                  <Link to={`/product/${product.id}`}>
                    <Card.Title>{product.title}</Card.Title>
                  </Link>
                  <Card.Text>{product.description}</Card.Text>
                  <Card.Subtitle style={{ color: 'green', fontWeight: 'bold' }}>
                    ${product.price}
                  </Card.Subtitle>
                </Card.Body>
              </Card>
            </Col>
          )
        })}
      </Row>
    )
  }

  return (
    <div>
      <Header />
      <Container>
        <h1>Buy Tech Gadgets here</h1>
        {content}
      </Container>
    </div>
  )
}

export default HomePage
