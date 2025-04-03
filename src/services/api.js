import axios from 'axios'

console.log('API service initializing...')

// Create an axios instance with default config
const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

console.log('Axios instance created with baseURL:', api.defaults.baseURL)

// API service for handling product data
export const productApi = {
  // Get all products
  async getAllProducts() {
    console.log('getAllProducts called')
    try {
      console.log('Making API request to /products...')
      const response = await api.get('/products')
      console.log('API response received:', response)
      return response.data
    } catch (error) {
      console.error('Error in getAllProducts:', error.message)
      throw error
    }
  },

  // Get products by category
  async getProductsByCategory(category) {
    try {
      const response = await api.get(`/products/category/${category}`)
      return response.data
    } catch (error) {
      console.error(`Error fetching products for category ${category}:`, error)
      throw error
    }
  },

  // Get all available categories
  async getCategories() {
    try {
      const response = await api.get('/products/categories')
      return response.data
    } catch (error) {
      console.error('Error fetching categories:', error)
      throw error
    }
  },

  // Get a single product by ID
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