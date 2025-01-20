import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  // Fetch products from the backend
  const fetchProducts = () => {
    axios.get('http://localhost:8080/api/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  };

  // Add product to the cart
  const addToCart = (productId, quantity) => {
    axios.post(`http://localhost:8080/api/cart/${productId}/${quantity}`)
      .then(() => {
        alert('Product added to cart!');
        fetchProducts(); // Refresh product list to reflect stock changes
      })
      .catch(error => {
        console.error('Error adding to cart:', error);
        alert('Failed to add to cart. Please try again.');
      });
  };

  // Dynamically load the image from the public/images/ folder
  const getProductImage = (imageName) => {
    // Check if imageName exists and return the correct path
    return imageName ? `/images/${imageName}` : 'https://via.placeholder.com/150';
  };

  useEffect(() => {
    fetchProducts(); // Fetch products when the component mounts
  }, []);

  return (
    <Container style={{ marginTop: '80px' }}> {/* Adjust this value based on the height of your navbar */}
      <h1 className="my-4 text-center">Products</h1>
      <Row>
        {products.length > 0 ? (
          products.map(product => (
            <Col key={product.id} sm={12} md={6} lg={4} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  {/* Dynamically load the image from the public folder */}
                  <Card.Img 
                    variant="top" 
                    src={getProductImage(product.imageUrl)}  // Dynamically load image
                    alt={product.name} 
                    className="mb-3" 
                    style={{ height: '200px', objectFit: 'cover' }} 
                  />
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>
                    {product.description}
                  </Card.Text>
                  <Card.Text>
                    <strong>Price: ₹{product.price}</strong>
                  </Card.Text>
                  <Card.Text>
                    <strong>Stock: {product.stock}</strong>
                  </Card.Text>
                  <Button 
                    variant="primary" 
                    onClick={() => addToCart(product.id, 1)} // Default quantity set to 1
                    disabled={product.stock <= 0} // Disable button if stock is 0
                  >
                    {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <div className="text-center w-100">
            <h4>No products available</h4>
          </div>
        )}
      </Row>
    </Container>
  );
};

export default ProductsPage;
