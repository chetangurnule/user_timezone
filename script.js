let obj = {
  "name of time zone": null,
  lat: null,
  long: null,
  "Offset STD": null,
  "Offset STD Seconds": null,
  "Offset DST": null,
  "Offset DST Seconds": null,
  Country: null,
  Postcode: null,
  City: null,
};

const API_KEY = "";

const fetchUserData = async function (lat, lon) {
  const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${API_KEY}`;
  let res = await fetch(url);
  let data = await res.json();
  return data.features[0].properties;
};

let setProps = function (data) {
  // const {county, lat, lon, country, postcode, timezone : {name, offset_DST, offset_DST_seconds, offset_STD, offset_STD_seconds }} = data;
  let keysArr = Object.keys(obj);
  for (let keys of keysArr) {
    obj[keys] = data[keys];
  }
  console.log(obj);
};

// Check if geolocation is supported by the browser
if ("geolocation" in navigator) {
  // Prompt user for permission to access their location
  navigator.geolocation.getCurrentPosition(
    // Success callback function
    async (position) => {
      // Get the user's latitude and longitude coordinates
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      // Do something with the location data, e.g. display on a map
      const data = await fetchUserData(lat, lng);
      console.log(data);
      setProps(data);
    },
    // Error callback function
    (error) => {
      // Handle errors, e.g. user denied location sharing permissions
      console.error("Error getting user location:", error);
    }
  );
} else {
  // Geolocation is not supported by the browser
  console.error("Geolocation is not supported by this browser.");
}
