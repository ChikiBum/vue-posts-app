<template lang="">
  <div >
   <h1>Posts page:</h1>
   <my-input 
    v-focus
    v-model="searchQuery"
    placeholder="Search for..."
   />
   <div class="app__btns">
      <my-button 
      @click="showDialog"
    >
      Create post
    </my-button>
  
    <my-select 
      v-model="selectedSort"
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
  
  export default {
    components: {
      PostForm,
      PostList
    },
    data(){
      return{
        posts: [],
        dialogVisible: false,
        isPostsLoading: false,
        selectedSort: '',
        searchQuery: '',
        page: 1,
        limit: 10,
        totalPages: 10,
        sortOptions: [
          {value: 'title', name: 'by Name'},
          {value: 'body', name: 'by Desctiption'},
        ]
      }
    },
    methods:{
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
      //  paginations
      // changePage(pageNumber){
      //   this.page = pageNumber;
      // },
      // end  paginations
      async fetchPosts(){
        try {
          this.isPostsLoading = true;
  
  
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
              params: {
                _page: this.page,
                _limit: this.limit
              }
            });
           
            this.posts = response.data;
            this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
  
        } catch (error) {
          alert(error)
        } finally {
          this.isPostsLoading = false;
        }
      },
      async loadMorePosts(){
        try {
          this.page += 1;
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
              params: {
                _page: this.page,
                _limit: this.limit
              }
            });
           
            this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
            this.posts = [...this.posts, ...response.data];
        } catch (error) {
          alert(error)
        } finally {
  33      }
      }
    },
    mounted() {
      // this hook runs when components are mounted
      this.fetchPosts();
  
      /**intersection
      *const options = {
      *  rootMargin: '0px',
      *  threshold: 1.0
      * }
     
      *const callback = (entires, observer) => {
      *    if (entires[0].isIntersecting && this.page < this.totalPages){
      *    this.loadMorePosts();
      *  }
      *}
  
      *const observer = new IntersectionObserver(callback, options);
      *observer.observe(this.$refs.observer);
      */
    },
    computed: {
      sortedPosts(){
        return [...this.posts].sort((post1, post2) => {
          return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
        })
      },
      sortedAndSearchedPosts(){
        return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
      }
    },
    watch: {
      //  paginations
      // page(){
      //   this.fetchPosts();
      // }
      // end  paginations
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