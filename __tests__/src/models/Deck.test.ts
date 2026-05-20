import { CardFactory } from "@/factories/models/CardFactory";
import { DeckFactory } from "@/factories/models/DeckFactory";
import { Deck } from "@/src/models/Deck";
import { CardRepository } from "@/src/repositories/CardRepository";
import { TDeckData } from "@/src/types";

describe("Deck", () => {
  describe("#cards", () => {
    it("loads cards associated with this deck", () => {
      const deck = DeckFactory();
      const card1 = CardFactory({ id: 1, deck_id: deck.id });
      const card2 = CardFactory({ id: 2, deck_id: deck.id });
      const card3 = CardFactory({ id: 3, deck_id: deck.id });

      jest
        .spyOn(CardRepository, "index")
        .mockReturnValueOnce({ ok: true, payload: [card1, card2, card3] });

      const res = deck.cards();

      expect(res).toEqual([card1, card2, card3]);
    });
  });

  describe("#toJson", () => {
    it("converts a Deck to a JSON object", () => {
      const deck = DeckFactory();

      expect(deck.toJson()).toEqual({
        id: deck.id,
        name: deck.name,
        created_at: deck.created_at,
        updated_at: deck.updated_at,
      });
    });
  });

  describe("#fromJson", () => {
    it("generates a Deck from a JSON object", () => {
      const deckData = {
        id: 1,
        name: "Test Deck",
        created_at: "1970-01-01",
        updated_at: "1970-01-02",
      } as TDeckData;

      const deck = Deck.fromJson(deckData);

      expect(deck.id).toEqual(1);
      expect(deck.name).toEqual("Test Deck");
    });
  });
});
