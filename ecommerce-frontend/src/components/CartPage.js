import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Table, Button, Container, Card, Modal } from 'react-bootstrap';
import { motion } from 'framer-motion'; // For animations
import { FaShoppingCart } from 'react-icons/fa'; // For cart emoji

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showInvoice, setShowInvoice] = useState(false);
  const [orderTotal, setOrderTotal] = useState(0);

  // useCallback ensures that the function is only re-created when necessary
  const fetchCartItems = useCallback(() => {
    axios.get('http://localhost:8080/api/cart')
      .then(response => {
        setCartItems(response.data);
        calculateTotal(response.data);
      })
      .catch(error => console.error('Error fetching cart items:', error));
  }, []);

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  const removeFromCart = (id, productId, quantity) => {
    // Call the DELETE endpoint to remove the item from the cart
    axios.delete(`http://localhost:8080/api/cart/${id}`)
      .then(() => {
        // After successfully removing the item from the cart, fetch updated cart items
        fetchCartItems(); // Refresh the cart
      })
      .catch(error => {
        console.error('Error removing item:', error);
        alert('Error removing item. Please try again.');
      });
  };

  const calculateTotal = (items) => {
    const total = items.reduce((sum, item) => sum + item.totalPrice, 0);
    setOrderTotal(total);
  };

  const handlePlaceOrder = () => {
    setShowInvoice(true);
  };

  const handleCloseInvoice = () => {
    setShowInvoice(false);
    setCartItems([]); // Clear the cart
  };

  return (
    <Container className="mt-5 pt-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-center mb-4"><FaShoppingCart /> Your Cart</h1>
        <Card className="shadow p-3 mb-5 bg-white rounded">
          {cartItems.length > 0 ? (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Table responsive striped bordered hover className="text-center">
                  <thead className="bg-primary text-white">
                    <tr>
                      <th>Product ID</th>
                      <th>Quantity</th>
                      <th>Total Price</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map(item => (
                      <tr key={item.id}>
                        <td>{item.productId}</td>
                        <td>{item.quantity}</td>
                        <td>₹{item.totalPrice.toFixed(2)}</td>
                        <td>
                          <Button
                            variant="danger"
                            onClick={() => removeFromCart(item.id, item.productId, item.quantity)}
                            className="hover-effect"
                          >
                            Remove
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <div className="text-end me-3">
                  <h4 className="mt-3">Total: ₹{orderTotal.toFixed(2)}</h4>
                  <Button variant="success" onClick={handlePlaceOrder} className="mt-3 hover-effect">
                    Place Order
                  </Button>
                </div>
              </motion.div>
            </>
          ) : (
            <h4 className="text-center text-muted">Your cart is empty</h4>
          )}
        </Card>

        {/* Invoice Modal */}
        <Modal show={showInvoice} onHide={handleCloseInvoice} centered>
          <Modal.Header closeButton>
            <Modal.Title>Order Summary</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5 className="text-center">Thank you for your order!</h5>
            <p className="text-center mt-3">
              Your total amount is <strong>₹{orderTotal.toFixed(2)}</strong>.
            </p>
            <div className="text-center mt-4">
              <Button variant="primary" onClick={handleCloseInvoice}>
                Close
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      </motion.div>

      {/* Add custom styles */}
      <style jsx>{`
        .hover-effect:hover {
          background-color: #f1f1f1;
          transform: scale(1.05);
          transition: transform 0.3s ease, background-color 0.3s ease;
        }
      `}</style>
    </Container>
  );
};

export default CartPage;
