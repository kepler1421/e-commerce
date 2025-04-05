<template>
  <div class="cart-container">
    <h1 class="mb-4">Shopping Cart</h1>
    
    <div v-if="cartStore.items.length === 0" class="empty-cart">
      <p>Your cart is empty</p>
      <router-link to="/products" class="btn btn-primary">Continue Shopping</router-link>
    </div>

    <div v-else>
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cartStore.items" :key="item.id">
              <td>
                <div class="d-flex align-items-center">
                  <img :src="item.image" :alt="item.name" class="product-image me-2">
                  {{ item.name }}
                </div>
              </td>
              <td>${{ item.price }}</td>
              <td>
                <div class="quantity-controls">
                  <button class="btn btn-sm btn-outline-secondary" @click="cartStore.updateQuantity(item.id, item.quantity - 1)">-</button>
                  <span class="mx-2">{{ item.quantity }}</span>
                  <button class="btn btn-sm btn-outline-secondary" @click="cartStore.updateQuantity(item.id, item.quantity + 1)">+</button>
                </div>
              </td>
              <td>${{ (item.price * item.quantity).toFixed(2) }}</td>
              <td>
                <button class="btn btn-danger btn-sm" @click="cartStore.removeFromCart(item.id)">Remove</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="cart-summary mt-4">
        <div>
          <h3>Total Items: {{ cartStore.totalItems }}</h3>
          <h3>Total Price: ${{ cartStore.totalPrice.toFixed(2) }}</h3>
        </div>
        <button class="btn btn-success" @click="checkout">Proceed to Checkout</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()

const checkout = () => {
  alert('Proceeding to checkout...')
}
</script>

<style scoped>
.cart-container {
  padding: 20px;
}

.empty-cart {
  text-align: center;
  padding: 40px;
}

.quantity-controls {
  display: flex;
  align-items: center;
  justify-content: center;
}

.cart-summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 5px;
}

.product-image {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
}
</style> 