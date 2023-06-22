import axios from "axios";

const instance = axios.create({
  baseURL: "https://sehatchain.vercel.app/api"
});

export default instance;
