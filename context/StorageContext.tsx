import * as SecureStore from "expo-secure-store";
import { createContext, useEffect, useState } from "react";
import {
  StorageContextProps,
  StorageProviderProps,
} from "./StorageContextTypes";

export const StorageContext = createContext({} as StorageContextProps);

export async function loadPlayersImpl(
  setPlayers: React.Dispatch<React.SetStateAction<string[]>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
) {
  try {
    const players = await SecureStore.getItemAsync("players");

    setPlayers(players ? JSON.parse(players) : []);
  } catch (error) {
    // TODO: Error handling
    console.error("Failed to load data: ", error);
  } finally {
    setIsLoading(false);
  }
}

export async function savePlayersImpl(
  setPlayers: React.Dispatch<React.SetStateAction<string[]>>,
  newPlayers: string[],
) {
  try {
    await SecureStore.setItemAsync("players", JSON.stringify(newPlayers));
    setPlayers(newPlayers);
  } catch (error) {
    // TODO: Error handling
    console.error("Failed to save players:", error);
  }
}

export function StorageProvider({ children }: StorageProviderProps) {
  const [players, setPlayers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPlayersImpl(setPlayers, setIsLoading);
  }, []);

  const savePlayers = (newPlayers: string[]) =>
    savePlayersImpl(setPlayers, newPlayers);

  const value = {
    isLoading,
    players,
    savePlayers,
  };

  return (
    <StorageContext.Provider value={value}>{children}</StorageContext.Provider>
  );
}
