import {ref, computed} from 'vue';

export function useSortedandSearchedPosts(sortedPosts){
  const searchQuery = ref('');
  const sortedAndSearchedPosts = computed(() => {
    return sortedPosts.value.filter(post => post.title.toLowerCase().includes(searchQuery.value.toLowerCase()))
  });

  return{
    searchQuery, sortedAndSearchedPosts
  }
}