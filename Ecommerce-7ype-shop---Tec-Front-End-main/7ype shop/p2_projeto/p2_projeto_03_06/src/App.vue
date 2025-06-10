<template>
  <div id="app" class="flex flex-col min-h-screen">
    <NavbarComponent />
    <main class="flex-1 pt-16"> <router-view />
    </main>
  </div>
</template>

<script setup>
import NavbarComponent from './components/NavbarComponent.vue';
</script>