import { seed } from "@/db/seed";
import { DeckFactory } from "@/factories/models/DeckFactory";
import SQLiteDatabaseFactory from "@/factories/SQLiteDatabaseFactory";
import DEFAULT_DECK, { DEFAULT_CARDS } from "@/src/constants/default-deck";

describe("seed", () => {
  const mockWithTransactionAsync = jest
    .fn()
    .mockImplementation(async (fn) => await fn());
  const mockRunAsync = jest.fn();

  const mockDb = SQLiteDatabaseFactory({
    withTransactionAsync: mockWithTransactionAsync,
    runAsync: mockRunAsync,
  });

  const testDeck = DeckFactory();

  beforeEach(() => {
    mockRunAsync.mockResolvedValueOnce({ lastInsertRowId: testDeck.id });
  });

  it("inserts a deck object, and a card for each card in the default deck", async () => {
    await seed(mockDb);

    expect(mockWithTransactionAsync).toHaveBeenCalledTimes(1);

    expect(mockRunAsync).toHaveBeenCalledWith(
      "INSERT INTO decks (name) VALUES (?)",
      DEFAULT_DECK.name,
    );

    expect(mockRunAsync).toHaveBeenCalledWith(
      "INSERT INTO cards (deck_id, content) VALUES (?, ?)",
      [testDeck.id, DEFAULT_CARDS[0].content],
    );

    expect(mockRunAsync).toHaveBeenCalledTimes(DEFAULT_CARDS.length + 1);
  });
});
