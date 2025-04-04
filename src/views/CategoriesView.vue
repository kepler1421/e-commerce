<template>
  <div class="container mt-4">
    <h2>Categories</h2>
    <p v-if="loading">Loading...</p>
    <p v-if="error">{{ error }}</p>
    <div class="row mt-4">
      <div v-for="category in categories" :key="category" class="col-md-3 mb-3">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title text-capitalize">{{ category }}</h5>
            <router-link 
              :to="`/products?category=${category}`" 
              class="btn btn-primary"
            >
              View Products
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CategoriesView',
  data() {
    return {
      categories: [],
      loading: true,
      error: null
    }
  },
  async created() {
    try {
      const response = await fetch('https://fakestoreapi.com/products/categories')
      this.categories = await response.json()
    } catch (err) {
      this.error = 'Failed to load categories'
    } finally {
      this.loading = false
    }
  }
}
</script>

<style scoped>
.card {
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-title {
  margin-bottom: 1rem;
}

</style> 