<script setup>
const props = defineProps(["movie"]);
</script>

<template>
  <h2>{{ movie.Title }}</h2>
  <p>{{ movie.Director }}</p>
  <p>{{ movie.Plot }}</p>
</template>
