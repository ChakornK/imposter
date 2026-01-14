<script setup lang="ts">
import { Teleport } from 'vue';

const { open, onClose } = defineProps<{
  open: boolean;
  onClose: () => void;
}>();

</script>

<template>
  <Teleport to="body">
    <div class="fixed inset-0 z-50 flex items-end justify-center" v-if="open">
      <div class="absolute inset-0 bg-black/50" @click="onClose"></div>
      <div class="absolute bottom-0 top-8 w-full max-w-xl rounded-t-xl bg-gray-800 text-white shadow-lg">
        <slot></slot>
      </div>
    </div>
  </Teleport>
</template>