<script setup>
defineProps({
  movie: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <router-link
    class="movie-link"
    :to="{ name: 'MovieDetails', params: { id: movie.id } }"
  >
    <div class="movie-card">
      <h2>{{ movie.Title }}</h2>
      <span>{{ movie.Director }}</span>
      <img v-bind:src="movie.Poster" alt="">
    </div>
  </router-link>
</template>

<style scoped>
.movie-card {
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 18px;
}

.movie-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}

.movie-link {
  color: #2c3e50;
  text-decoration: none;
}
</style>
