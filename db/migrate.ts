import { type SQLiteDatabase } from "expo-sqlite";
import { allMigrations } from "./migrations";
import { TDatabaseMigration } from "./migrations/TDatabaseMigration";
import { seed } from "./seed";

export async function migrate(
  db: SQLiteDatabase,
  migrations: TDatabaseMigration[] = allMigrations,
) {
  let pragmaUserVersion = await db.getFirstAsync<{
    user_version: number;
  }>("PRAGMA user_version");

  const startingDbVersion = pragmaUserVersion?.user_version || 0;
  let currentDbVersion = startingDbVersion;

  console.log("[DB] Initialising DB at version:", currentDbVersion);

  const pendingMigrations = migrations.slice(currentDbVersion);
  for (let i = 0; i < pendingMigrations.length; i++) {
    const migration = pendingMigrations[i];

    try {
      console.log("[DB] Executing Migration:", migration.name);

      await db.withTransactionAsync(async () => await migration.up(db));

      // +1: SQL indices start at 1, JS at 0
      currentDbVersion = currentDbVersion + 1;
    } catch (e: any) {
      console.error("[DB] Initialisation Failed:", e.message);

      break;
    }
  }

  if (startingDbVersion === 0) {
    // Load default deck into the DB if this is users first run
    await seed(db);
  }

  await db.execAsync(`PRAGMA user_version = ${currentDbVersion}`);

  console.log("[DB] Initialisation complete. DB at version:", currentDbVersion);
}
