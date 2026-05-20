import CardListEmptyState from "@/src/components/status/CardListEmptyState";
import { DEFAULT_CARDS } from "@/src/constants/default-deck";
import { fireEvent, render, screen } from "@testing-library/react-native";

describe("CardListEmptyState", () => {
  const mockAddCards = jest.fn();

  it("renders UI elements", () => {
    render(<CardListEmptyState addCards={mockAddCards} />);

    expect(
      screen.getByRole("button", { name: "Load Default Cards" }),
    ).toBeVisible();
    expect(screen.getByText("... or add your own here!")).toBeVisible();
    expect(screen.queryByLabelText("Loading Cards")).toBeNull();
  });

  it("allows user to insert default deck of cards", () => {
    render(<CardListEmptyState addCards={mockAddCards} />);

    fireEvent.press(screen.getByRole("button", { name: "Load Default Cards" }));

    expect(mockAddCards).toHaveBeenCalledWith(DEFAULT_CARDS);
    expect(screen.getByLabelText("Loading Cards")).toBeVisible();
  });
});
