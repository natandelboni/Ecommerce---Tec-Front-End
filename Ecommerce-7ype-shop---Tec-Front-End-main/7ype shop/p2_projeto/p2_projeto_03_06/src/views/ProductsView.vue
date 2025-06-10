<template>
  <div class="bg-[#f5f5f5] p-4 min-h-screen pt-20">
    <h1 class="text-2xl font-bold mb-4">
      <span v-if="route.query.q">Resultados para "{{ route.query.q }}"</span>
      <span v-else-if="route.params.categoryName">Categoria: {{ route.params.categoryName.replace(/-/g, ' ') }}</span>
      <span v-else>Todos os Produtos</span>
    </h1>

    <div v-if="loading" class="text-center text-lg text-gray-600">
      Carregando produtos...
    </div>

    <div v-else-if="error" class="text-center text-lg text-red-600">
      {{ error }}
    </div>

    <div v-else-if="products.length === 0" class="text-center text-lg text-gray-600">
      Nenhum produto encontrado.
      <router-link v-if="route.query.q || route.params.categoryName" to="/products" class="text-blue-600 hover:underline block mt-4">
        Limpar filtro/busca e ver todos os produtos
      </router-link>
    </div>

    <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      <ProductCardComponent
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>

    <div class="flex justify-center gap-4 mt-6" v-if="!route.query.q">
      <button @click="prevPage" :disabled="skip === 0"
        class="bg-[#7734eb] text-white px-4 py-2 rounded hover:bg-[#e33625] disabled:bg-gray-400">Anterior</button>
      <button @click="nextPage"
        class="bg-[#7734eb] text-white px-4 py-2 rounded hover:bg-[#ebde34]">Próximo</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { getProducts, searchProducts, getProductsByCategory } from '../services/api';
import ProductCardComponent from '../components/ProductCardComponent.vue';

const products = ref([]);
const loading = ref(true);
const error = ref(null);
const route = useRoute();

const skip = ref(0);
const limit = 12;

const fetchProducts = async () => {
  loading.value = true;
  error.value = null;
  const searchQuery = route.query.q;
  const categoryName = route.params.categoryName;

  try {
    let data;
    if (searchQuery) {
      data = await searchProducts(searchQuery);
    } else if (categoryName) {
      data = await getProductsByCategory(categoryName, limit, skip.value);
    } else {
      data = await getProducts(limit, skip.value);
    }
    products.value = data.products;
  } catch (err) {
    error.value = 'Erro ao carregar produtos. Tente novamente mais tarde.';
    console.error("Erro no fetchProducts de ProductsView:", err);
  } finally {
    loading.value = false;
  }
};

const nextPage = () => {
  skip.value += limit;
  fetchProducts();
};

const prevPage = () => {
  if (skip.value >= limit) {
    skip.value -= limit;
    fetchProducts();
  }
};

onMounted(() => {
  fetchProducts();
});

watch(() => route.fullPath, (newPath, oldPath) => {
    if (newPath !== oldPath) {
        skip.value = 0; 
        fetchProducts();
    }
});
</script>