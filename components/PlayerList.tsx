import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import globalStyles from "@/assets/global-styles";
import {
  CONTENT_BACKDROP,
  SPACING_MD,
  SPACING_SM,
} from "@/assets/style-constants";
import { StorageContext } from "@/context/StorageContext";
import { useCallback, useContext, useState } from "react";
import PlayerListEmptyState from "./PlayerListEmptyState";
import PlayerListItem from "./PlayerListItem";
import WrappedTextInput from "./WrappedTextInput";

export default function PlayerList() {
  const { players, savePlayers, isLoading } = useContext(StorageContext);

  const [newPlayer, setNewPlayer] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const addPlayer = useCallback(
    (name: string) => {
      const newPlayers = [...players];

      if (!name.trim()) {
        setErrorMessage("Player name cannot be empty");
        return;
      }

      if (players.includes(name.trim())) {
        setErrorMessage("Player already exists");
        return;
      }

      newPlayers.push(name.trim());

      savePlayers(newPlayers);

      setNewPlayer("");
    },
    [players, savePlayers],
  );

  return (
    <View style={styles.playerList}>
      <View style={styles.playerInputWrapper}>
        <WrappedTextInput
          label="Name"
          value={newPlayer}
          errorMessage={errorMessage}
          onChange={(text) => {
            setErrorMessage("");
            setNewPlayer(text);
          }}
        />

        <Pressable
          role="button"
          accessibilityLabel="Add Player"
          style={globalStyles.buttonHighlight}
          onPress={() => addPlayer(newPlayer)}
        >
          <Text style={globalStyles.buttonText}>+</Text>
        </Pressable>
      </View>

      <FlatList
        data={players}
        renderItem={({ item }) => <PlayerListItem name={item} />}
        ListEmptyComponent={
          isLoading ? (
            <ActivityIndicator
              color="#fff"
              accessibilityLabel="Loading players"
            />
          ) : (
            PlayerListEmptyState
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  playerList: {
    maxWidth: "90%",
    paddingHorizontal: SPACING_MD,
    paddingVertical: SPACING_SM,
    marginInline: "auto",
    flex: 1,

    backgroundColor: CONTENT_BACKDROP,
    borderRadius: SPACING_SM,

    flexDirection: "column",
    alignItems: "center",
    gap: SPACING_MD,
  },
  playerInputWrapper: {
    flexDirection: "row",
    gap: SPACING_SM,
    justifyContent: "space-between",
    alignItems: "baseline",
  },
});
