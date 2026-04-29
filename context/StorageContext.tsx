import {
  CommitableResource,
  StorageContextProps,
  StorageProviderProps,
} from "@/src/types";
import * as SecureStore from "expo-secure-store";
import { createContext, useEffect, useState } from "react";

export const StorageContext = createContext({} as StorageContextProps);

export async function loadResourceImpl(
  storageKey: string,
  fallbackVal: CommitableResource,
  setResource: React.Dispatch<React.SetStateAction<CommitableResource>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
) {
  try {
    const data = await SecureStore.getItemAsync(storageKey);

    setResource(data ? JSON.parse(data) : fallbackVal);
  } catch (error) {
    // TODO: Error handling
    console.error("Failed to load data: ", error);
  } finally {
    setIsLoading(false);
  }
}

export async function saveResourceImpl(
  storageKey: string,
  setResource: React.Dispatch<React.SetStateAction<CommitableResource>>,
  newVal: CommitableResource,
) {
  try {
    await SecureStore.setItemAsync(storageKey, JSON.stringify(newVal));
    setResource(newVal);
  } catch (error) {
    // TODO: Error handling
    console.error(`Failed to save ${storageKey}:`, error);
  }
}

export function StorageProvider({ children }: StorageProviderProps) {
  const [players, setPlayers] = useState<CommitableResource>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadResourceImpl("players", [], setPlayers, setIsLoading);
  }, []);

  const savePlayers = (newPlayers: string[]) =>
    saveResourceImpl("players", setPlayers, newPlayers);

  const value = {
    isLoading,
    players: players as string[],
    savePlayers,
  };

  return (
    <StorageContext.Provider value={value}>{children}</StorageContext.Provider>
  );
}
