<template lang="">
  <div >
   <h1>Posts page:</h1>
   <my-input 
    v-focus
    :model-value="searchQuery"
    @update:model-value="setSearchQuery"
    placeholder="Search for..."
   />
   <div class="app__btns">
      <my-button 
      @click="showDialog"
    >
      Create post
    </my-button>
  
    <my-select 
      :model-value="selectedSort"
      @update:model-value="setSelectedSort"
      :options="sortOptions"
    />
   </div>
  
    <my-dialog v-model:show="dialogVisible" >
      <PostForm  @create="createPost"/>
    </my-dialog>
    
   <PostList
      :posts="sortedAndSearchedPosts"
      @remove="removePost"
      v-if="!isPostsLoading"
    />
    <div v-else>Posts downloading....</div>
    <div v-intersection="loadMorePosts" class="observer"></div>
    <!-- pagination -->
    <!-- <div class="page_wrapper">
      <div
        v-for="pageNumber in totalPages"
        :key="pageNumber"
        class="page"
        :class="{
          'current-page': page === pageNumber
        }"
        @click="changePage(pageNumber)"
      >
        {{ pageNumber }}
      </div>
    </div> -->
    <!-- end paginations -->
  </div>
  
  </template>
  
  <script>
  import PostForm from '@/components/PostForm';
  import PostList from '@/components/PostList.vue';
  import axios from 'axios';
  import { 
    mapState, 
    mapGetters, 
    mapActions, 
    mapMutations
  } from 'vuex';
  
  export default {
    components: {
      PostForm,
      PostList
    },
    data(){
      dialogVisible: false
    },
    methods:{
      ...mapMutations({
        setPage: 'post/setPage',
        setSearchQuery: 'post/setSearchQuery',
        setSelectedSort: 'post/setSelectedSort'
      }),
      ...mapActions({
        loadMorePosts: 'post/loadMorePosts',
        fetchPosts: 'post/fetchPosts'
      }),
      createPost(post){
        this.posts.push(post);
        this.dialogVisible = false;
      },
      removePost(post){
        this.posts = this.posts.filter(p => p.id !== post.id);
      },
      showDialog(){
        this.dialogVisible = true;
      },
      
    },
    mounted() {
      this.fetchPosts();
    },
    computed: {
      ...mapState({
        posts: state => state.post.posts,
        isPostsLoading: state => state.post.isPostsLoading,
        selectedSort: state => state.post.selectedSort,
        searchQuery: state => state.post.searchQuery,
        page: state => state.post.page,
        limit: state => state.post.limit,
        totalPages: state => state.post.totalPages,
        sortOptions: state => state.post.sortOptions,
      }),
      ...mapGetters({
        sortedPosts: 'post/sortedPosts',
        sortedAndSearchedPosts: 'post/sortedAndSearchedPosts'
      }),
    },
    watch: {

    },
  }
  </script>
  <style>

  
    .app__btns{
      display: flex;
      justify-content: space-between;
      margin: 15px 0;
    }
  
    .page_wrapper{
      display: flex;
      margin-top: 15px;
    }
  
    .page {
      border: 1px solid black;
      padding: 5px;
    }
  
    .current-page{
      border: 2px solid teal;
    }
  
    .observer{
      height: 30px;
      background-color: green;
    }
  </style>