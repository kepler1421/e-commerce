<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

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
  <div class="min-h-screen flex flex-col">
    <Navbar />
    <main class="container py-4 flex-grow">
      <router-view></router-view>
    </main>
    <Footer />
  </div>
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
