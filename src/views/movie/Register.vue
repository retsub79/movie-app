<script setup>
import { useRouter } from 'vue-router';
import { inject } from "vue"

const props = defineProps(["movie"]);
const router = useRouter()
const GStore = inject('GStore');

const register = () => {
    GStore.flashMessage = 'You are successfully registered for ' + movie.title
    setTimeout(() => {
        GStore.flashMessage = ''
    }, 3000)
    router.push({
        name: 'MovieDetails',
        id: props.movie.id
    })
}
</script>

<template>
  <p>Register for the movie here</p>
  <button @click="register">Register Me!</button>
</template>
