<script setup>
import MovieService from "@/services/MovieService.js";
import { computed, onMounted, ref } from "vue";
import router from "../../router";

const props = defineProps(["id"]);

const movie = ref("");
const id = computed(() => props.id);
onMounted(() => {
  MovieService.getMovie(id.value)
    .then((response) => {
      movie.value = response.data;
    })
    .catch((error) => {
        if (error.response && error.response.status == 404) {
        router.push({
          name: '404Resource',
          params: { resource: 'movie' }
        })
      } else {
        router.push({ name: 'NetworkError' })
      }
    });
});
</script>

<template>
  <div v-if="movie">
    <h1>{{ movie.title }}</h1>
    <div id="nav">
      <router-link :to="{ name: 'MovieDetails' }"
        >Details</router-link
      >
      |
      <router-link :to="{ name: 'MovieRegister' }"
        >Register</router-link
      >
      |
      <router-link :to="{ name: 'MovieEdit' }"
        >Edit</router-link
      >
    </div>
    <router-view :movie="movie" />
  </div>
</template>
