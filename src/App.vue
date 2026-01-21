<script setup lang="ts">
import GameView from "./views/GameView.vue"
import SetupView from "./views/SetupView.vue"
import DiscussView from "./views/DiscussView.vue"
import RevealView from "./views/RevealView.vue"
import { store } from "./store"
import { onMounted, onUnmounted, watch, ref } from "vue"
import { HugeiconsIcon } from '@hugeicons/vue'
import { ArrowExpandIcon } from '@hugeicons/core-free-icons'

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

const isFullscreen = ref(false);

const updateFullscreenState = () => {
  isFullscreen.value = !!document.fullscreenElement;
};

const toggleFullscreen = async () => {
  try {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  } catch (err) {
    console.error('Error toggling fullscreen:', err);
  }
};

onMounted(() => {
  window.addEventListener('popstate', handlePopState);
  document.addEventListener('fullscreenchange', updateFullscreenState);
  updateFullscreenState();
});

onUnmounted(() => {
  window.removeEventListener('popstate', handlePopState);
  document.removeEventListener('fullscreenchange', updateFullscreenState);
});
</script>

<template>
  <button v-if="!isFullscreen" @click="toggleFullscreen"
    class="fixed right-4 top-4 z-50 flex h-8 w-8 cursor-pointer items-center justify-center rounded border border-gray-700 bg-gray-800 text-white backdrop-blur-sm transition-colors hover:border-gray-600 hover:bg-gray-700 active:scale-95 md:hidden"
    aria-label="Toggle Fullscreen">
    <HugeiconsIcon :icon="ArrowExpandIcon" size="20" />
  </button>

  <SetupView v-if="store.view === 'setup'" />
  <GameView v-else-if="store.view === 'game'" />
  <DiscussView v-else-if="store.view === 'discuss'" />
  <RevealView v-else-if="store.view === 'reveal'" />
</template>
