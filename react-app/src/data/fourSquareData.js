import { clientId, clientSecret } from "../data/clientInfo.js";

const categories = [
  { key: "food", value: "4d4b7105d754a06374d81259" },
  { key: "museum", value: "4bf58dd8d48988d181941735" },
  { key: "publicArt", value: "507c8c4091d498d9fc8c67a9" },
  { key: "bar", value: "4bf58dd8d48988d116941735" },
  { key: "hotel", value: "4bf58dd8d48988d1fa931735" },
  { key: "office", value: "4bf58dd8d48988d124941735" },
  { key: "library", value: "4bf58dd8d48988d12f941735" },
  { key: "cultural center", value: "52e81612bcbc57f1066b7a32" },
  { key: "vegetarian-vegan-restaurant", value: "4bf58dd8d48988d1d3941735" }
];

// create category id array:
const categoryId = categories.map(value => {
  return value.value;
});

// create category key array
export const categoryName = categories.map(key => {
  return key.key;
});

const fourSquareUrl = "https://api.foursquare.com/v2/venues/";
const versionDate = 20181212;

export const getFourSquareVenues = centerMap => {
  const urlRequest = `${fourSquareUrl}search?ll=${centerMap.lat},${
    centerMap.long
  }&client_id=${clientId}&client_secret=${clientSecret}&versionDate=${versionDate}&categoryId=${categoryId}&radius=1650&limit=60`;
  return fetch(urlRequest)
    .then(response => {
      return response.json();
    })
    .then(data => {
      const venues = data.response.venues.filter(
        venue => venue.location.city && venue.location.address
      );
      console.log(venues);
      return venues;
    });
};
