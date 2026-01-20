<script setup lang="ts">
import { store } from "@/store";
import { HugeiconsIcon } from "@hugeicons/vue";
import { ViewOffIcon } from "@hugeicons/core-free-icons";

const imposterName = store.players[store.imposterIndex ?? 0];
</script>

<template>
  <div class="flex h-full w-full flex-col items-center justify-center p-6 text-center">
    <div class="mx-auto flex w-full max-w-xl flex-col items-center gap-8">
      <div class="flex h-20 w-20 items-center justify-center rounded-full bg-red-500/20 pt-4 text-red-500">
        <HugeiconsIcon :icon="ViewOffIcon" size="40" />
      </div>

      <div class="flex flex-col gap-2">
        <h1 class="text-3xl font-black uppercase text-red-500">The Imposter was</h1>
      </div>

      <div
        class="flex w-full max-w-sm flex-col items-center gap-2 rounded-3xl border-2 border-red-500/30 bg-red-500/10 p-8 text-center">
        <h2 class="text-4xl font-black text-white">{{ imposterName }}</h2>
        <p class="text-lg font-bold uppercase text-red-400">The word was: {{ store.gameWord }}</p>
      </div>

      <button class="btn mt-8 px-12 py-4" @click="store.resetGame()">End Game</button>
    </div>
  </div>
</template>
