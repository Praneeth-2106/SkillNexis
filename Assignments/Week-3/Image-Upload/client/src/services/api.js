import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5004",
});

export default API;