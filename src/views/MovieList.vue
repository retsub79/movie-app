<script setup>
import MovieCard from "@/components/MovieCard.vue";
import MovieService from "@/services/MovieService.js";
import { onMounted, ref, computed, watchEffect } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const props = defineProps(['page'])

const movies = ref("");
const totalMoviess = ref(0)
const page = computed(() => props.page)

const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalMoviess.value / 2)
  return page.value < totalPages
})

onMounted(() => {
    watchEffect(() => {
      movies.value = null
      MovieService.getMoviess(2, page.value)
        .then(response => {
          movies.value = response.data
          // our response has total stored in the header.
          totalMoviess.value = response.headers['x-total-count']
        })
        .catch(error => {
          router.push({ name: 'NetworkError' })
        })
    })
  })
</script>

<template>
  <h1>Movies</h1>
  <div class="movies">
    <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />

    <div class="pagination">
      <router-link
      id="page-prev"
      :to="{ name: 'MoviesList', query: { page: page - 1 } }"
      rel="prev"
      v-if="page != 1"
      >&#60; Previous</router-link
    >

    <router-link
      id="page-next"
      :to="{ name: 'MovieList', query: { page: page + 1 } }"
      rel="next"
      v-if="hasNextPage"
      >Next &#62;</router-link
    >
    </div>
  </div>
</template>

<style scoped>
.movies {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pagination {
  display: flex;
  width: 290px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>
