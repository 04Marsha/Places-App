import * as SQLite from "expo-sqlite";

let database;

export async function init() {
  database = await SQLite.openDatabaseAsync("places.db");

  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS places (
      id INTEGER PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      imageUri TEXT NOT NULL,
      address TEXT NOT NULL,
      lat REAL NOT NULL,
      lng REAL NOT NULL
    );
  `);
}

export async function insertPlace(place) {
  const result = await database.runAsync(
    `INSERT INTO places (title, imageUri, address, lat, lng)
     VALUES (?, ?, ?, ?, ?)`,
    [
      place.title,
      place.imageUri,
      place.address,
      place.location.lat,
      place.location.lng,
    ]
  );

  return result;
}

export async function fetchPlaces() {
  const places = await database.getAllAsync(
    `SELECT * FROM places ORDER BY id DESC`
  );

  return places;
}
