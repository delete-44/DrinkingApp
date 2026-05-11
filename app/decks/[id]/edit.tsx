import DeckForm from "@/components/decks/DeckForm";
import { useDeckFromLayout } from "@/context/DeckLayoutContext";
import { StorageContext } from "@/context/StorageContext";
import { Deck } from "@/src/models/Deck";
import { useCallback, useContext } from "react";

export default function Edit() {
  const { updateDeck } = useContext(StorageContext);
  const currentDeck = useDeckFromLayout();

  const saveDeck = useCallback(
    async (name: string) => {
      const newDeck = new Deck(name, currentDeck.cards, currentDeck.id);
      await updateDeck(currentDeck.id, newDeck);
    },
    [currentDeck, updateDeck],
  );

  return <DeckForm deck={currentDeck} saveDeckCallback={saveDeck} />;
}
