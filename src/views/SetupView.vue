<script setup lang="ts">
import { HugeiconsIcon } from '@hugeicons/vue';
import { ArrowRight01Icon, Book02Icon, Cancel01Icon, Tick02Icon, UserMultipleIcon } from '@hugeicons/core-free-icons';
import { ref, useTemplateRef } from 'vue';
import BottomSheet from '@/components/BottomSheet.vue';

import { store } from '@/store';

const newPlayerName = ref<string>('');

const nameInputRef = useTemplateRef('name-input');
const addPlayerRef = useTemplateRef('add-player-button');

const categoryPickerOpen = ref(false);
</script>

<template>
  <div class="flex h-full w-full flex-col">
    <div class="mx-auto flex max-w-xl grow flex-col gap-2 p-4">
      <h1 class="text-3xl font-bold">Imposter</h1>
      <p>All but one person knows the word. Everyone gives 1-word clues and tries to find who the imposter is.</p>

      <div class="flex flex-col gap-2 rounded-lg border border-gray-700 bg-gray-800 p-4">
        <div class="flex items-center gap-2 px-1">
          <HugeiconsIcon :icon="UserMultipleIcon" size="20" />
          <p class="text-lg font-bold">
            Players
          </p>
        </div>

        <div class="flex items-stretch gap-2">
          <input ref="name-input" type="text" v-model="newPlayerName" placeholder="Enter player name..."
            class="min-w-0 grow" @keydown="(e) => {
              if (e.key.toLowerCase() === 'enter') addPlayerRef?.click();
            }" />
          <button ref="add-player-button" class="btn shrink-0" @click="() => {
            store.addPlayer(newPlayerName);
            newPlayerName = '';
            nameInputRef?.focus();
          }">Add</button>
        </div>

        <div class="flex flex-col gap-2">
          <div v-for="(player, index) in store.players" :key="index"
            class="flex items-center gap-2 rounded-lg bg-gray-700 px-4 py-2">
            <span class="grow">{{ player }}</span>
            <button class="h-6 w-6 shrink-0" @click="() => {
              store.removePlayer(index);
            }">
              <HugeiconsIcon :icon="Cancel01Icon" size="20" class="m-auto" />
            </button>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-2 rounded-lg border border-gray-700 bg-gray-800 p-4">
        <div class="flex items-center gap-2 px-1">
          <HugeiconsIcon :icon="Book02Icon" size="20" />
          <p class="text-lg font-bold">
            Categories
          </p>
        </div>

        <button class="flex items-center justify-between rounded-lg border border-gray-700 bg-gray-900 px-4 py-2"
          @click="() => categoryPickerOpen = true">
          <p>Choose categories</p>
          <HugeiconsIcon :icon="ArrowRight01Icon" size="20" />
        </button>
        <BottomSheet :open="categoryPickerOpen" :onClose="() => categoryPickerOpen = false">
          <div class="flex max-h-full flex-col">
            <div class="flex justify-between p-4">
              <h2 class="text-xl font-bold">Categories</h2>
              <button class="flex h-8 w-8 items-center justify-center rounded hover:bg-gray-700"
                @click="() => categoryPickerOpen = false">
                <HugeiconsIcon :icon="Cancel01Icon" size="20" />
              </button>
            </div>
            <div class="flex grow flex-col items-stretch gap-2 overflow-scroll px-4 pb-4">
              <button v-for="i in Array.from({ length: 100 }).map((_, i) => i)" :key="i"
                class="flex gap-2 rounded-lg border border-gray-700 bg-gray-700 p-2">
                <div>
                  <HugeiconsIcon :icon="Tick02Icon" size="16" />
                </div>
                <p>{{ i }}</p>
              </button>
            </div>
          </div>
        </BottomSheet>
      </div>
    </div>


    <div class="h-20 shrink-0 border-t border-gray-700">
      <div class="mx-auto flex h-full max-w-xl items-center p-4">
        <button class="btn h-full w-full">Start</button>
      </div>
    </div>
  </div>
</template>
