import axios from "axios";
axios.defaults.baseURL = "https://pixabay.com";
axios.defaults.params = {
  key: "22627688-af3fb051bb8ec0acdb27de44f",
  image_type: "photo",
};

export default async function fetchImages(name, page) {
  const API = `/api/?q=${name}&page=${page}&orientation=horizontal&per_page=12`;
  const {
    data: { hits },
  } = await axios.get(API);
  return hits;
}
