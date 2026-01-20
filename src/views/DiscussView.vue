<script setup lang="ts">
import { store } from "@/store";
import { HugeiconsIcon } from "@hugeicons/vue";
import { BubbleChatIcon } from "@hugeicons/core-free-icons";

const startingPlayer = store.players[store.startingPlayerIndex ?? 0];
</script>

<template>
  <div class="flex h-full w-full flex-col items-center justify-center p-6 text-center">
    <div class="mx-auto flex w-full max-w-xl flex-col items-center gap-8">
      <div class="flex h-20 w-20 items-center justify-center rounded-full bg-blue-500/20 text-blue-500">
        <HugeiconsIcon :icon="BubbleChatIcon" size="40" />
      </div>

      <div class="flex flex-col gap-2">
        <h1 class="text-3xl font-black uppercase">Discussion</h1>
        <p class="text-lg">Time to find the imposter!</p>
      </div>

      <div
        class="flex w-full max-w-sm flex-col items-center gap-2 rounded-3xl border-2 border-blue-500/30 bg-blue-500/10 p-8 text-center">
        <p class="font-bold uppercase text-blue-400">The first person to speak is</p>
        <h2 class="text-3xl font-black text-white">{{ startingPlayer }}</h2>
      </div>

      <button class="btn mt-8 px-12 py-4" @click="store.resetGame()">Reveal imposter</button>
    </div>
  </div>
</template>
