import DeckSelector from "@/components/DeckSelector";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { router } from "expo-router";
import React from "react";

jest.mock("expo-router", () => ({
  router: {
    navigate: jest.fn(),
  },
}));

describe("DeckSelector", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("renders loading spinner when fetching data", () => {
    jest.spyOn(React, "useContext").mockReturnValueOnce({
      decks: [{ id: "1", name: "Default", cards: ["Card 1"] }],
      currentDeckIndex: 0,
      isLoading: true,
    });

    render(<DeckSelector />);

    expect(screen.getByLabelText("Loading decks")).toBeVisible();
    expect(screen.queryByText("Default")).toBeNull();
    expect(screen.getAllByRole("button")).toHaveLength(2);
  });

  describe("once loaded", () => {
    beforeEach(() => {
      jest.spyOn(React, "useContext").mockReturnValueOnce({
        decks: [{ id: "1", name: "Default", cards: ["Card 1"] }],
        currentDeckIndex: 0,
        isLoading: false,
      });
    });

    it("renders UI elements correctly", async () => {
      render(<DeckSelector />);

      expect(screen.queryByLabelText("Loading decks")).toBeNull();
      expect(screen.getByText("Default")).toBeVisible();
      expect(screen.getAllByRole("button")).toHaveLength(2);
    });

    it("navigates to the edit page for a deck when edit clicked", () => {
      render(<DeckSelector />);

      fireEvent.press(screen.getByRole("button", { name: "Edit Deck" }));
      expect(router.navigate).toHaveBeenCalledWith({
        params: { idx: 0 },
        pathname: "/decks/[idx]/edit",
      });
    });
  });
});
