import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Image from 'react-bootstrap/Image'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function Header() {
  const user = useSelector(function (state) {
    return state.user.data
  })

  let content = <div />

  if (user === null) {
    content = (
      <Button variant="outline-success">
        <Link to="/login">Login</Link>
      </Button>
    )
  } else {
    content = <Image width={40} height={40} roundedCircle src={user.imageUrl} />
  }

  return (
    <Navbar bg="light" expand="lg" style={{ marginBottom: 20 }}>
      <Container fluid>
        <Navbar.Brand>
          <Link to="/">Buy Gadgets</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link>
              <Link to="/cart">Cart</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/privacy-policy">Privacy Policy</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/terms-and-conditions">TAC</Link>
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
          </Form>
          {content}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
