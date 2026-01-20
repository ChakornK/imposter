<script setup lang="ts">
import { store } from '@/store';
import { HugeiconsIcon } from '@hugeicons/vue';
import { UserIcon } from '@hugeicons/core-free-icons';
import { motion } from 'motion-v';
import { ref } from 'vue';
import PlayerExpandedCard from '@/components/PlayerExpandedCard.vue';

const selectedPlayerIndex = ref<number | null>(null);
const selectPlayer = (index: number) => {
  selectedPlayerIndex.value = index;
};
const closeCard = () => {
  selectedPlayerIndex.value = null;
};
</script>

<template>
  <div class="flex h-full w-full flex-col items-stretch">
    <div class="*:max-w-xl *:mx-auto *:w-full flex grow flex-col gap-4 overflow-auto p-4">
      <div class="flex flex-col items-stretch gap-2">
        <h1 class="text-3xl font-bold">View your word</h1>
        <p>Tap on the card with your name.</p>
      </div>

      <div class="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <motion.div v-for="(player, index) in store.players" :key="index" :layoutId="`card-${index}`"
          @click="selectPlayer(index)"
          class="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-gray-700 bg-gray-800 p-4 transition-colors hover:border-blue-500/50"
          :style="{ opacity: selectedPlayerIndex === index ? 0 : 1 }" :transition="{ duration: 0.1, ease: 'easeOut' }">
          <div class="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-gray-700">
            <HugeiconsIcon :icon="UserIcon" size="24" class="text-gray-300" />
          </div>
          <span class="text-center text-lg font-bold">{{ player }}</span>
        </motion.div>
      </div>

      <div v-if="store.players.length === 0" class="flex flex-col items-center justify-center py-20 text-gray-500">
        <p>No players added.</p>
      </div>
    </div>

    <div class="h-20 shrink-0 border-t border-gray-700">
      <div class="mx-auto flex h-full max-w-xl items-center p-4">
        <button class="btn h-full w-full" @click="store.startDiscussion()">Continue</button>
      </div>
    </div>

    <PlayerExpandedCard v-for="(player, index) in store.players" :key="index" :player="player || ''"
      :isOpen="selectedPlayerIndex === index" :layoutId="`card-${index}`" :isImposter="index === store.imposterIndex"
      :word="store.gameWord" :hint="store.gameHint" @close="closeCard" />
  </div>
</template>
