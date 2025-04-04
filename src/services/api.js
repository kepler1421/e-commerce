import axios from 'axios'

// Create an axios instance with default config
const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})
// API service for handling product data
export const productApi = {
  // Get all products
  async getAllProducts() {
    try {
      const response = await api.get('/products')
      return response.data
    } catch (error) {
      console.error('Error in getAllProducts:', error.message)
      throw error
    }
  },

  async getProductsByCategory(category) {
    try {
      const response = await api.get(`/products/category/${category}`)
      return response.data
    } catch (error) {
      console.error(`Error fetching products for category ${category}:`, error)
      throw error
    }
  },

  async getCategories() {
    try {
      const response = await api.get('/products/categories')
      return response.data
    } catch (error) {
      console.error('Error fetching categories:', error)
      throw error
    }
  },

  async getProductById(id) {
    try {
      const response = await api.get(`/products/${id}`)
      return response.data
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error)
      throw error
    }
  }
}

export default api 