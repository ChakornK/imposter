<script setup lang="ts">
import { store } from '@/store';
import { HugeiconsIcon } from '@hugeicons/vue';
import { UserIcon } from '@hugeicons/core-free-icons';
</script>

<template>
  <div class="flex h-full w-full flex-col p-4">
    <div class="mx-auto flex w-full max-w-xl flex-col gap-6">
      <div class="flex items-center justify-between">
        <h1 class="text-3xl font-bold">Game Started</h1>
      </div>

      <div class="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <div v-for="(player, index) in store.players" :key="index"
          class="flex aspect-square flex-col items-center justify-center rounded-2xl border-2 border-gray-700 bg-gray-800 p-4">
          <div class="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-gray-700">
            <HugeiconsIcon :icon="UserIcon" size="24" class="text-gray-300" />
          </div>
          <span class="text-center text-lg font-bold">{{ player }}</span>
        </div>
      </div>

      <div v-if="store.players.length === 0" class="flex flex-col items-center justify-center py-20 text-gray-500">
        <p>No players added.</p>
      </div>
    </div>
  </div>
</template>
