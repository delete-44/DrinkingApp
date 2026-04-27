import Constants from "expo-constants";
import { StyleSheet } from "react-native";

const BACKGROUND_COLOR = "#540D6E";
const CONTENT_COLOR = "#FFFFFF";
const HIGHLIGHT_COLOR = "#F49907";
const DECORATION_COLOR = "#000000";

export const CONTENT_BACKDROP = "rgba(0, 0, 0, 0.4)";

export const SPACING_SM = 8;
export const SPACING_MD = 16;
export const SPACING_LG = 24;

const baseButton = {
  backgroundColor: CONTENT_COLOR,
  borderWidth: 5,
  borderColor: DECORATION_COLOR,
  borderRadius: SPACING_SM,
};

export default StyleSheet.create({
  rootBg: {
    backgroundColor: BACKGROUND_COLOR,
    paddingTop: Constants.statusBarHeight + SPACING_LG,
    paddingBottom: SPACING_LG,
    flex: 1,
  },
  textLg: {
    fontSize: 24,
    color: CONTENT_COLOR,
  },
  textMd: {
    fontSize: 20,
    color: CONTENT_COLOR,
  },
  textInput: {
    width: "80%",
    backgroundColor: CONTENT_COLOR,
    borderWidth: 5,
    borderColor: DECORATION_COLOR,
    borderRadius: SPACING_SM,
    padding: SPACING_SM,
    fontSize: 20,
  },
  buttonSm: {
    ...baseButton,
    padding: SPACING_SM,
  },
  button: {
    ...baseButton,
    padding: SPACING_MD,
  },
  buttonText: {
    fontSize: 20,
    color: DECORATION_COLOR,
  },
});
