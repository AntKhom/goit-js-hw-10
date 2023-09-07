// import { catsBreeds } from "./js/cat-api";

// console.log(catsBreeds);

import axios from "axios"
import SlimSelect from 'slim-select'

import "./css/slimselect.css"



axios.defaults.headers.common["x-api-key"] = "live_EwkjZUK3En2Yoij9vB5n4Ebg3dZ1XSbsjtmjkUxXGXLkfvuRYXjwDvhi9BdcueHu";
const baseURL = "https://api.thecatapi.com/v1/breeds";
const imageURL = "https://api.thecatapi.com/v1/images/search"

const catsSelector = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const messageLoader = document.querySelector('.loader');
const messageError = document.querySelector('.error')

const changeVisibility = (item) => {
    item.classList.toggle("invisible");
};
changeVisibility(messageError);
changeVisibility(messageLoader);

const fetchBreeds = () => {
    return axios.get(baseURL)
        .then((response) => {
            const resData = response.data;
            console.log(resData);
            return resData;
        })   
        .catch((error) => console.log(error))
};  

fetchBreeds()
    .then((data) => {
        const nameCats = data
            .map((arr) => `<option value="${arr.id}">${arr.name}</option>`)
            .join('');
        catsSelector.innerHTML = nameCats;
        new SlimSelect({
            select: '.breed-select',
        });
    })
    .catch((err) => {
        console.log(err)
        changeVisibility(messageError);
    });

const fetchCatByBreed = (breedId) => {
    const param = {
        limit: 1,
        breed_ids: breedId,
    }
    return axios.get(imageURL, { params: param })
        .then((response) => {
            console.log(response.data[0])
            return response.data[0];
    })
        .catch((error) => console.log(error))
}


const choiseCatHandler = (e) => {
    console.log(e.target.value); 
    const catId = e.target.value;
    changeVisibility(messageLoader);
    fetchCatByBreed(catId)
    .then((dataCat) => {
        console.log(dataCat.breeds[0]);
        changeVisibility(messageLoader);
        createMarkup(dataCat, catInfo);
    })
        .catch((err) => {
            console.log(err);
            changeVisibility(messageError);
        });
}





const createMarkup = (item, container) => {
    const markup = 
    `
    <div><img class=breed-image src='${item.url}' alt='foto ${item.breeds[0].name}' width=100%/></div>
    <div>
    <h2 class=breed-name>${item.breeds[0].name}</h2>
    <p class=breed-description>${item.breeds[0].description}</p>
    <p><span class=breed-temperament>Temperament: </span>${item.breeds[0].temperament}</p>
    </div>
    `
    container.innerHTML = markup;    
}




catsSelector.addEventListener('change',choiseCatHandler)


