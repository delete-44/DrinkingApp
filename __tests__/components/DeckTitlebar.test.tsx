import DeckTitlebar from "@/components/DeckTitlebar";
import { StorageContext } from "@/context/StorageContext";
import { Deck } from "@/src/models/Deck";
import { fireEvent, render, screen } from "@testing-library/react-native";
import React from "react";
import { BaseMockStorageContext, BaseTestDeck } from "../../test-utils";

describe("DeckTitlebar", () => {
  const mockUpdateDeck = jest.fn();

  const mockStorageContext = {
    ...BaseMockStorageContext,
    updateDeck: mockUpdateDeck,
  };

  const assertInert = () => {
    expect(screen.getByRole("button", { name: "Rename Deck" })).toBeVisible();
    expect(screen.queryByRole("button", { name: "Confirm Change" })).toBeNull();
    expect(screen.queryByLabelText("Deck Name")).toBeNull();
  };

  const assertActive = () => {
    expect(screen.queryByRole("button", { name: "Rename Deck" })).toBeNull();
    expect(
      screen.getByRole("button", { name: "Confirm Change" }),
    ).toBeVisible();
    expect(screen.getByLabelText("Deck Name")).toBeVisible();
  };

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders in active state if deck name is empty", () => {
    const newDeck = new Deck("", []);

    render(
      <StorageContext.Provider value={mockStorageContext}>
        <DeckTitlebar currentDeck={newDeck} />
      </StorageContext.Provider>,
    );

    assertActive();
  });

  describe("when deck name is populated", () => {
    beforeEach(() => {
      render(
        <StorageContext.Provider value={mockStorageContext}>
          <DeckTitlebar currentDeck={BaseTestDeck} />
        </StorageContext.Provider>,
      );
    });

    it("allows user to enter the active state by clicking the edit button", () => {
      assertInert();

      fireEvent.press(screen.getByRole("button", { name: "Rename Deck" }));

      assertActive();
    });

    it("stays in active state & shows an error on failed update", () => {
      fireEvent.press(screen.getByRole("button", { name: "Rename Deck" }));

      fireEvent.changeText(screen.getByLabelText("Deck Name"), "");

      fireEvent.press(screen.getByRole("button", { name: "Confirm Change" }));

      expect(screen.getByText("Deck name cannot be empty")).toBeVisible();
      expect(mockUpdateDeck).not.toHaveBeenCalled();

      assertActive();
    });

    it("clears error message on new input", () => {
      fireEvent.press(screen.getByRole("button", { name: "Rename Deck" }));

      fireEvent.changeText(screen.getByLabelText("Deck Name"), "");

      fireEvent.press(screen.getByRole("button", { name: "Confirm Change" }));

      expect(screen.getByText("Deck name cannot be empty")).toBeVisible();
      expect(mockUpdateDeck).not.toHaveBeenCalled();

      fireEvent.changeText(screen.getByLabelText("Deck Name"), "T");

      expect(screen.queryByText("Deck name cannot be empty")).toBeNull();
    });

    it("returns to inert state + commits the updated deck on save", () => {
      fireEvent.press(screen.getByRole("button", { name: "Rename Deck" }));

      fireEvent.changeText(screen.getByLabelText("Deck Name"), "Renamed Deck");

      fireEvent.press(screen.getByRole("button", { name: "Confirm Change" }));

      expect(mockUpdateDeck).toHaveBeenCalledWith(BaseTestDeck.id, {
        cards: BaseTestDeck.cards,
        id: BaseTestDeck.id,
        name: "Renamed Deck",
      });

      assertInert();
    });
  });
});
