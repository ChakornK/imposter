<script setup lang="ts">
import { HugeiconsIcon } from '@hugeicons/vue';
import { ArrowRight01Icon, Book02Icon, Cancel01Icon, Tick02Icon, UserMultipleIcon } from '@hugeicons/core-free-icons';
import { ref, useTemplateRef } from 'vue';
import BottomSheet from '@/components/BottomSheet.vue';

import { store } from '@/store';
import { getCategories } from '@/lib/words';
import { cva } from 'class-variance-authority';

const newPlayerName = ref<string>('');

const nameInputRef = useTemplateRef('name-input');
const addPlayerRef = useTemplateRef('add-player-button');

const categoryPickerOpen = ref(false);
const tempSelectedCategories = ref<string[]>([]);
const categories = getCategories();

const categoryItemVariants = cva(
  'flex items-center gap-3 rounded-lg border-2 p-3 transition-colors duration-100 text-left ease-out',
  {
    variants: {
      selected: {
        true: 'bg-blue-500/10 border-blue-500',
        false: 'bg-gray-700 border-transparent',
      },
    },
    defaultVariants: {
      selected: false,
    },
  },
);

const checkboxVariants = cva(
  'flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors duration-100 ease-out',
  {
    variants: {
      selected: {
        true: 'bg-blue-500 border-blue-500 text-white',
        false: 'border-gray-500',
      },
    },
    defaultVariants: {
      selected: false,
    },
  },
);

const openCategoryPicker = () => {
  tempSelectedCategories.value = [...store.selectedCategories];
  categoryPickerOpen.value = true;
};

const closeCategoryPicker = () => {
  categoryPickerOpen.value = false;
};

const saveCategorySelection = () => {
  store.selectedCategories = [...tempSelectedCategories.value];
  store.saveCategories();
  categoryPickerOpen.value = false;
};

const toggleTempCategory = (name: string) => {
  const index = tempSelectedCategories.value.indexOf(name);
  if (index === -1) {
    tempSelectedCategories.value.push(name);
  } else {
    tempSelectedCategories.value.splice(index, 1);
  }
};
</script>

<template>
  <div class="flex h-full w-full flex-col items-stretch">
    <div class="*:max-w-xl *:mx-auto *:w-full flex grow flex-col gap-4 overflow-auto p-4">
      <div class="flex flex-col items-stretch gap-2">
        <h1 class="text-3xl font-bold">Imposter</h1>
        <p>All but one person knows the word. Everyone gives 1-word clues and tries to find who the imposter is.</p>
      </div>

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
          @click="openCategoryPicker">
          <p v-if="store.selectedCategories.length === 0">Choose categories</p>
          <p v-else-if="store.selectedCategories.length === categories.length">All categories selected</p>
          <p v-else>{{ store.selectedCategories.length }} categories selected</p>
          <HugeiconsIcon :icon="ArrowRight01Icon" size="20" />
        </button>

        <BottomSheet :open="categoryPickerOpen" :onClose="closeCategoryPicker">
          <div class="flex h-full flex-col">
            <div class="flex items-center justify-between p-4 pb-2">
              <h2 class="text-xl font-bold">Categories</h2>
              <button class="flex h-8 w-8 items-center justify-center rounded hover:bg-gray-700"
                @click="closeCategoryPicker">
                <HugeiconsIcon :icon="Cancel01Icon" size="20" />
              </button>
            </div>
            <div class="flex grow flex-col items-stretch gap-2 overflow-y-auto px-4 pb-4 pt-2">
              <button v-for="category in categories" :key="category.name"
                :class="categoryItemVariants({ selected: tempSelectedCategories.includes(category.name) })"
                @click="toggleTempCategory(category.name)">
                <div :class="checkboxVariants({ selected: tempSelectedCategories.includes(category.name) })">
                  <HugeiconsIcon v-if="tempSelectedCategories.includes(category.name)" :icon="Tick02Icon" size="14" />
                </div>
                <div class="flex grow flex-col">
                  <span class="font-medium">{{ category.name }}</span>
                  <span class="text-xs text-gray-400">{{ category.count }} words</span>
                </div>
              </button>
            </div>
            <div class="h-20 border-t border-gray-700 p-4">
              <button class="btn h-full w-full" @click="saveCategorySelection">Save Selection</button>
            </div>
          </div>
        </BottomSheet>
      </div>
    </div>


    <div class="h-20 shrink-0 border-t border-gray-700">
      <div class="mx-auto flex h-full max-w-xl items-center p-4">
        <button class="btn h-full w-full" @click="store.startGame()">Start</button>
      </div>
    </div>
  </div>
</template>
