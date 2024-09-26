import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: "http://88.222.244.129:8082"
})