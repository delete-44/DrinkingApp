import PlayerListItem from "@/components/PlayerListItem";
import { StorageContext } from "@/contexts/StorageContext";
import { fireEvent, render, screen } from "@testing-library/react-native";

describe("PlayerListItem", () => {
  const mockSavePlayers = jest.fn();
  const mockValue = {
    players: ["Rincewind", "Sally"],
    savePlayers: mockSavePlayers,
    isLoading: false,
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("renders markup - player name and a remove button", () => {
    render(
      <StorageContext.Provider value={mockValue}>
        <PlayerListItem name="Sally" />
      </StorageContext.Provider>,
    );

    const name = screen.getByText("Sally");
    const removeButton = screen.getByRole("button", { name: "Remove Player" });

    expect(name).toBeVisible();
    expect(removeButton).toBeVisible();
  });

  it("exits out if the player is not found", () => {
    render(
      <StorageContext.Provider value={mockValue}>
        <PlayerListItem name="Fake" />
      </StorageContext.Provider>,
    );

    const removeButton = screen.getByRole("button", { name: "Remove Player" });
    fireEvent.press(removeButton);

    expect(mockSavePlayers).not.toHaveBeenCalled();
  });

  it("allows users to remove the player", () => {
    render(
      <StorageContext.Provider value={mockValue}>
        <PlayerListItem name="Sally" />
      </StorageContext.Provider>,
    );

    const removeButton = screen.getByRole("button", { name: "Remove Player" });
    fireEvent.press(removeButton);

    expect(mockSavePlayers).toHaveBeenCalledWith(["Rincewind"]);
  });
});
