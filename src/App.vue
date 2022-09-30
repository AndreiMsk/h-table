<template>
  <Header />

  <main class="main">
    <router-view></router-view>
  </main>

  <Footer />
</template>

<script setup>
  
import Header from './components/Global/Header/Header.vue'
import Footer from './components/Global/Footer.vue'

</script>
  


