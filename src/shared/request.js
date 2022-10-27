import axios from "axios";

export const axiosInstance = axios.create({
     baseURL: "https://54.180.26.228:8080",
});

// axiosInstance.defaults.headers.common["Authorization"] = USER_TOKEN;
