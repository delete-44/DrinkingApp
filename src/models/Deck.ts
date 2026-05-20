import { CardRepository } from "../repositories/CardRepository";
import { TDeckData } from "../types";
import { Card } from "./Card";

export class Deck {
  readonly id: number;
  name: string;
  created_at: string;
  updated_at: string;

  constructor({ id, name, created_at, updated_at }: TDeckData) {
    this.id = id;
    this.name = name;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  cards(): Card[] {
    const resp = CardRepository.index(this.id);

    return resp.payload;
  }

  toJson(): TDeckData {
    return {
      id: this.id,
      name: this.name,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }

  static fromJson(jsonData: TDeckData): Deck {
    return new Deck(jsonData);
  }
}
