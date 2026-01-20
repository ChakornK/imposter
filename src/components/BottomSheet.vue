<script setup lang="ts">
import { AnimatePresence, motion, type VariantType } from 'motion-v';
import { Teleport } from 'vue';

const { open, onClose } = defineProps<{
  open: boolean;
  onClose: () => void;
}>();

const overlayVariants: Record<string, VariantType> = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 }
}
const sheetVariants: Record<string, VariantType> = {
  visible: {
    y: 0,
    transition: { ease: "easeInOut", duration: 0.15 }
  },
  hidden: {
    y: '100%',
    transition: { ease: "anticipate" }
  }
}
</script>

<template>
  <Teleport to="body">
    <AnimatePresence>
      <motion.div v-if="open" class="fixed inset-0 bg-black/50" @click="onClose" :variants="overlayVariants"
        initial="hidden" animate="visible" exit="hidden"></motion.div>
      <motion.div v-if="open"
        class="border-b-128 fixed bottom-0 left-1/2 top-8 -mb-32 w-full max-w-xl -translate-x-1/2 rounded-t-xl border-gray-800 bg-gray-800 text-white shadow-lg"
        :variants="sheetVariants" initial="hidden" animate="visible" exit="hidden">
        <slot></slot>
      </motion.div>
    </AnimatePresence>
  </Teleport>
</template>