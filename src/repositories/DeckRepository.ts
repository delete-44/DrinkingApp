import { Deck } from "../models/Deck";
import { TDeckData, TRepositoryResponse } from "../types";
import { BaseRepository } from "./BaseRepository";

export type DeckPermittedFields = Pick<TDeckData, "name" | "updated_at">;

export class DeckRepository extends BaseRepository {
  static async index(): Promise<TRepositoryResponse<Deck>> {
    try {
      const result: TDeckData[] = await this.db.getAllAsync(
        "SELECT * FROM decks",
      );

      return {
        ok: true,
        payload: result,
      };
    } catch (e: any) {
      console.log("Error loading Decks:", e.message);

      return {
        ok: false,
        message: "Error loading Decks",
      };
    }
  }

  static async find(id: number): Promise<TRepositoryResponse<Deck>> {
    try {
      const result: TDeckData | null = await this.db.getFirstAsync(
        "SELECT * FROM decks WHERE id=?",
        id,
      );

      if (!result) {
        return {
          ok: false,
          message: `Deck ${id} not found`,
        };
      }

      return {
        ok: true,
        payload: result,
      };
    } catch (e: any) {
      console.log("Error loading Decks:", e.message);

      return {
        ok: false,
        message: "Error loading Decks",
      };
    }
  }

  static async create({
    name,
  }: DeckPermittedFields): Promise<TRepositoryResponse<Deck>> {
    try {
      const result = await this.db.runAsync(
        `INSERT INTO decks ("name") VALUES (?)`,
        name,
      );

      return {
        ok: true,
        payload: {
          id: result.lastInsertRowId,
          name,
        },
      };
    } catch (e: any) {
      console.log("Error creating Deck:", e.message);

      return {
        ok: false,
        message: "Error creating Deck",
      };
    }
  }
}
