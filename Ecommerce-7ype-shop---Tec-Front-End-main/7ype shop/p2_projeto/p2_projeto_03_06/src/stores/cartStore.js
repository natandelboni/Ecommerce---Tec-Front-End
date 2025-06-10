import { ref, computed, watch } from 'vue';

const loadCartFromLocalStorage = () => {
  try {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  } catch (e) {
    console.error("Erro ao carregar carrinho do localStorage:", e);
    return [];
  }
};

const cartItems = ref(loadCartFromLocalStorage());

watch(cartItems, (newCart) => {
  localStorage.setItem('cart', JSON.stringify(newCart));
}, { deep: true });

const addToCart = (product) => {
  const existingItem = cartItems.value.find(item => item.id === product.id);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cartItems.value.push({ ...product, quantity: 1 });
  }
};

const removeFromCart = (productId) => {
  cartItems.value = cartItems.value.filter(item => item.id !== productId);
};

const updateQuantity = (productId, newQuantity) => {
  const item = cartItems.value.find(item => item.id === productId);
  if (item) {
    if (newQuantity > 0) {
      item.quantity = newQuantity;
    } else {
      removeFromCart(productId);
    }
  }
};

const clearCart = () => {
  cartItems.value = [];
};

const cartTotal = computed(() => {
  return cartItems.value.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
});

const cartItemCount = computed(() => {
  return cartItems.value.reduce((count, item) => count + item.quantity, 0);
});

export function useCartStore() {
  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartItemCount
  };
}