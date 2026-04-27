import { Pressable, StyleSheet, Text, View } from "react-native";

import globalStyles, { SPACING_SM } from "@/assets/global-styles";
import { StorageContext } from "@/contexts/StorageContext";
import { useCallback, useContext } from "react";

type PlayerListItemProps = {
  name: string;
};

export default function PlayerListItem({ name }: PlayerListItemProps) {
  const { players, savePlayers } = useContext(StorageContext);

  const removePlayer = useCallback(
    (player: string) => {
      const newPlayers = [...players];
      const idx = newPlayers.indexOf(player);

      if (idx > -1) {
        newPlayers.splice(idx, 1);
      }

      savePlayers(newPlayers);
    },
    [players, savePlayers],
  );

  return (
    <View style={styles.playerListItemWrapper}>
      <Text style={globalStyles.textMd}>{name}</Text>
      <Pressable
        style={globalStyles.buttonSm}
        onPress={() => removePlayer(name)}
      >
        <Text style={globalStyles.buttonText}>x</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  playerListItemWrapper: {
    flexDirection: "row",
    gap: SPACING_SM,
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
});
