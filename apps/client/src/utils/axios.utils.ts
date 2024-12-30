import axios from 'axios';
import {SERVER_URL} from "../constants/config.constant.ts";

const axiosInstance = axios.create({
    baseURL: SERVER_URL,
});


export default axiosInstance;