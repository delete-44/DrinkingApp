import {
  loadResourceImpl,
  saveResourceImpl,
  StorageContext,
  StorageProvider,
} from "@/context/StorageContext";
import { TDeck } from "@/src/types";
import { renderHook, waitFor } from "@testing-library/react-native";
import * as SecureStore from "expo-secure-store";
import { act, useContext } from "react";

const mockStore: Record<string, string> = {};
const mockGetItemAsync = jest.fn(
  async (key: string): Promise<any> =>
    Object.prototype.hasOwnProperty.call(mockStore, key)
      ? mockStore[key]
      : null,
);
const mockSetItemAsync = jest.fn(async (key: string, value: string) => {
  mockStore[key] = value;
});

jest.spyOn(SecureStore, "getItemAsync").mockImplementation(mockGetItemAsync);
jest.spyOn(SecureStore, "setItemAsync").mockImplementation(mockSetItemAsync);

const storageKey = "players";
const fallbackValue = [] as any;

describe("StorageContext", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Object.keys(mockStore).forEach((k) => delete mockStore[k]);
  });

  describe("#loadResourceImpl", () => {
    it("defaults to fallback if the data load fails", async () => {
      mockGetItemAsync.mockRejectedValueOnce(new Error("test error"));

      const result = await loadResourceImpl(storageKey, fallbackValue);

      expect(result).toEqual(fallbackValue);
    });

    it("defaults to fallback if no data found in storage", async () => {
      mockGetItemAsync.mockResolvedValueOnce(null);

      const result = await loadResourceImpl(storageKey, fallbackValue);

      expect(result).toEqual(fallbackValue);
    });

    it("returns parsed data when found", async () => {
      mockGetItemAsync.mockResolvedValueOnce(JSON.stringify(["Sally"]));

      const result = await loadResourceImpl(storageKey, fallbackValue);

      expect(result).toEqual(["Sally"]);
    });
  });

  describe("#saveResourceImpl", () => {
    it("throws an error if data save fails", async () => {
      mockSetItemAsync.mockRejectedValueOnce(new Error("test error"));

      await saveResourceImpl("players", ["Sally"]);

      expect(mockSetItemAsync).toHaveBeenCalledWith(
        "players",
        JSON.stringify(["Sally"]),
      );
    });

    it("successfully commits new user list to storage", async () => {
      mockSetItemAsync.mockResolvedValueOnce();

      await saveResourceImpl("players", ["Sally"]);

      expect(mockSetItemAsync).toHaveBeenCalledWith(
        "players",
        JSON.stringify(["Sally"]),
      );
    });
  });

  describe("#savePlayers", () => {
    it("saves players to SecureStore and updates context", async () => {
      mockSetItemAsync.mockResolvedValueOnce();

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <StorageProvider>{children}</StorageProvider>
      );

      const { result } = renderHook(() => useContext(StorageContext), {
        wrapper,
      });

      const newPlayers = ["Sally", "Alice"];

      // Wait for data to load to prevent race conditions in test
      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      await act(async () => {
        await result.current.savePlayers(newPlayers);
      });

      expect(mockSetItemAsync).toHaveBeenCalledTimes(1);
      expect(mockSetItemAsync).toHaveBeenCalledWith(
        "players",
        JSON.stringify(newPlayers),
      );

      // Wait for data to load again...
      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      // Assert context state updated
      expect(result.current.players).toEqual(newPlayers);
    });
  });

  describe("#saveDecks", () => {
    it("saves decks to SecureStore and updates context", async () => {
      mockSetItemAsync.mockResolvedValueOnce();

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <StorageProvider>{children}</StorageProvider>
      );

      const { result } = renderHook(() => useContext(StorageContext), {
        wrapper,
      });

      const newDecks = [{ name: "Default", cards: ["Test card"] }] as TDeck[];

      // Wait for data to load to prevent race conditions in test
      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      await act(async () => {
        await result.current.saveDecks(newDecks);
      });

      expect(mockSetItemAsync).toHaveBeenCalledTimes(1);
      expect(mockSetItemAsync).toHaveBeenCalledWith(
        "decks",
        JSON.stringify(newDecks),
      );

      // Wait for data to load again...
      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      // Assert context state updated
      expect(result.current.decks).toEqual(newDecks);
    });
  });
});
