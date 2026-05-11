import DeckForm from "@/components/decks/DeckForm";
import { StorageContext } from "@/context/StorageContext";
import { Deck } from "@/src/models/Deck";
import { useCallback, useContext, useState } from "react";

export default function New() {
  const { createDeck, fetchDeck, isLoading } = useContext(StorageContext);

  const [deckId, setDeckId] = useState<string | null>(null);

  // Store working title to prevent layout flicker when switching to the deck from storage
  const [workingDeckName, setWorkingDeckName] = useState("");

  const saveDeck = useCallback(
    async (name: string) => {
      const newDeck = await createDeck(name);

      setDeckId(newDeck.id);
      setWorkingDeckName(name);
    },
    [createDeck],
  );

  // Before deck is created
  if (deckId === null) {
    return (
      <DeckForm
        deck={new Deck(workingDeckName, [], undefined)}
        saveDeckCallback={saveDeck}
      />
    );
  }

  const storageDeck = fetchDeck(deckId);

  if (isLoading || !storageDeck) {
    return (
      <DeckForm
        deck={new Deck(workingDeckName, [], deckId)}
        saveDeckCallback={saveDeck}
      />
    );
  }

  return <DeckForm deck={storageDeck} saveDeckCallback={saveDeck} />;
}
