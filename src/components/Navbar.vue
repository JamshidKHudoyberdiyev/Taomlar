<template>
  <div>
    <nav class="navbar bg-indigo-700">
      <router-link :to="{ name: 'Index' }">
        <span class="text-2xl text-white navbar-title"> Taomlar va ichimliklar ro'yhati </span>
      </router-link>
      <a href="" class="text-pink-500 addIcon">
        <router-link :to="{ name: 'AddProduct' }">
          <i class="bx bxs-plus-circle"></i>
        </router-link>
      </a>
    </nav>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.navbar {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 20px;
  position: relative;
}
.navbar-title {
  padding: 0 20px;
}
.addIcon {
  font-size: 50px;
}
</style>
