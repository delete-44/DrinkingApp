import { FlatList, Text, View } from "react-native";

import globalStyles from "@/assets/global-styles";
import RemovableListItem from "@/components/RemovableListItem";
import CardListEmptyState from "@/components/status/CardListEmptyState";
import ErrorScreen from "@/components/status/ErrorScreen";
import LoadingScreen from "@/components/status/LoadingScreen";
import WrappedTextInput from "@/components/WrappedTextInput";
import { StorageContext } from "@/context/StorageContext";
import { TDeck } from "@/src/types";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Form() {
  const [newCard, setNewCard] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [deck, setDeck] = useState<TDeck>();
  const [pageLoadError, setPageLoadError] = useState("");

  const { decks, saveDeck, isLoading } = useContext(StorageContext);
  const { idx } = useLocalSearchParams<{ idx: string }>();

  const removeCardAt = useCallback(
    (cardIndex: number) => {
      if (!deck) return;

      const newCards = deck.cards.filter((_, idx) => idx !== cardIndex);

      saveDeck(cardIndex, {
        name: deck.name,
        cards: newCards,
      });
    },
    [deck, saveDeck],
  );

  useEffect(() => {
    if (isLoading) return;

    const deckIdx = parseInt(idx);
    const currentDeck = decks[deckIdx];

    if (!currentDeck || !currentDeck?.cards) {
      setPageLoadError("Failed to load Deck.");
    }

    setDeck(currentDeck);
  }, [decks, idx, isLoading]);

  if (isLoading) {
    return <LoadingScreen label="Loading Deck" />;
  }

  if (pageLoadError || !deck) {
    return <ErrorScreen message={pageLoadError} />;
  }

  return (
    <SafeAreaView style={globalStyles.backgroundGradient}>
      <View>
        <Text style={globalStyles.textLg}>{deck.name}</Text>

        <FlatList
          data={deck.cards}
          renderItem={({ item, index }) => (
            <RemovableListItem
              label={item}
              idx={index}
              removeItemAt={removeCardAt}
            />
          )}
          ListEmptyComponent={CardListEmptyState}
        />

        <WrappedTextInput
          label="Add Card"
          value={newCard}
          errorMessage={errorMessage}
          onChange={(text) => {
            setErrorMessage("");
            setNewCard(text);
          }}
        />
      </View>
    </SafeAreaView>
  );
}
