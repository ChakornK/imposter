<script setup lang="ts">
import { HugeiconsIcon } from '@hugeicons/vue';
import { ViewIcon, ViewOffIcon } from '@hugeicons/core-free-icons';
import { AnimatePresence, motion } from 'motion-v';
import { ref, watch } from 'vue';

const props = defineProps<{
  isOpen: boolean;
  player: string;
  layoutId: string;
  isImposter: boolean;
  word: string | null;
  hint: string | null;
  category: string | null;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const isFlipped = ref(false);
watch(() => props.isOpen, (newVal) => {
  if (!newVal) {
    isFlipped.value = false;
  }
});
const flipCard = () => {
  isFlipped.value = !isFlipped.value;
};
</script>

<template>
  <Teleport to="body">
    <AnimatePresence>
      <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-6">
        <motion.div :initial="{ opacity: 0 }" :animate="{ opacity: 1 }" :exit="{ opacity: 0 }"
          :transition="{ duration: 0.2 }" class="absolute inset-0 bg-black/50" @click="emit('close')" />

        <div class="aspect-3/4 perspective-distant transform-3d relative w-full max-w-sm" @click="flipCard">

          <motion.div :layoutId="layoutId"
            class="*:absolute *:backface-hidden *:inset-0 *:flex *:flex-col *:items-center *:justify-center *:p-8 transform-3d relative h-full w-full rounded-2xl border-2 border-gray-700 bg-gray-800"
            :animate="{ rotateY: isFlipped ? 180 : 0 }" :transition="{ duration: 0.3, ease: 'circOut' }">

            <div class="rotate-y-0">
              <div class="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-700">
                <HugeiconsIcon :icon="ViewIcon" size="40" class="text-gray-400" />
              </div>
              <h2 class="mb-2 text-center text-2xl font-bold">{{ player }}</h2>
              <p class="text-lg font-medium text-gray-400">Tap to reveal</p>
            </div>

            <div class="rotate-y-180">
              <div v-if="isImposter" class="flex flex-col items-center gap-4 text-center">
                <div class="flex h-20 w-20 items-center justify-center rounded-full bg-red-500/20 pt-4 text-red-500">
                  <HugeiconsIcon :icon="ViewOffIcon" size="40" />
                </div>
                <div class="uppercase">
                  <h3 class="text-2xl font-black text-red-500">You are the</h3>
                  <h3 class="text-4xl font-black text-red-600">imposter</h3>
                </div>
                <div class="mt-4 flex w-full flex-col gap-2 rounded-xl border border-gray-600 bg-gray-700/50 p-4">
                  <div>
                    <p class="mb-1 text-sm font-bold uppercase text-gray-400">Category</p>
                    <p class="text-lg font-bold">{{ category }}</p>
                  </div>
                  <div v-if="hint" class="border-t border-gray-600 pt-2">
                    <p class="mb-1 text-sm font-bold uppercase text-gray-400">Hint</p>
                    <p class="text-xl font-bold italic">"{{ hint }}"</p>
                  </div>
                </div>
              </div>
              <div v-else class="flex flex-col items-center gap-4 text-center">
                <div class="flex h-20 w-20 items-center justify-center rounded-full bg-blue-500/20 text-blue-500">
                  <HugeiconsIcon :icon="ViewIcon" size="40" />
                </div>
                <div>
                  <h3 class="text-xl font-black uppercase text-gray-400">The word is</h3>
                  <h3 class="text-4xl font-black text-blue-500">{{ word }}</h3>
                </div>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </AnimatePresence>
  </Teleport>
</template>
