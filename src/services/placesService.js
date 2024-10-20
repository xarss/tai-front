import axios from "axios";

const BACKEND_URL = process.env.VUE_APP_BACKEND_URL;

export async function fetchPlaces(payload) {
  try {
    const response = await axios.post(`${BACKEND_URL}/getPlaces`, payload);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    throw error
  }
}

export async function fetchPlaceOverview(place) {
  try {
    const response = await axios.post(`${BACKEND_URL}/getPlaceOverview`, {
      place: place,
    });
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    throw error
  }
}

export async function fetchPlacePhoto(photoReference) {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/placePhoto?photoReference=${photoReference}`
    );
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    throw error
  }
}
