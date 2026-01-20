import { reactive } from "vue";
import { getWords } from "@/lib/words";

export const store = reactive({
  players: [] as string[],
  selectedCategories: [] as string[],
  view: "setup" as "setup" | "game" | "discuss",
  gameWord: null as string | null,
  gameHint: null as string | null,
  imposterIndex: null as number | null,
  startingPlayerIndex: null as number | null,

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

  startGame() {
    if (this.players.length < 3) {
      alert("At least 3 players are required to start the game.");
      return;
    }

    if (this.selectedCategories.length === 0) {
      alert("Please select at least one category.");
      return;
    }

    const possibleWords = getWords(this.selectedCategories);
    if (possibleWords.length === 0) {
      alert("No words found in the selected categories.");
      return;
    }

    const randomWordObj = possibleWords[Math.floor(Math.random() * possibleWords.length)];
    if (randomWordObj) {
      this.gameWord = randomWordObj.word;
      this.gameHint = randomWordObj.hint;
    }
    this.imposterIndex = Math.floor(Math.random() * this.players.length);
    this.startingPlayerIndex = Math.floor(Math.random() * this.players.length);
    this.view = "game";
  },

  startDiscussion() {
    this.view = "discuss";
  },

  resetGame() {
    this.gameWord = null;
    this.gameHint = null;
    this.imposterIndex = null;
    this.startingPlayerIndex = null;
    this.view = "setup";
  },
});
