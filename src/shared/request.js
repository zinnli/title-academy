import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://54.180.26.228:8080",
});
