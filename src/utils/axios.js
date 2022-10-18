import axios from "axios";
import { BASE_URL } from "../env";

let instance

const getAxiosInstance = () => {
    if(!instance) {
        instance = axios.create({
            baseURL: BASE_URL,
            timeout: 30000
        });
    }
    return instance
}

export { getAxiosInstance }