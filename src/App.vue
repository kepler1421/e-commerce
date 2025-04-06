<template>
  <div>
    <Navbar />

    <!-- <HeroCarousel /> -->
    
    <!-- Search Input Section -->
    <!-- <div class="container py-4">
      <div class="input-group mb-4">
        <input 
          type="text" 
          v-model="searchQuery" 
          @input="handleSearch" 
          class="form-control" 
          placeholder="Search for products..."
        />
        <button class="btn btn-outline-primary" @click="handleSearch">Search</button>
      </div>
    </div> -->

    <!-- Main Content -->
    <router-view />
    
    <Footer />
  </div>
</template>

<script>
// import { useCartStore } from '@/stores/cart'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
// import { useRouter, useRoute } from 'vue-router'


export default {
  components: {
    Navbar,
    Footer
  },
  // data() {
  //   return {
  //     searchQuery: ''
  //   }
  // },
  // watch: {
  //   '$route.query.search': function(newSearch) {
  //     this.searchQuery = newSearch || ''
  //   }
  // },
  // methods: {
  //   handleSearch() {
  //     const trimmedSearch = this.searchQuery.trim()
  //     const router = useRouter()
  //     if (trimmedSearch !== this.$route.query.search) {
  //       if (trimmedSearch) {
  //         router.push({
  //           path: '/products',
  //           query: { search: trimmedSearch }
  //         })
  //       } else {
  //         router.push('/products')
  //       }
  //     }
  //   }
  // }
}
</script>

<style>
/* Example for improving layout and spacing */
body {
  margin: 0;
  font-family: 'Arial', sans-serif;
  background: red;
}

.min-h-screen {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex-grow: 1;
  padding: 20px;
}

footer {
  margin-top: auto;
  padding: 10px 0;
  background-color: #f8f9fa;
  text-align: center;
}
</style>
