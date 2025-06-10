<template>
  <div class="container mx-auto p-4 my-8">
    <div v-if="loading" class="text-center text-lg text-gray-600">
      Carregando detalhes do produto...
    </div>
    <div v-else-if="error" class="text-center text-lg text-red-600">
      {{ error }}
    </div>

    <div v-else-if="product" class="bg-white shadow-lg rounded-lg p-6">
      <h1 class="text-3xl font-bold mb-3 text-gray-900">{{ product.title }}</h1>
      <img :src="product.thumbnail" :alt="product.title" class="w-full max-w-md mx-auto mb-4 rounded shadow object-contain h-64" />
      <p class="text-lg text-gray-700 mb-4">{{ product.description }}</p>

      <div class="mb-4 text-gray-600 text-sm">
        <p><strong>Marca:</strong> {{ product.brand }}</p>
        <p><strong>Categoria:</strong> {{ product.category.replace(/-/g, ' ') }}</p>
        <p><strong>Estoque:</strong> {{ product.stock }} unidades</p>
      </div>

      <p class="text-4xl font-extrabold text-red-600 mb-6">${{ product.price.toFixed(2) }}</p>
      <button @click="handleAddToCart" class="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 text-xl font-semibold transition-colors duration-200">
        Adicionar ao Carrinho
      </button>
    </div>

    <div v-else class="text-center text-lg text-gray-600 p-8">
      Produto não encontrado.
      <router-link to="/products" class="text-blue-600 hover:underline block mt-4">
        Voltar para a lista de produtos
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { getProductById } from '../services/api';
import { useCartStore } from '../stores/cartStore';

const props = defineProps({
  id: String
});

const product = ref(null);
const loading = ref(true);
const error = ref(null);

const { addToCart } = useCartStore();

const fetchProduct = async (id) => {
  loading.value = true;
  error.value = null;
  try {
    const data = await getProductById(id);
    product.value = data;
  } catch (err) {
    console.error("Erro ao buscar detalhes do produto:", err);
    error.value = 'Erro ao carregar os detalhes do produto.';
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchProduct(props.id);
});

watch(() => props.id, (newId) => {
  if (newId) {
    fetchProduct(newId);
  }
});

const handleAddToCart = () => {
  if (product.value) {
    addToCart(product.value);
    alert(`${product.value.title} adicionado ao carrinho!`);
  }
};
</script>

<style scoped>
</style>
