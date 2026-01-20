<script setup lang="ts">
import GameView from "./views/GameView.vue"
import SetupView from "./views/SetupView.vue"
import { store } from "./store"
import { onMounted, onUnmounted, watch } from "vue"

watch(() => store.view, (newView) => {
  if (newView === 'game') {
    history.pushState({ view: 'game' }, '');
  }
});

const handlePopState = () => {
  if (store.view === 'game') {
    store.resetGame();
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
