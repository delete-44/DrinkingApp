import { Pressable, StyleSheet, Text, View } from "react-native";

import globalStyles, {
  CONTENT_BACKDROP,
  SPACING_MD,
  SPACING_SM,
} from "@/assets/global-styles";

export default function Index() {
  return (
    <View style={globalStyles.rootBg}>
      <View style={styles.deckSelector}>
        <Text style={globalStyles.textLg}>Default</Text>

        <View style={styles.deckSelectorActions}>
          <Pressable
            style={globalStyles.button}
            onPress={() => alert("Pressed Edit")}
          >
            <Text style={globalStyles.buttonText}>Edit</Text>
          </Pressable>
          <Pressable
            style={globalStyles.button}
            onPress={() => alert("Pressed New")}
          >
            <Text style={globalStyles.buttonText}>New</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  deckSelector: {
    padding: SPACING_MD,
    marginInline: "auto",

    backgroundColor: CONTENT_BACKDROP,
    borderRadius: SPACING_SM,

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: SPACING_MD,
  },
  deckSelectorActions: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    gap: SPACING_MD,
  },
});
