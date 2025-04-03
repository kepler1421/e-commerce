<template>
  <nav class="flex justify-between p-4 bg-white shadow">
    <h1 class="text-xl font-bold">MyShop</h1>
    <input type="text" placeholder="Search..." class="border p-2 rounded">
    <router-link to="/cart" class="relative">
      🛒 Cart ({{ cartItems.length }})
    </router-link>
  </nav>
</template>

<script setup>
import { computed } from 'vue';
import { useCartStore } from '../store/cart.js';

const cartStore = useCartStore();
const cartItems = computed(() => cartStore.items);
</script>
