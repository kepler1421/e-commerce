<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const cartStore = useCartStore()
const searchQuery = ref('')
const router = useRouter()
const route = useRoute()

// Initialize search input from route query
watch(() => route.query.search, (newSearch) => {
  searchQuery.value = newSearch || ''
}, { immediate: true })

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({
      path: '/products',
      query: { search: searchQuery.value.trim() }
    })
  } else {
    // If search is empty, go to products page without query
    router.push('/products')
  }
}
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-primary">
    <div class="container">
      <router-link class="navbar-brand" to="/">KeplerShop</router-link>
      
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <form class="d-flex mx-auto" @submit.prevent="handleSearch">
          <input 
            class="form-control me-2" 
            type="search" 
            placeholder="Search products..." 
            v-model="searchQuery"
            style="min-width: 400px;"
          >
        </form>

        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/products">Products</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/categories">Categories</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/cart" class="nav-link position-relative">
              <i class="bi bi-cart3 fs-5">Cart</i>
              <span v-if="cartStore.totalItems" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {{ cartStore.totalItems }}
              </span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <main class="container py-4">
    <router-view></router-view>
  </main>

  <footer class="footer mt-auto py-3 bg-light">
    <div class="container text-center">
      <span class="text-muted">&copy; 2025 KeplerShop. All rights reserved.</span>
    </div>
  </footer>
</template>

<style>
body {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}

.footer {
  margin-top: auto;
}

.nav-link {
  color: #2c3e50;
  font-weight: 500;
}

.nav-link:hover {
  color: #0d6efd;
}

.navbar-brand {
  font-weight: bold;
  font-size: 1.5rem;
}
</style>
