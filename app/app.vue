<script setup lang="ts">
import AppHeader from '~/components/movies/AppHeader.vue'
import Footer from "~/components/movies/Footer.vue";
</script>

<template>
  <div class="min-h-screen">
    <AppHeader />

    <main class="mx-auto">
      <NuxtPage/>
    </main>

    <Footer />
  </div>
</template>