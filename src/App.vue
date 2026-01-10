<script setup lang="ts">
import { ref } from "vue"
import GameView from "./views/GameView.vue"
import SetupView from "./views/SetupView.vue"

const pageIndex = ref(0)
</script>

<template>
  <SetupView v-if="pageIndex === 0" />
  <GameView v-else />
</template>
