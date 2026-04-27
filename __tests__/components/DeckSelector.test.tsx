import DeckSelector from "@/components/DeckSelector";
import { render } from "@testing-library/react-native";

describe("<DeckSelector />", () => {
  test("Text renders correctly on DeckSelector", () => {
    const { getByText } = render(<DeckSelector />);

    getByText("Default");
  });
});
