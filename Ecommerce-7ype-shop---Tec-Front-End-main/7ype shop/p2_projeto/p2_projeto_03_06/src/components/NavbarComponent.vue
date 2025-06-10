<template>
  <nav class="bg-[#7734eb] text-white p-4 shadow-md fixed top-0 left-0 right-0 z-50">
    <div class="container mx-auto flex justify-between items-center">
      <router-link to="/" class="font-bold text-x2">7ype shop</router-link>
      <div class="flex items-center space-x-4 text-sm">
        <router-link to="/products" class="hover:underline">Produtos</router-link>
        <router-link to="/categories" class="hover:underline">Categorias</router-link>

        <div class="relative">
          <input
            type="text"
            v-model="searchQuery"
            @keyup.enter="performSearch"
            placeholder="Buscar produtos..."
            class="p-2 rounded-md text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button @click="performSearch" class="absolute right-0 top-0 h-full px-3 text-gray-600 hover:text-gray-900">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </button>
        </div>

        <router-link to="/cart" class="hover:underline relative p-1 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors duration-200">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
          <span v-if="cartItemCount > 0" class="absolute -top-2 -right-3 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
            {{ cartItemCount }}
          </span>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '../stores/cartStore';

const searchQuery = ref('');
const router = useRouter();

const { cartItemCount } = useCartStore();

const performSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ path: '/products', query: { q: searchQuery.value.trim() } });
  } else {
    router.push({ path: '/products' });
  }
};
</script>