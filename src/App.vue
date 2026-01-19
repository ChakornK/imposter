<script setup lang="ts">
import GameView from "./views/GameView.vue"
import SetupView from "./views/SetupView.vue"
import { store } from "./store"
import { onMounted, onUnmounted } from "vue"

const handlePopState = () => {
  if (store.view === 'game') {
    store.view = 'setup';
  }
};

onMounted(() => {
  window.addEventListener('popstate', handlePopState);
});

onUnmounted(() => {
  window.removeEventListener('popstate', handlePopState);
});
</script>

<template>
  <SetupView v-if="store.view === 'setup'" />
  <GameView v-else />
</template>
