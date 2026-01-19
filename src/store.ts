import { reactive } from "vue";

export const store = reactive({
  players: [] as string[],
  selectedCategories: [] as string[],

  addPlayer(name: string) {
    const trimmedName = name.trim();
    if (trimmedName === "" || this.players.includes(trimmedName)) return;
    this.players.push(trimmedName);
  },

  removePlayer(index: number) {
    this.players.splice(index, 1);
  },

  toggleCategory(name: string) {
    const index = this.selectedCategories.indexOf(name);
    if (index === -1) {
      this.selectedCategories.push(name);
    } else {
      this.selectedCategories.splice(index, 1);
    }
  },
});
