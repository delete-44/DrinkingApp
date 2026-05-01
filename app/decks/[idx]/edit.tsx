import { View } from "react-native";

import globalStyles from "@/assets/global-styles";
import ErrorScreen from "@/components/status/ErrorScreen";
import LoadingScreen from "@/components/status/LoadingScreen";
import WrappedTextInput from "@/components/WrappedTextInput";
import { StorageContext } from "@/context/StorageContext";
import { TDeck } from "@/src/types";
import { useLocalSearchParams } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Form() {
  const [newCard, setNewCard] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [deck, setDeck] = useState<TDeck>();
  const [pageLoadError, setPageLoadError] = useState("");

  const { decks, isLoading } = useContext(StorageContext);
  const { idx } = useLocalSearchParams<{ idx: string }>();

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

  if (pageLoadError) {
    return <ErrorScreen message={pageLoadError} />;
  }

  return (
    <SafeAreaView style={globalStyles.backgroundGradient}>
      <View>
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
