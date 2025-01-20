import React from 'react';
import { Carousel, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Import local images for the carousel
import slide1 from '../images/slide-2.png';  // Corrected path
import slide2 from '../images/slide-3.png'; // Corrected path
import slide3 from '../images/slide-1.png';  // Corrected path

function HomePage() {
  return (
    <div className="page-content">
      {/* Image Carousel */}
      <Carousel className="mb-4">
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src={slide1}  // Corrected to the local image
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Exclusive Deals</h3>
            <p>Shop the best products at unbeatable prices!</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src={slide2}  // Corrected to the local image
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Trending Now</h3>
            <p>Discover the latest products that everyone’s talking about.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src={slide3}  // Corrected to the local image
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Best Sellers</h3>
            <p>Shop our best-selling items that are loved by customers.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* Website Introduction Section */}
      <Container className="my-5">
        <Row className="text-center">
          <Col>
            <h2>Welcome to E-Shop!</h2>
            <p>Your one-stop shop for all things awesome! We offer the best deals on electronics, fashion, home appliances, and more. Explore our exclusive collection and find your next favorite item.</p>
            <Button variant="primary" as={Link} to="/products">Shop Now</Button>
          </Col>
        </Row>
      </Container>

      {/* Footer Section */}
      <footer className="bg-dark text-light text-center py-4">
        <p>&copy; 2024 E-Shop. All Rights Reserved.</p>
        <p>
          <Link to="/about" className="text-light">About Us</Link> | 
          <Link to="/contact" className="text-light"> Contact</Link>
        </p>
      </footer>
    </div>
  );
}

export default HomePage;
