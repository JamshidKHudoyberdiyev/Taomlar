<template>
  <div>
    <Navbar />
    <RouterView></RouterView>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
// import Index from './components/Index.vue'
export default {
  components: {
    Navbar
  }
}
</script>

<style lang="scss" scoped></style>
