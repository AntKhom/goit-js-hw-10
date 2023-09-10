import apiCats from "./js/cat-api";

import SlimSelect from 'slim-select'
import { Loading } from 'notiflix/build/notiflix-loading-aio';

//css
import "./css/slimselect.css"


const catsSelector = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const messageLoader = document.querySelector('.loader');
const messageError = document.querySelector('.error')

const changeVisibility = (item) => {
    item.classList.toggle("invisible");
};

const createListNameCats = (data) => {
    if (!data) {
        return;
    }
    const nameCats = data
        .map((arr) => `<option value="${arr.id}">${arr.name}</option>`)
        .join('');
    catsSelector.innerHTML = nameCats;
    new SlimSelect({
        select: '.breed-select',
    });
};

apiCats.fetchBreeds()
    .then((data) => {
        createListNameCats(data);
    })
    .catch((err) => {
        console.log(err);
        changeVisibility(catInfo);
        changeVisibility(messageError);
    });


const choiseCatHandler = (e) => {
    //console.log(e.target.value); 
    const catId = e.target.value;
    catInfo.classList.add("invisible");
    messageError.classList.add("invisible") 
    Loading.circle(messageLoader.textContent);
    apiCats.fetchCatByBreed(catId)
        .then((dataCat) => {
            console.log(dataCat.breeds[0]);
            //changeVisibility(messageLoader);
            Loading.remove();
            changeVisibility(catInfo);
            renderCatInfo(dataCat, catInfo);
        })
        .catch((err) => {
            console.log(err);
            catInfo.classList.add("invisible");
            messageError.classList.remove("invisible")   
            Loading.remove();
        });
}


const renderCatInfo = (item, container) => {
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


