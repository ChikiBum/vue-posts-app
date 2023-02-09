import axios from "axios";

export const postModule = {
  state: () => ({
    posts: [],
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
  }),
  getters: {
    sortedPosts(state){
      return [...state.posts].sort((post1, post2) => {
        return post1[state.selectedSort]?.localeCompare(post2[state.selectedSort])
      })
    },
    sortedAndSearchedPosts(state, getters){
      return getters.sortedPosts.filter(post => post.title.toLowerCase().includes(state.searchQuery.toLowerCase()))
    }
  },
  mutations: {
    setPosts(state, posts){
      state.posts = posts;
    },
    setLoading(state, bool){
      state.isPostsLoading = bool;
    },
    setSelectedSort(state, selectedSort){
      state.selectedSort = selectedSort;
    },
    setSearchQuery(state, searchQuery){
      state.searchQuery = searchQuery;
    },
    setPage(state, page){
      state.page = page;
    },
    setTotalPages(state, totalPages){
      state.totalPages = totalPages;
    },
  },
  actions: {
    async fetchPosts({state, commit}){
      try {
        console.log('commit: ', commit);
        commit('setLoading', true);

          const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
            params: {
              _page: state.page,
              _limit: state.limit
            }
          });
         
          commit('setPosts', response.data);
          commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit));
         
      } catch (error) {
        console.log('error1: ', error);
        // alert(error)
      } finally {
        commit('setLoading', false);
      }
    },
    async loadMorePosts( {state, commit} ){

      try {
        commit('setPage', state.page += 1);
          const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
            params: {
              _page: state.page,
              _limit: state.limit
            }
          });
         
          commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit));
          commit('setPosts', [...state.posts, ...response.data])
      } catch (error) {
        console.log('error2: ', error);
        // alert(error)
      } finally {
        }
    }
  },
  namespaced: true
}