<template>
  <div class="p-4">
    <h2 class="text-2xl font-bold">Shopping Cart</h2>
    <ul v-if="cartItems.length > 0">
      <li v-for="item in cartItems" :key="item.id" class="flex justify-between">
        <span>{{ item.name }} (x{{ item.quantity }})</span>
        <span>${{ item.price * item.quantity }}</span>
      </li>
    </ul>
    <p v-else>Your cart is empty.</p>
    <router-link to="/checkout" v-if="cartItems.length > 0" class="bg-green-500 text-white px-4 py-2 mt-4">
      Proceed to Checkout
    </router-link>
  </div>
</template>

<script>
import { useCartStore } from '../stores/cart.js';

export default {
  name: 'Cart',
  computed: {
    cartItems() {
      const cartStore = useCartStore();
      return cartStore.items;
    }
  }
}
</script>
