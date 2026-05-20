import DEFAULT_DECK, { DEFAULT_CARDS } from "@/src/constants/default-deck";
import { SQLiteDatabase } from "expo-sqlite";

export async function seed(db: SQLiteDatabase) {
  console.log("[DB] Seeding default deck...");

  await db.withTransactionAsync(async () => {
    const result = await db.runAsync(
      "INSERT INTO decks (name) VALUES (?)",
      DEFAULT_DECK.name,
    );

    for (const card of DEFAULT_CARDS) {
      await db.runAsync("INSERT INTO cards (deck_id, content) VALUES (?, ?)", [
        result.lastInsertRowId,
        card.content,
      ]);
    }
  });

  console.log("[DB] ... Seeding complete");
}
