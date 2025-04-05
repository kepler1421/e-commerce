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
    <!-- <main class="container py-4 flex-grow"> -->
      <router-view></router-view>
    
    <Footer />
  </div>
</template>

<style>

</style>
