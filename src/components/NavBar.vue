<template>
  <div class="navbar">
    <div @click="$router.push('/')">Vue 3 app</div>
    <div class="navbar__btns">
      <my-button @click="$router.push('/posts')">Posts</my-button>
      <my-button style="margin-left: 20px" @click="$router.push('/about')">About</my-button>
      <!-- <router-link to="/posts">Posts</router-link>
      <router-link to="/about">About</router-link> -->
    </div>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  background-color: gray;
  box-shadow: 2px 2px 4px gray;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
}

</style>