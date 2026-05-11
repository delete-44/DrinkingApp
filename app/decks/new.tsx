import DeckForm from "@/components/decks/DeckForm";
import { StorageContext } from "@/context/StorageContext";
import { Deck } from "@/src/models/Deck";
import { useCallback, useContext, useMemo, useState } from "react";

export default function New() {
  const { createDeck, updateDeck, fetchDeck, isLoading } =
    useContext(StorageContext);

  // Store working title to prevent layout flicker when switching to the deck from storage
  const [workingDeckName, setWorkingDeckName] = useState("");
  const [currentDeckId, setCurrentDeckId] = useState<string | null>(null);

  const workingDeck = useMemo(() => {
    return new Deck(workingDeckName, [], currentDeckId || undefined);
  }, [currentDeckId, workingDeckName]);

  const saveDeck = useCallback(
    async (name: string) => {
      if (!currentDeckId) {
        const newDeck = await createDeck(name);

        setWorkingDeckName(name);
        setCurrentDeckId(newDeck.id);

        return;
      }

      await updateDeck(currentDeckId, { name });
    },
    [createDeck, currentDeckId, updateDeck],
  );

  // Before deck is created
  if (!currentDeckId) {
    return <DeckForm deck={workingDeck} saveDeckCallback={saveDeck} />;
  }

  const currentDeck = fetchDeck(currentDeckId);

  if (isLoading || !currentDeck) {
    return <DeckForm deck={workingDeck} saveDeckCallback={saveDeck} />;
  }

  return <DeckForm deck={currentDeck} saveDeckCallback={saveDeck} />;
}
