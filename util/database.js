import * as SQLite from "expo-sqlite";
import { Place } from "../models/place";

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
  const result = await database.getAllAsync("SELECT * FROM places");

  const places = [];

  for (const dp of result) {
    places.push(
      new Place(dp.id, dp.title, dp.imageUri, {
        address: dp.address,
        lat: dp.lat,
        lng: dp.lng,
      })
    );
  }

  return places;
}

export async function fetchPlaceDetails(id) {
  const result = await database.getFirstAsync(
    "SELECT * FROM places WHERE id = ?",
    [id]
  );

  if (!result) {
    return null;
  }

  const place = new Place(result.id, result.title, result.imageUri, {
    address: result.address,
    lat: result.lat,
    lng: result.lng,
  });

  return place;
}
