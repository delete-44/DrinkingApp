// Game logic types

export type TDeck = {
  name: string;
  cards: string[];
};

export type TPlayers = string[];

export type GameState = {
  card: string;
  player: string;
};

// StorageContext types

export type StorageProviderProps = {
  children: any;
};

export type StorageContextProps = {
  currentDeck: TDeck;
  currentDeckIndex: number;
  saveCurrentDeckIndex: (idx: number) => void;
  decks: TDeck[];
  saveDeck: (idx: number, updatedDeck: TDeck) => void;
  players: string[];
  savePlayers: (newPlayers: string[]) => void;
  isLoading: boolean;
};
