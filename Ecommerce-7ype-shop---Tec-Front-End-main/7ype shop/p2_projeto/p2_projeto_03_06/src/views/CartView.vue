<template>
  <div class="container mx-auto p-4 bg-white shadow-lg rounded-lg my-8">
    <h1 class="text-4xl font-bold text-center mb-8">Seu Carrinho de Compras</h1>

    <div v-if="cartItems.length === 0" class="text-center text-xl text-gray-600 p-8">
      Seu carrinho está vazio.
      <router-link to="/products" class="text-blue-600 hover:underline block mt-4">
        Comece a comprar agora!
      </router-link>
    </div>

    <div v-else>
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white border border-gray-200">
          <thead>
            <tr class="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th class="py-3 px-6 text-left">Produto</th>
              <th class="py-3 px-6 text-left">Preço</th>
              <th class="py-3 px-6 text-center">Quantidade</th>
              <th class="py-3 px-6 text-right">Subtotal</th>
              <th class="py-3 px-6 text-center">Ações</th>
            </tr>
          </thead>
          <tbody class="text-gray-700 text-sm font-light">
            <tr v-for="item in cartItems" :key="item.id" class="border-b border-gray-200 hover:bg-gray-50">
              <td class="py-3 px-6 text-left whitespace-nowrap">
                <div class="flex items-center">
                  <img :src="item.thumbnail" :alt="item.title" class="w-16 h-16 object-contain mr-4 rounded">
                  <span>{{ item.title }}</span>
                </div>
              </td>
              <td class="py-3 px-6 text-left">${{ item.price.toFixed(2) }}</td>
              <td class="py-3 px-6 text-center">
                <div class="flex items-center justify-center space-x-2">
                  <button @click="updateQuantity(item.id, item.quantity - 1)"
                          class="bg-gray-200 text-gray-700 px-2 py-1 rounded-full hover:bg-gray-300">
                    -
                  </button>
                  <span>{{ item.quantity }}</span>
                  <button @click="updateQuantity(item.id, item.quantity + 1)"
                          class="bg-gray-200 text-gray-700 px-2 py-1 rounded-full hover:bg-gray-300">
                    +
                  </button>
                </div>
              </td>
              <td class="py-3 px-6 text-right font-semibold">${{ (item.price * item.quantity).toFixed(2) }}</td>
              <td class="py-3 px-6 text-center">
                <button @click="removeFromCart(item.id)"
                        class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-xs">
                  Remover
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="mt-8 text-right text-2xl font-bold text-gray-800 border-t pt-4">
        Total do Carrinho: ${{ cartTotal }}
      </div>

      <div class="mt-6 flex justify-end space-x-4">
        <button @click="clearCart" class="bg-gray-300 text-gray-800 px-6 py-3 rounded hover:bg-gray-400">
          Limpar Carrinho
        </button>
        <button class="bg-purple-600 text-white px-8 py-3 rounded hover:bg-purple-700">
          Finalizar Compra
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '../stores/cartStore';

const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal } = useCartStore();
</script>

<style scoped>
</style>