<template>
  <div class="container mx-auto p-4">
    <h1 class="text-4xl font-bold text-center mb-8">Categorias</h1>

    <div v-if="loading" class="text-center text-lg text-gray-600">
      Carregando categorias...
    </div>

    <div v-else-if="error" class="text-center text-lg text-purple-600">
      {{ error }}
    </div>

    <div v-else-if="categories.length > 0" class="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6"
>
      <div v-for="category in categories" :key="category.slug"
           @click="navigateToCategory(category.slug)"
           class="bg-purple-100 text-black-800 p-20 rounded-lg shadow-md cursor-pointer
                  hover:bg-purple-200 hover:text-black-900 transition-colors duration-200
                  flex items-center justify-center text-xl font-semibold capitalize"
      >
        {{ category.name }}
      </div>
    </div>
    <div v-else class="text-center text-lg text-gray-600">
      Nenhuma categoria encontrada.
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getCategories } from '../services/api';
import { useRouter } from 'vue-router';

const categories = ref([]);
const loading = ref(true);
const error = ref(null);
const router = useRouter();

onMounted(async () => {
  try {
    const data = await getCategories();
    console.log("Dados da API de categorias (após correção):", data);
    if (Array.isArray(data)) {
      categories.value = data;
    } else {
      error.value = 'Formato de dados de categoria inesperado da API.';
      console.error("API de categorias retornou formato inesperado (CategoryView):", data);
    }
  } catch (err) {
    error.value = 'Erro ao carregar categorias. Tente novamente mais tarde.';
    console.error("Erro ao buscar categorias em CategoryView:", err);
  } finally {
    loading.value = false;
  }
});

const navigateToCategory = (categorySlug) => {
  router.push({ name: 'products-by-category', params: { categoryName: categorySlug } });
};
</script>

<style scoped>
</style>
