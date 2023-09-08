import axios from "axios"
import { Notify } from 'notiflix/build/notiflix-notify-aio';

axios.defaults.headers.common["x-api-key"] = "live_EwkjZUK3En2Yoij9vB5n4Ebg3dZ1XSbsjtmjkUxXGXLkfvuRYXjwDvhi9BdcueHu";
const baseURL = "https://api.thecatapi.com/v1/breeds";
const imageURL = "https://api.thecatapi.com/v1/images/search"   

const apiCats = {
    fetchBreeds () {
        return axios.get(baseURL)
            .then((response) => {
                if (response) {
                    const resData = response.data;
                    console.log(resData);
                    return resData;
                }
            })
            .catch((error) => Notify.failure(error.message))
    },

    fetchCatByBreed (breedId) {
        const param = {
            limit: 1,
            breed_ids: breedId,
        }
        return axios.get(imageURL, { params: param })
            .then((response) => {
                if (response) {
                    console.log(response.data[0])
                    return response.data[0];
                }
            })
            .catch((error) => Notify.failure(error.message))
    },
};

export default apiCats;