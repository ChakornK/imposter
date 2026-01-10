<script setup lang="ts">
import { HugeiconsIcon } from '@hugeicons/vue';
import { ArrowRight01Icon, Book02Icon, Cancel01Icon, UserMultipleIcon } from '@hugeicons/core-free-icons';
import { ref, useTemplateRef } from 'vue';

const players = ref<string[]>([]);
const newPlayerName = ref<string>('');

const nameInputRef = useTemplateRef('name-input');
const addPlayerRef = useTemplateRef('add-player-button');
</script>

<template>
  <div class="flex h-full w-full flex-col">
    <div class="flex grow flex-col gap-2 p-4">
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
            const n = newPlayerName.trim()
            if (n === '' || players.includes(n)) return;
            players.push(n);
            newPlayerName = '';
            nameInputRef?.focus();
          }">Add</button>
        </div>

        <div class="flex flex-col gap-1">
          <div v-for="(player, index) in players" :key="index"
            class="flex items-center gap-2 rounded-lg bg-gray-700 px-4 py-2">
            <span class="grow">{{ player }}</span>
            <button class="h-6 w-6 shrink-0" @click="() => {
              players.splice(index, 1);
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

        <button class="flex items-center justify-between rounded-lg border border-gray-700 bg-gray-900 px-4 py-2">
          <p>Choose categories</p>
          <HugeiconsIcon :icon="ArrowRight01Icon" size="20" />
        </button>
      </div>
    </div>


    <div class="h-20 shrink-0 border-t border-gray-700 p-4">
      <button class="btn h-full w-full">Start</button>
    </div>
  </div>
</template>
