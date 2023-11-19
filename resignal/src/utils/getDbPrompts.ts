import { open } from '@tauri-apps/api/dialog';
import { readBinaryFile } from '@tauri-apps/api/fs';
import { $dbLocation, $dbKey } from '@store/db';

export async function getDbLocationPrompt() {
  try {
    const path = await open({
      filters: [
        { name: 'SQLite Database', extensions: ['db', 'sqlite', 'sqlite3'] },
      ],
      multiple: false,
      directory: false,
    }) as string;

    if (!path) {
      throw new Error('No file selected');
    }
    $dbLocation.set(path);
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

export async function getDbKeyPrompt() {
  try {
    const path = await open({
      filters: [
        { name: 'SQLite Database', extensions: ['db', 'sqlite', 'sqlite3'] },
      ],
      multiple: false,
      directory: false,
    }) as string;

    if (!path) {
      throw new Error('No file selected');
    }
    const res = await readBinaryFile(path);
    if (!res) {
      throw new Error('No file selected');
    }
    const json = new TextDecoder().decode(res);
    const config = JSON.parse(json);
    $dbKey.set(config.key);
  } catch (error) {
    console.error('An error occurred:', error);
  }
}
