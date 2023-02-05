<template>
    <form action="" @submit.prevent>
    <h4>Post creation</h4>
    <my-input
      v-model="post.title"
      placeholder="Name"
      type="text"
    />
    <my-input
      v-model="post.body"
      placeholder="Description"
      type="text"
    />
    <my-button
      @click="createPost"
      style="align-self: flex-end; margin-top: 15px"
    >
      Create
    </my-button>
  </form>
  
</template>

<script>
  export default {
    data(){
      return {
        post: {
          title: '',
          body: ''
        }
      }
    },
    methods: {
      createPost(){
      this.post.id = Date.now();
      this.$emit('create', this.post)
      this.post = {
        title: '',
        body: ''
      }
      }
    }
    
  }
</script>

<style lang="scss" scoped>
  form {
    display: flex;
    flex-direction: column;
  }
</style>