package com.example.ecommerce.controller;

import com.example.ecommerce.model.Cart;
import com.example.ecommerce.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping
    public List<Cart> getAllCartItems() {
        return cartService.getAllCartItems();
    }

    @PostMapping("/{productId}/{quantity}")
    public Cart addToCart(@PathVariable Long productId, @PathVariable int quantity) {
        return cartService.addToCart(productId, quantity);
    }

    @DeleteMapping("/{id}")
    public void removeFromCart(@PathVariable Long id) {
        cartService.removeFromCart(id);
    }
    
    // Endpoint to increase stock when item is removed from cart
    @PutMapping("/{cartId}/increase-stock")
    public void increaseProductStock(@PathVariable Long cartId) {
        cartService.increaseProductStock(cartId);
    }
}
