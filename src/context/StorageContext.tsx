import DEFAULT_DECK from "@/src/constants/default-deck";
import { Deck } from "@/src/models/Deck";
import { StorageContextProps, StorageProviderProps } from "@/src/types";
import * as SecureStore from "expo-secure-store";
import { useSQLiteContext } from "expo-sqlite";
import { createContext, useEffect, useMemo, useState } from "react";
import { Player } from "../models/Player";
import { CardRepository } from "../repositories/CardRepository";
import { DeckRepository } from "../repositories/DeckRepository";
import { PlayerRepository } from "../repositories/PlayerRepository";

export const StorageContext = createContext({} as StorageContextProps);

const SELECTED_DECK_KEY = "selected_deck_idx";
const DECK_KEY = "decks";

export async function loadResourceImpl<T>(
  storageKey: string,
  fallback: T,
): Promise<T> {
  try {
    const data = await SecureStore.getItemAsync(storageKey);

    return data ? JSON.parse(data) : fallback;
  } catch (error) {
    // TODO: Error handling
    console.error("Failed to load data: ", error);

    return fallback;
  }
}

export async function saveResourceImpl<T>(
  storageKey: string,
  newVal: T,
): Promise<void> {
  try {
    await SecureStore.setItemAsync(storageKey, JSON.stringify(newVal));
  } catch (error) {
    // TODO: Error handling
    console.error(`Failed to save ${storageKey}:`, error);
  }
}

export function StorageProvider({ children }: StorageProviderProps) {
  const [selectedDeckIdx, setSelectedDeckIdx] = useState<number>(0);
  const [decks, setDecks] = useState<Deck[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const db = useSQLiteContext();

  useEffect(() => {
    const init = () => {
      PlayerRepository.initialise(db);
      DeckRepository.initialise(db);
      CardRepository.initialise(db);
    };

    const fetchData = async () => {
      const [loadedSelectedDeckIdx, loadedDecks, loadedPlayers] =
        await Promise.all([
          loadResourceImpl(SELECTED_DECK_KEY, 0),
          loadResourceImpl(DECK_KEY, [DEFAULT_DECK]),
          PlayerRepository.index(),
        ]);

      setSelectedDeckIdx(loadedSelectedDeckIdx);
      setDecks(loadedDecks.map((deckData) => Deck.fromJson(deckData)));
      setPlayers(loadedPlayers.payload || []);

      setIsLoading(false);
    };

    init();
    fetchData();
  }, [db]);

  const selectedDeck = useMemo(() => {
    return decks[selectedDeckIdx] || decks[0];
  }, [decks, selectedDeckIdx]);

  const saveSelectedDeckIdx = async (idx: number) => {
    await saveResourceImpl(SELECTED_DECK_KEY, idx);
    setSelectedDeckIdx(idx);
  };

  const fetchDeck = (id: number) => {
    return decks.find((d) => d.id === id) || null;
  };

  const createDeck = async (name = "" as string): Promise<Deck> => {
    const newDeck = new Deck({ name });
    const newDecks = [...decks, newDeck];

    await saveResourceImpl(DECK_KEY, newDecks);
    setDecks(newDecks);

    return newDeck;
  };

  const updateDeck = async (id: number, patch: Partial<Deck>) => {
    const existing = decks.find((deck) => deck.id === id);

    if (!existing) throw new Error(`Deck ${id} not found`);

    const merged = new Deck({
      name: patch.name ?? existing.name,
      cards: patch.cards ?? existing.cards,
      id: existing.id,
    });

    const newDecks = decks.map((deck) => (deck.id === id ? merged : deck));
    await saveResourceImpl(DECK_KEY, newDecks);
    setDecks(newDecks);
  };

  const destroyDeck = async (id: number) => {
    const deckExists = decks.some((deck) => deck.id === id);

    if (!deckExists) throw new Error(`Deck ${id} not found`);

    const newDecks = decks.filter((deck) => deck.id !== id);

    await saveResourceImpl(DECK_KEY, newDecks);
    setDecks(newDecks);
  };

  const createPlayer = async (name: string) => {
    const resp = await PlayerRepository.create({ name });

    if (!resp.ok || !resp.payload) {
      throw new Error(resp.message);
    }

    const newPlayers = [...players, resp.payload!];

    setPlayers(newPlayers);
  };

  const deletePlayer = async (id: number) => {
    const resp = await PlayerRepository.delete(id);

    if (resp.changes === 0 || !resp.ok) {
      throw new Error(resp.message);
    }

    const newPlayers = players.filter((player) => player.id !== id);

    setPlayers(newPlayers);
  };

  const value = {
    selectedDeck,
    saveSelectedDeckIdx,
    decks,
    fetchDeck,
    createDeck,
    updateDeck,
    destroyDeck,
    players,
    createPlayer,
    deletePlayer,
    isLoading,
  };

  return (
    <StorageContext.Provider value={value}>{children}</StorageContext.Provider>
  );
}
