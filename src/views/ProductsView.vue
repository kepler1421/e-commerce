<template>
  <div class="container-fluid">
    <div class="row">
      <!-- Sidebar -->
      <div class="col-md-3 mb-4">
        <div class="card">
          <div class="card-header">
            <h5 class="mb-0">Categories</h5>
          </div>
          <div class="list-group list-group-flush">
            <button 
              class="list-group-item list-group-item-action"
              :class="{ active: !selectedCategory }"
              @click="selectCategory(null)"
            >
              All Products
            </button>
            <button 
              v-for="category in categories" 
              :key="category"
              class="list-group-item list-group-item-action text-capitalize"
              :class="{ active: selectedCategory === category }"
              @click="selectCategory(category)"
            >
              {{ category }}
            </button>
          </div>
        </div>
      </div>

      <!-- Products Grid -->
      <div class="col-md-9">
        <div v-if="loading" class="text-center">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p>Loading products...</p>
        </div>

        <div v-else-if="error" class="alert alert-danger">
          {{ error }}
        </div>

        <div v-else class="row">
          <div v-for="product in filteredProducts" :key="product.id" class="col-md-4 mb-4">
            <div class="card h-100">
              <router-link :to="'/products/' + product.id" class="text-decoration-none">
                <img :src="product.image" class="card-img-top p-3" :alt="product.title" style="height: 200px; object-fit: contain;">
                <div class="card-body d-flex flex-column">
                  <h5 class="card-title text-dark">{{ product.title }}</h5>
                  <p class="card-text flex-grow-1 text-secondary">{{ product.description.substring(0, 100) }}...</p>
                  <div class="d-flex justify-content-between align-items-center mt-auto">
                    <span class="price">${{ product.price }}</span>
                  </div>
                </div>
              </router-link>
              <div class="card-footer bg-transparent border-top-0">
                <button class="btn btn-primary w-100" @click="addToCart(product)">Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCartStore } from '@/stores/cart'

const products = ref([])
const categories = ref([])
const selectedCategory = ref(null)
const loading = ref(true)
const error = ref(null)
const cartStore = useCartStore()

const fetchCategories = async () => {
  try {
    const response = await fetch('https://fakestoreapi.com/products/categories')
    categories.value = await response.json()
  } catch (err) {
    console.error('Error fetching categories:', err)
  }
}

const fetchProducts = async () => {
  try {
    loading.value = true
    const response = await fetch('https://fakestoreapi.com/products')
    if (!response.ok) throw new Error('Failed to fetch products')
    products.value = await response.json()
  } catch (err) {
    error.value = 'Failed to load products'
  } finally {
    loading.value = false
  }
}

const filteredProducts = computed(() => {
  if (!selectedCategory.value) return products.value
  return products.value.filter(product => product.category === selectedCategory.value)
})

const selectCategory = (category) => {
  selectedCategory.value = category
}

const addToCart = (product) => {
  cartStore.addItem({
    id: product.id,
    title: product.title,
    price: product.price,
    image: product.image,
    quantity: 1
  })
}

onMounted(async () => {
  await Promise.all([fetchProducts(), fetchCategories()])
})
</script>

<style scoped>
.card {
  transition: transform 0.2s;
  border: 1px solid #ddd;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-title {
  font-size: 1rem;
  height: 2.4rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.card-text {
  color: #6c757d;
  font-size: 0.9rem;
}

.price {
  font-size: 1.25rem;
  font-weight: bold;
  color: #28a745;
}

.list-group-item {
  cursor: pointer;
}

.list-group-item:hover {
  background-color: #f8f9fa;
}

.list-group-item.active {
  background-color: #0d6efd;
  border-color: #0d6efd;
}
</style> 