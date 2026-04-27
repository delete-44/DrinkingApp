import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import globalStyles, {
  CONTENT_BACKDROP,
  SPACING_MD,
  SPACING_SM,
} from "@/assets/global-styles";

export default function PlayerList() {
  return (
    <View style={styles.playerList}>
      <View style={styles.playerInputWrapper}>
        <TextInput style={globalStyles.textInput} />

        <Pressable
          style={globalStyles.buttonSm}
          onPress={() => alert("Pressed Add")}
        >
          <Text style={globalStyles.buttonText}>+</Text>
        </Pressable>
      </View>

      <Text>Delete</Text>

      <Text>Rincewind</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  playerList: {
    maxWidth: "90%",
    padding: SPACING_MD,
    marginInline: "auto",

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
  },
});
