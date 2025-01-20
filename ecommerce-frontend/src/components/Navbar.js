import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

function NavigationBar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand href="/" className="fw-bold text-warning">E-Shop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to="/" className="px-3 text-light">Home</Nav.Link>
            <Nav.Link as={Link} to="/products" className="px-3 text-light">Products</Nav.Link>
            <Nav.Link as={Link} to="/product-crud" className="px-3 text-light">Product CRUD</Nav.Link>
            <Nav.Link as={Link} to="/cart" className="px-3 text-light">Cart</Nav.Link>

            {/* Add a Button for Login or other action */}
            <Nav.Link as={Link} to="/login">
              <Button variant="outline-light" className="px-4 py-2">
                Login
              </Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
