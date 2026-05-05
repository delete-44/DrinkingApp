import { CONTENT_COLOR_HIGHLIGHT } from "@/src/constants/style-constants";
import { StyleSheet, View } from "react-native";

export default function HorizontalDivider() {
  return <View style={styles.divider} />;
}

const styles = StyleSheet.create({
  divider: {
    borderBottomColor: CONTENT_COLOR_HIGHLIGHT,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
