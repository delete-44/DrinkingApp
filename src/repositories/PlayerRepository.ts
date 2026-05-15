import { Player } from "../models/Player";
import { TPlayerData, TRepositoryResponse } from "../types";
import { BaseRepository } from "./BaseRepository";

export type PlayerPermittedFields = Pick<TPlayerData, "name">;

export class PlayerRepository extends BaseRepository {
  static async index(): Promise<TRepositoryResponse<Player>> {
    try {
      const result: TPlayerData[] = await this.db.getAllAsync(
        "SELECT * FROM players",
      );

      return {
        ok: true,
        payload: result,
      };
    } catch (e: any) {
      console.log("Error loading Players:", e.message);

      return {
        ok: false,
        message: "Error loading Players",
      };
    }
  }

  static async create({
    name,
  }: PlayerPermittedFields): Promise<TRepositoryResponse<Player>> {
    try {
      const result = await this.db.runAsync(
        `INSERT INTO players ("name") VALUES (?)`,
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
      console.log("Error creating Player:", e.message);

      return {
        ok: false,
        message: "Error creating Player",
      };
    }
  }

  static async delete(id: number): Promise<TRepositoryResponse<Player>> {
    try {
      const result = await this.db.runAsync(
        `DELETE FROM players WHERE id=?`,
        id,
      );

      return {
        ok: true,
        payload: {
          id: result.lastInsertRowId,
        },
      };
    } catch (e: any) {
      console.log("Error deleting Player:", e.message);

      return {
        ok: false,
        message: "Error deleting Player",
      };
    }
  }
}
