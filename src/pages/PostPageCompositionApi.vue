<template lang="">
  <div >
   <h1>Posts page: {{likes}}</h1>
   <my-button @click="addLikes">addLikes</my-button>
   <my-input 
    v-focus
    v-model="searchQuery"
    placeholder="Search for..."
   />
   <div class="app__btns">
      <my-button 
    >
      Create post
    </my-button>
  
    <my-select 
      v-model="selectedSort"
      :options="sortOptions"
    />
   </div>
  
    <my-dialog v-model:show="dialogVisible" >
      <PostForm  />
    </my-dialog>
    
   <PostList
      :posts="sortedAndSearchedPosts"
      v-if="!isPostsLoading"
    />
    <div v-else>Posts downloading....</div>
  </div>
  
  </template>
  
  <script>
  import PostForm from '@/components/PostForm';
  import PostList from '@/components/PostList.vue';
  import {usePosts} from "@/hooks/usePosts";
  import {useSortedPosts} from "@/hooks/useSortedPosts";
  import {useSortedandSearchedPosts} from "@/hooks/useSortedandSearchedPosts";
  
  export default {
    components: {
      PostForm,
      PostList
    },
    data(){
      return{
        dialogVisible: false,
        sortOptions: [
          {value: 'title', name: 'by Name'},
          {value: 'body', name: 'by Desctiption'},
        ]
      }
    },
    setup(props){
      const {posts, totalPages, isPostsLoading} = usePosts(10);
      console.log('posts: ', posts);
      const {selectedSort, sortedPosts} = useSortedPosts(posts);
      const {searchQuery, sortedAndSearchedPosts} = useSortedandSearchedPosts(sortedPosts);

      return{
        posts,
        totalPages,
        isPostsLoading,
        selectedSort, 
        sortedPosts,
        searchQuery, 
        sortedAndSearchedPosts
      }
    }
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