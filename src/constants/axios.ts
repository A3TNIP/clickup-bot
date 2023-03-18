import axios, { AxiosInstance } from 'axios';
import {env} from "../index";
import {BASE_CLICKUP_API_URL} from "./clickup-api";

// Replace YOUR_AUTH_TOKEN with your actual auth token
const AUTH_TOKEN = env.parsed!.CLICKUP_AUTH_TOKEN;

const axiosInstance: AxiosInstance = axios.create({
    baseURL: BASE_CLICKUP_API_URL,
    headers: {
        Authorization: `${AUTH_TOKEN}`,
    },
});

export default axiosInstance;
