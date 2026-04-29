export type NonEmptyArray<T> = [T, ...T[]];

// Game logic types

export type TDeck = {
  name: string;
  cards: NonEmptyArray<string>;
};

export type TPlayers = NonEmptyArray<string>;

export type GameState = {
  card: string;
  player: string;
};

// StorageContext types

// Items we can commit to internal memory - either an array of players, or an array of decks
export type CommitableResource = string[] | TDeck[];

export type StorageProviderProps = {
  children: any;
};

export type StorageContextProps = {
  isLoading: boolean;
  players: string[];
  savePlayers: (newPlayers: string[]) => void;
};
