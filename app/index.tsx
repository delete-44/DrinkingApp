import {
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import globalStyles from "@/assets/global-styles";
import { circleAlert } from "@/assets/icons/circleAlert";
import DeckSelector from "@/components/decks/DeckSelector";
import DeckSelectorEmptyState from "@/components/decks/DeckSelectorEmptyState";
import PlayerList from "@/components/PlayerList";
import LoadingScreen from "@/components/status/LoadingScreen";
import SVG from "@/components/SVG";
import { StorageContext } from "@/context/StorageContext";
import {
  BACKGROUND_COLOR,
  DANGER_COLOR,
  DECORATION_COLOR,
  FORM_LABEL_HEIGHT,
  SPACING_LG,
  SPACING_MD,
  SPACING_SM,
} from "@/src/constants/style-constants";
import { router } from "expo-router";
import { useCallback, useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { selectedDeck, players, isLoading } = useContext(StorageContext);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");

  useEffect(() => {
    const showListener = Keyboard.addListener("keyboardDidShow", () => {
      setIsKeyboardVisible(true);
    });
    const hideListener = Keyboard.addListener("keyboardDidHide", () => {
      setIsKeyboardVisible(false);
    });

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

  const renderDeckSelector = () => {
    // Hide selectors when keyboard present to save space
    if (isKeyboardVisible) return;

    if (selectedDeck) {
      return <DeckSelector />;
    }

    return <DeckSelectorEmptyState />;
  };

  const prepareGame = useCallback(() => {
    const setTimedWarning = (message: string) => {
      // Remove warning after a delay since user can't
      // remove it themselves
      setTimeout(() => {
        setWarningMessage("");
      }, 3000);

      setWarningMessage(message);
    };

    if (!selectedDeck) {
      setTimedWarning("No Deck selected");
      return;
    }

    if (selectedDeck.cards.length === 0) {
      setTimedWarning("Selected Deck has no Cards");
      return;
    }

    if (players.length === 0) {
      setTimedWarning("No Players added");
      return;
    }

    setWarningMessage("");

    router.navigate({
      pathname: "/decks/[id]/play",
      params: { id: selectedDeck.id },
    });
  }, [players.length, selectedDeck]);

  if (isLoading) {
    return <LoadingScreen label="Loading Decks" />;
  }

  return (
    <SafeAreaView style={[globalStyles.backgroundPlain, { gap: SPACING_MD }]}>
      <ImageBackground
        source={require("../assets/images/decorative/bg-pattern.png")}
        resizeMode="repeat"
        style={styles.backgroundImage}
      />

      {renderDeckSelector()}

      <PlayerList />

      <KeyboardAvoidingView behavior="padding">
        <View style={styles.heroButtonWrapper}>
          <View style={styles.warningMessageWrapper}>
            {warningMessage && (
              <>
                <SVG
                  icon={circleAlert}
                  color={DANGER_COLOR}
                  width={18}
                  height={18}
                />
                <Text
                  style={globalStyles.textDanger}
                  role="alert"
                  accessibilityLiveRegion="polite"
                >
                  {warningMessage}
                </Text>
              </>
            )}
          </View>

          <Pressable
            style={styles.heroButton}
            role="button"
            onPress={prepareGame}
          >
            <Text style={styles.heroButtonText}>Get Started!</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
  },
  heroButtonWrapper: {
    borderTopWidth: 5,
    borderTopColor: DECORATION_COLOR,
    backgroundColor: BACKGROUND_COLOR,
    paddingBottom: SPACING_SM, // Only pad at bottom - we add space for a warning message at top to prevent UI jumps
    justifyContent: "flex-start",
    alignItems: "center",
  },
  heroButton: {
    ...globalStyles.buttonHighlight,
    paddingVertical: SPACING_LG,
    alignSelf: "center",
    boxShadow: `-5px 5px 0 ${DECORATION_COLOR}`,
  },
  heroButtonText: {
    ...globalStyles.buttonText,
    fontSize: 32,
  },
  warningMessageWrapper: {
    height: FORM_LABEL_HEIGHT,
    gap: SPACING_SM,
    flexDirection: "row",
    alignItems: "center",
  },
});
