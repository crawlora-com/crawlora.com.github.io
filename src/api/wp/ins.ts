import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: "https://cms.crawlora.com/wp-json/"
})