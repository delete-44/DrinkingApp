import { GameState } from "../types";
import { Card } from "./Card";
import { Player } from "./Player";

export class Game {
  private readonly cards: Card[];
  private readonly players: Player[];

  private currentCards: Card[];
  private currentPlayers: Player[];

  constructor(startingCards: Card[], startingPlayers: Player[]) {
    if (startingCards.length === 0) {
      throw TypeError("Deck has no Cards");
    }

    if (startingPlayers.length === 0) {
      throw TypeError("Game has no Players");
    }

    this.cards = startingCards;
    this.currentCards = [...startingCards];

    this.players = startingPlayers;
    this.currentPlayers = [...startingPlayers];
  }

  private resetDeck() {
    this.currentCards = [...this.cards];
  }

  private resetPlayers() {
    this.currentPlayers = [...this.players];
  }

  private randomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  public drawCard(): GameState {
    if (this.currentCards.length === 0) {
      this.resetDeck();
    }

    if (this.currentPlayers.length === 0) {
      this.resetPlayers();
    }

    const card = this.currentCards.splice(
      this.randomInt(this.currentCards.length),
      1,
    )[0];

    const player = this.currentPlayers.splice(
      this.randomInt(this.currentPlayers.length),
      1,
    )[0];

    return { card, player };
  }
}
