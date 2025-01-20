package com.example.ecommerce.service;

import com.example.ecommerce.model.Cart;
import com.example.ecommerce.model.Product;
import com.example.ecommerce.repository.CartRepository;
import com.example.ecommerce.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductRepository productRepository;

    public List<Cart> getAllCartItems() {
        return cartRepository.findAll();
    }

    public Cart addToCart(Long productId, int quantity) {
        Product product = productRepository.findById(productId).orElseThrow(() -> new RuntimeException("Product not found"));
        if (product.getStock() < quantity) {
            throw new RuntimeException("Insufficient stock");
        }

        product.setStock(product.getStock() - quantity);
        productRepository.save(product);

        Cart cart = new Cart();
        cart.setProductId(productId);
        cart.setQuantity(quantity);
        cart.setTotalPrice(product.getPrice() * quantity);
        return cartRepository.save(cart);
    }

    public void removeFromCart(Long cartId) {
        Cart cart = cartRepository.findById(cartId).orElseThrow(() -> new RuntimeException("Cart item not found"));
        Product product = productRepository.findById(cart.getProductId()).orElseThrow(() -> new RuntimeException("Product not found"));

        // Increase the product stock when the item is removed from the cart
        product.setStock(product.getStock() + cart.getQuantity());
        productRepository.save(product);

        // Remove the item from the cart
        cartRepository.deleteById(cartId);
    }

    // Method to increase stock after removing an item from the cart
    public void increaseProductStock(Long cartId) {
        Cart cart = cartRepository.findById(cartId).orElseThrow(() -> new RuntimeException("Cart item not found"));
        Product product = productRepository.findById(cart.getProductId()).orElseThrow(() -> new RuntimeException("Product not found"));

        // Increase the stock based on the quantity in the cart
        product.setStock(product.getStock() + cart.getQuantity());
        productRepository.save(product);
    }
}
