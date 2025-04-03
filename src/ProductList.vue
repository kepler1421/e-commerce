<template>
    <div class="grid grid-cols-3 gap-4 p-4">
      <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>
  </template>
  
  <script setup>
  import ProductCard from '../components/ProductCard.vue';
  
  const products = [
    { id: 1, name: "Product A", price: 10, image: "https://via.placeholder.com/150" },
    { id: 2, name: "Product B", price: 20, image: "https://via.placeholder.com/150" },
  ];
  </script>
  