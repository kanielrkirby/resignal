import Database from "tauri-plugin-sql-api";
import { $dbLocation } from "@store/db";

let db: Database | undefined = undefined;

export default db;

export async function initDb(file: string, key: string) {
  try {
    db = await Database.load(`sqlite://${file}?key=${key}`);
    $dbLocation.set(file)
  } catch (error) {
    console.error("An error occurred:", error);
  }
}
