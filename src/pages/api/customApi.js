import axios from "axios"

const api =axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

const customApi = {
    get: async (url) => await api.request({method: "GET", url: url})
}

export default customApi 