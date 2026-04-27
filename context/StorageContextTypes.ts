export type StorageProviderProps = {
  children: any;
};

export type StorageContextProps = {
  isLoading: boolean;
  players: string[];
  savePlayers: (newPlayers: string[]) => void;
};
