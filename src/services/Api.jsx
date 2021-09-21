import axios from "axios";

const API_KEY = "22627688-af3fb051bb8ec0acdb27de44f";

export default function fetchImages(name, page) {
  const API = `https://pixabay.com/api/?q=${name}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;
  return axios.get(API).then((images) => {
    return images;
  });
}
