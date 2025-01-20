import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { motion } from 'framer-motion'; // For animations

function ProductCRUD() {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    stock: ''
  });
  const [productList, setProductList] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState('');
  
  const navigate = useNavigate(); // Use navigate to handle redirects

  // Fetch the list of products for the dropdown
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/products');
        setProductList(response.data); // Assuming response.data is an array of products
      } catch (error) {
        alert('Error fetching products');
      }
    };
    fetchProducts();
  }, []);

  // Fetch product details when a product is selected from the dropdown
  useEffect(() => {
    if (selectedProductId) {
      const fetchProductDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/products/${selectedProductId}`);
          setProduct(response.data);
        } catch (error) {
          alert('Error fetching product details');
        }
      };
      fetchProductDetails();
    }
  }, [selectedProductId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleCreate = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/products', product);
      alert('Product Created: ' + response.data.name);
      setProduct({ name: '', price: '', description: '', stock: '' }); // reset form
      navigate('/products'); // Redirect after product creation
    } catch (error) {
      alert('Error creating product');
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:8080/api/products/${selectedProductId}`, product);
      alert('Product Updated: ' + response.data.name);
      setProduct({ name: '', price: '', description: '', stock: '' }); // reset form
      setSelectedProductId(''); // Clear the selected product
      navigate('/products'); // Redirect after product update
    } catch (error) {
      alert('Error updating product');
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8080/api/products/${selectedProductId}`);
        alert('Product Deleted');
        setSelectedProductId(''); // Clear the selected product
        navigate('/products'); // Redirect after product deletion
      } catch (error) {
        alert('Error deleting product');
      }
    }
  };

  return (
    <>
      {/* Navbar for navigation */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="/">E-Commerce</Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link href="/products">Products</Nav.Link>
          <Nav.Link href="/orders">Orders</Nav.Link>
          <Nav.Link href="/cart">Cart</Nav.Link>
        </Nav>
      </Navbar>

      {/* Main container for Product CRUD operations */}
      <Container className="pt-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-center mb-4">Product CRUD Operations</h2>

          {/* Dropdown to select product for update or delete */}
          <Form.Group className="mb-3" controlId="productSelect">
            <Form.Label>Select Product</Form.Label>
            <Form.Control
              as="select"
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e.target.value)}
            >
              <option value="">Select a product</option>
              {productList.map((productItem) => (
                <option key={productItem.id} value={productItem.id}>
                  {productItem.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          {selectedProductId && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Form>
                <Row>
                  <Col sm={12} md={6} className="mb-3">
                    <Form.Group controlId="productName">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter product name"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>

                  <Col sm={12} md={6} className="mb-3">
                    <Form.Group controlId="productPrice">
                      <Form.Label>Price</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter product price"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3" controlId="productDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter product description"
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="productStock">
                  <Form.Label>Stock</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter product stock"
                    name="stock"
                    value={product.stock}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Button variant="primary" onClick={handleUpdate} className="me-2">Update Product</Button>
                <Button variant="danger" onClick={handleDelete}>Delete Product</Button>
              </Form>
            </motion.div>
          )}

          {/* Create Product Section */}
          <div className="mt-4">
            <h3>Create New Product</h3>
            <Form>
              <Row>
                <Col sm={12} md={6} className="mb-3">
                  <Form.Group controlId="createProductName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter product name"
                      name="name"
                      value={product.name}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>

                <Col sm={12} md={6} className="mb-3">
                  <Form.Group controlId="createProductPrice">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter product price"
                      name="price"
                      value={product.price}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3" controlId="createProductDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter product description"
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="createProductStock">
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter product stock"
                  name="stock"
                  value={product.stock}
                  onChange={handleChange}
                />
              </Form.Group>

              <Button variant="primary" onClick={handleCreate}>Create Product</Button>
            </Form>
          </div>
        </motion.div>
      </Container>
    </>
  );
}

export default ProductCRUD;
