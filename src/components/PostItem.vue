<template>
  <div class="post">
 
    <div>
      <div>
        {{ post.id }}
      </div>
      <div><strong>Name:</strong>{{ post.title }}</div>
        <div><strong>Description:</strong>{{ post.body }}</div>
    </div>
    <div class="post__btns">
      <my-button 
        @click="$router.push(`/posts/${post.id}`)"
      >
        Open
      </my-button>
      <my-button 
        @click="$emit('remove', post)"
      >
        Delete
      </my-button>
    </div>
        
  </div>
</template>

<script>
  export default {
    props: {
      post: Object,
      required: true
    },
  }
</script>

<style lang="scss" scoped>
  .post {
    padding: 15px;
    border: 2px solid teal;
    margin-top: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .post__btns {
    display: flex;
  }
</style>