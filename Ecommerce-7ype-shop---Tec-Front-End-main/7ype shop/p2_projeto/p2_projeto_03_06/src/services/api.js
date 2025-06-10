import axios from 'axios';

const API_BASE_URL = 'https://dummyjson.com';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getProducts = async (limit = 12, skip = 0) => {
  try {
    const response = await api.get(`/products?limit=${limit}&skip=${skip}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar produto ${id}:`, error);
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const response = await api.get('/products/categories');
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    throw error;
  }
};

export const getProductsByCategory = async (category, limit = 12, skip = 0) => {
  try {
    const response = await api.get(`/products/category/${category}?limit=${limit}&skip=${skip}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar produtos da categoria ${category}:`, error);
    throw error;
  }
};

export const searchProducts = async (query) => {
    try {
        const response = await api.get(`/products/search?q=${query}`);
        return response.data;
    } catch (error) {
        console.error(`Erro ao buscar produtos com a query "${query}":`, error);
        throw error;
    }
};