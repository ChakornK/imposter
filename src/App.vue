<script setup lang="ts">
import GameView from "./views/GameView.vue"
import SetupView from "./views/SetupView.vue"
import { store } from "./store"
</script>

<template>
  <SetupView v-if="store.view === 'setup'" />
  <GameView v-else />
</template>
