import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_FEATURES_API_URL as string,
});

export default instance;
