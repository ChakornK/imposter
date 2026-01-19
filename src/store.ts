import { reactive } from "vue";

export const store = reactive({
  players: [] as string[],

  addPlayer(name: string) {
    const trimmedName = name.trim();
    if (trimmedName === "" || this.players.includes(trimmedName)) return;
    this.players.push(trimmedName);
  },

  removePlayer(index: number) {
    this.players.splice(index, 1);
  },
});
