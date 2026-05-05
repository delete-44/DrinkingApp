import globalStyles from "@/assets/global-styles";
import { ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type LoadingScreenProps = {
  label: string;
};

export default function LoadingScreen({ label }: LoadingScreenProps) {
  return (
    <SafeAreaView style={globalStyles.backgroundGradient}>
      <ActivityIndicator color="#fff" accessibilityLabel={label} />
    </SafeAreaView>
  );
}
