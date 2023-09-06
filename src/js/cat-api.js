import axios from "axios"

axios.defaults.headers.common["x-api-key"] = "live_EwkjZUK3En2Yoij9vB5n4Ebg3dZ1XSbsjtmjkUxXGXLkfvuRYXjwDvhi9BdcueHu";
const baseURL = "https://api.thecatapi.com/v1/breeds";

const fetchBreeds = () => {
    return axios.get(baseURL)
        .then((response) => {
            const resData = response.data;
            return resData;
        })   
        .catch((error) => console.log(error))
};  

export const catsBreeds =  fetchBreeds().then((data) => { return data.map(()=>data.name) }).catch((err) => console.log(err));