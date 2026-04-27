import { View } from "react-native";

import globalStyles from "@/assets/global-styles";
import DeckSelector from "@/components/DeckSelector";
import PlayerList from "@/components/PlayerList";

export default function Index() {
  return (
    <View style={globalStyles.rootBg}>
      <DeckSelector />

      <PlayerList />
    </View>
  );
}
