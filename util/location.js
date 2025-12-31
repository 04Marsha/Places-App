const MAP_API_KEY = "221210bc95a145feb57fe33ed0c39199";

export function getMapPreview(lat, lng) {
  const zoom = 14;
  const width = 400;
  const height = 200;

  const imagePreviewUrl = `https://maps.geoapify.com/v1/staticmap?style=osm-carto&width=${width}&height=${height}&center=lonlat:${lng},${lat}&zoom=${zoom}&marker=lonlat:${lng},${lat};color:%23ff0000;size:medium&apiKey=${MAP_API_KEY}`;

  return imagePreviewUrl;
}

export async function getAddress(lat, lng) {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;
  // const response = await fetch(url);
  const response = await fetch(url, {
    headers: {
      "User-Agent": "place-app",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch address!");
  }

  const data = await response.json();
  const address = data.display_name;
  return address;
}
