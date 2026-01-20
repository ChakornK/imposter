<script setup lang="ts">
import GameView from "./views/GameView.vue"
import SetupView from "./views/SetupView.vue"
import DiscussView from "./views/DiscussView.vue"
import RevealView from "./views/RevealView.vue"
import { store } from "./store"
import { onMounted, onUnmounted, watch } from "vue"

watch(() => store.view, (newView) => {
  if (newView === 'game' || newView === 'discuss' || newView === 'reveal') {
    history.pushState({ view: newView }, '');
  }
});

const handlePopState = (event: PopStateEvent) => {
  if (event.state?.view) {
    store.view = event.state.view;
  } else {
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
  <GameView v-else-if="store.view === 'game'" />
  <DiscussView v-else-if="store.view === 'discuss'" />
  <RevealView v-else-if="store.view === 'reveal'" />
</template>
