<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white sticky-navbar">
    <div class="container-fluid">
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
              <span v-if="cartStore.totalItems" class="position-absolute start-50 translate-middle badge rounded-pill bg-danger">
                {{ cartStore.totalItems }}
              </span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { useCartStore } from '@/stores/cart'

export default {
  name: 'Navbar',
  data() {
    return {
      searchQuery: '',
      cartStore: useCartStore()
    }
  },
  created() {
    // Initialize search query from route
    this.searchQuery = this.$route.query.search || ''
  },
  watch: {
    '$route.query.search'(newValue) {
      this.searchQuery = newValue || ''
    }
  },
  methods: {
    handleSearch() {
      const query = this.searchQuery.trim()
      if (query) {
        this.$router.push({
          path: '/products',
          query: { search: query }
        })
      } else {
        this.$router.push('/products')
      }
    }
  }
}
</script>

<style scoped>
.sticky-navbar {
    position: sticky;
    top: 0;
    z-index: 1020;
}

.navbar {
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
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
