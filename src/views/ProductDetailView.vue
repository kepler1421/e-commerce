<template>
  <div class="container mt-5">
    <div v-if="loading" class="text-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p>Loading product details...</p>
    </div>

    <div v-else-if="error" class="alert alert-danger">
      {{ error }}
    </div>

    <div v-else class="row">
      <!-- Product Image -->
      <div class="col-md-6 mb-4">
        <div class="card">
          <img :src="product.image" :alt="product.title" class="card-img-top p-4" style="height: 400px; object-fit: contain;">
        </div>
      </div>

      <!-- Product Details -->
      <div class="col-md-6">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><router-link to="/products">Products</router-link></li>
            <li class="breadcrumb-item active">{{ product.title }}</li>
          </ol>
        </nav>

        <h1 class="mb-4">{{ product.title }}</h1>
        <div class="mb-4">
          <span class="h2 text-success">${{ product.price }}</span>
        </div>

        <div class="mb-4">
          <h5>Description</h5>
          <p>{{ product.description }}</p>
        </div>

        <div class="mb-4">
          <h5>Category</h5>
          <span class="badge bg-secondary">{{ product.category }}</span>
        </div>

        <div class="d-flex gap-2">
          <div class="input-group" style="width: 150px;">
            <button class="btn btn-outline-secondary" type="button" @click="decrementQuantity">-</button>
            <input type="number" class="form-control text-center" v-model="quantity" min="1">
            <button class="btn btn-outline-secondary" type="button" @click="incrementQuantity">+</button>
          </div>
          
          <button class="btn btn-primary flex-grow-1" @click="addToCart">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useCartStore } from '@/stores/cart'

const route = useRoute()
const cartStore = useCartStore()

const product = ref(null)
const loading = ref(true)
const error = ref(null)
const quantity = ref(1)

const fetchProduct = async () => {
  try {
    loading.value = true
    const response = await fetch(`https://fakestoreapi.com/products/${route.params.id}`)
    if (!response.ok) throw new Error('Failed to fetch product')
    product.value = await response.json()
  } catch (err) {
    error.value = 'Failed to load product details'
  } finally {
    loading.value = false
  }
}

const incrementQuantity = () => {
  quantity.value++
}

const decrementQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const addToCart = () => {
  if (product.value) {
    cartStore.addItem({
      id: product.value.id,
      title: product.value.title,
      price: product.value.price,
      image: product.value.image,
      quantity: quantity.value
    })
  }
}

onMounted(() => {
  fetchProduct()
})
</script>

<style scoped>
.card {
  border: 1px solid #ddd;
  border-radius: 8px;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
</style> 