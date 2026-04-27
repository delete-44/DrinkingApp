import { loadPlayersImpl, savePlayersImpl } from "@/context/StorageContext";
import * as SecureStore from "expo-secure-store";

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

const setPlayers = jest.fn();
const setIsLoading = jest.fn();

describe("StorageContext", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Object.keys(mockStore).forEach((k) => delete mockStore[k]);
  });

  describe("#loadPlayers", () => {
    it("throws an error state if the data load fails", async () => {
      mockGetItemAsync.mockRejectedValueOnce(new Error("test error"));

      await loadPlayersImpl(setPlayers, setIsLoading);

      expect(setPlayers).not.toHaveBeenCalled();
      expect(setIsLoading).toHaveBeenCalledWith(false);
    });

    it("defaults to an empty array if no users found in storage", async () => {
      mockGetItemAsync.mockResolvedValueOnce(null);

      await loadPlayersImpl(setPlayers, setIsLoading);

      expect(setPlayers).toHaveBeenCalledWith([]);
      expect(setIsLoading).toHaveBeenCalledWith(false);
    });

    it("loads users & sets loading to false", async () => {
      mockGetItemAsync.mockResolvedValueOnce(JSON.stringify(["Sally"]));

      await loadPlayersImpl(setPlayers, setIsLoading);

      expect(setPlayers).toHaveBeenCalledWith(["Sally"]);
      expect(setIsLoading).toHaveBeenCalledWith(false);
    });
  });

  describe("#savePlayers", () => {
    it("throws an error if data save fails", async () => {
      mockSetItemAsync.mockRejectedValueOnce(new Error("test error"));

      await savePlayersImpl(setPlayers, ["Sally"]);

      expect(setPlayers).not.toHaveBeenCalled();
    });

    it("successfully commits new user list to storage", async () => {
      mockSetItemAsync.mockResolvedValueOnce();

      await savePlayersImpl(setPlayers, ["Sally"]);

      expect(setPlayers).toHaveBeenCalledWith(["Sally"]);
    });
  });
});
