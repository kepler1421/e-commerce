<template>
  <div id="heroCarousel" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner">
      <div 
        v-for="(image, index) in images" 
        :key="index" 
        :class="['carousel-item', index === 0 ? 'active' : '']"
      >
        <img :src="image.src" :alt="image.alt" class="d-block w-100" />
        <div class="carousel-caption d-none d-md-block">
          <h5>{{ image.title }}</h5>
          <p>{{ image.description }}</p>
        </div>
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'HeroCarousel',
  data() {
    return {
      images: [
        {
          src: '/src/assets/img1.jpg',
          alt: 'First Slide',
          title: 'Welcome to Our Store!',
          description: 'Discover amazing products at unbeatable prices.'
        },
        {
          src: '/src/assets/img2.jpg',
          alt: 'Second Slide',
          title: 'Exclusive Offers Just for You',
          description: 'Shop now and enjoy special discounts on selected items!'
        },
        {
          src: '/src/assets/img3.jpg',
          alt: 'Third Slide',
          title: 'Join Our Community',
          description: 'Sign up for our newsletter and stay updated on the latest trends.'
        }
      ]
    }
  }
}
</script>

<style scoped>
.carousel-item img {
  object-fit: cover;
  height: 300px;
  width: 100%;
}
</style>
