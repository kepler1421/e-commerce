<template>
  <div class="container-fluid">
    <div class="row">
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
            <ProductCard 
              :product="product" 
              @add-to-cart="addToCart"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { productApi } from '@/services/api'
import ProductCard from '@/components/ProductCard.vue'
import { useCartStore } from '@/stores/cart'

export default {
  name: 'productsView',
  components: {
    ProductCard
  },
  data() {
    return {
      products: [],
      categories: [],
      selectedCategory: null,
      loading: true,
      error: null
    }
  },
  computed: {
    searchQuery() {
      return this.$route.query.search || ''
    },
    filteredProducts() {
      let filtered = this.products

      if (this.selectedCategory) {
        filtered = filtered.filter(product => product.category === this.selectedCategory)
      }

      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase()
        filtered = filtered.filter(product => 
          product.title.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
        )
      }

      return filtered
    }
  },
  methods: {
    async fetchProducts() {
      this.loading = true
      this.error = null
      try {
        const data = await productApi.getAllProducts()
        this.products = data.map(product => ({
          ...product,
          rating: Math.floor(Math.random() * 5) + 1,
          rating_count: Math.floor(Math.random() * 100)
        }))
      } catch (err) {
        this.error = 'Failed to load products'
      } finally {
        this.loading = false
      }
    },
    async fetchCategories() {
      try {
        this.categories = await productApi.getCategories()
      } catch (err) {
        console.error('Error loading categories:', err)
      }
    },
    selectCategory(category) {
      this.selectedCategory = category
    },
    addToCart(product) {
      const cartStore = useCartStore()
      cartStore.addItem({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1
      })
    }
  },
  async mounted() {
    await Promise.all([this.fetchProducts(), this.fetchCategories()])
  },
  watch: {
    '$route.query.search'() {
      this.fetchProducts()
    }
  }
}
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
