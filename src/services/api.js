import axios from "axios";

const api = axios.create({
    baseURL: "https://fitnessapi-cabanisan-2.onrender.com"
});

export default api;