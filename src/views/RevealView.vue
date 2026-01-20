<script setup lang="ts">
import { store } from "@/store";
import { HugeiconsIcon } from "@hugeicons/vue";
import { ViewOffIcon, ViewIcon } from "@hugeicons/core-free-icons";
import { motion } from "motion-v";
import { ref } from "vue";

const imposterName = store.players[store.imposterIndex ?? 0];
const isWordRevealed = ref(false);
</script>

<template>
  <div class="flex h-full w-full flex-col items-center justify-center p-6 text-center">
    <div class="mx-auto flex w-full max-w-xl flex-col items-center gap-8">
      <div class="flex h-20 w-20 items-center justify-center rounded-full bg-red-500/20 pt-4 text-red-500">
        <HugeiconsIcon :icon="ViewOffIcon" size="40" />
      </div>

      <div class="flex flex-col gap-2">
        <h1 class="text-3xl font-black uppercase text-red-500">The Imposter was</h1>
        <h2 class="text-5xl font-black text-white">{{ imposterName }}</h2>
      </div>

      <div class="perspective-distant aspect-2/1 w-full max-w-sm cursor-pointer"
        @click="isWordRevealed = !isWordRevealed">
        <motion.div class="transform-3d relative h-full w-full" :animate="{ rotateX: isWordRevealed ? 180 : 0 }"
          :transition="{ duration: 0.3, ease: 'circOut' }">
          <div
            class="backface-hidden absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-3xl border-2 border-blue-500/30 bg-blue-500/10 p-8 text-center"
            style="backface-visibility: hidden;">
            <HugeiconsIcon :icon="ViewIcon" size="32" class="text-blue-400 opacity-50" />
            <p class="font-bold uppercase text-blue-400">Reveal word</p>
          </div>

          <div
            class="backface-hidden absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-3xl border-2 border-gray-600 bg-gray-800 p-8 text-center"
            style="backface-visibility: hidden; transform: rotateX(180deg);">
            <p class="text-sm font-bold uppercase text-gray-400">The word was</p>
            <h3 class="text-4xl font-black text-blue-500">{{ store.gameWord }}</h3>
          </div>
        </motion.div>
      </div>

      <button class="btn mt-8 px-12 py-4" @click="store.resetGame()">End Game</button>
    </div>
  </div>
</template>
