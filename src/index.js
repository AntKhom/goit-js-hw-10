// import { catsBreeds } from "./js/cat-api";

// console.log(catsBreeds);

import axios from "axios"

axios.defaults.headers.common["x-api-key"] = "live_EwkjZUK3En2Yoij9vB5n4Ebg3dZ1XSbsjtmjkUxXGXLkfvuRYXjwDvhi9BdcueHu";
const baseURL = "https://api.thecatapi.com/v1/breeds";
const imageURL = "https://api.thecatapi.com/v1/images/search"

const catsSelector = document.querySelector('.breed-select');

const fetchBreeds = () => {
    return axios.get(baseURL)
        .then((response) => {
            const resData = response.data;
            console.log(resData);
            return resData;
        })   
        .catch((error) => console.log(error))
};  

const fetchCatByBreed = (breedId) => {
    const param = {
        breed_ids: breedId,
    }
    return axios.get(imageURL, { params: param })
        .then((response) => {
            console.log(response.data)
            return response.data;
    })
        .catch((error) => console.log(error))
}

fetchBreeds()
    .then((data) => {
        const nameCats = data
            .map((arr) => `<option value="${arr.id}">${arr.name}</option>`)
            .join('');
        catsSelector.innerHTML=nameCats;
    })
    .catch((err) => console.log(err));

fetchCatByBreed('abys')
    .then((data) => {
        console.log(data);        
    })
    .catch((err) => console.log(err));
// class App extends Component {

//   getBreeds() {
//       const res = axios('/breeds');
//       return res.data;
//   }
//   getCatsImagesByBreed(breed_id) {
//       const res = axios('/images/search?breed_ids='+breed_id);
      
//       console.table(res.data)
//       return res.data;
//   }

//   loadBreedImages() {
//     console.log('Load Breed Images:', this.state.selected_breed)

//     let breed_images = this.getCatsImagesByBreed(this.state.selected_breed, 5)

//     this.setState({ images: breed_images });
//   }

//   constructor(...args) {

//       super(...args);
//       this.state = {
//         images: [],
//         breeds: [], 
//         selected_breed: 0
//       };

//     this.onBreedSelectChange = this.onBreedSelectChange.bind(this);
//   }
//   onBreedSelectChange(e) {
//     console.log("Breed Selected. ID:",e.target.value)
//     this.setState({selected_breed:e.target.value});
//     this.loadBreedImages();
//   }
//   componentDidMount() {
//       if (this.state.breeds.length===0) {
//           (() => {
//               try {
//                   this.setState({breeds: this.getBreeds()});
//               } catch (e) {
//                   //...handle the error...
//                   console.error(e)
//               }
//           })();
//       }
//   }
//   render() {
//       return (
//         <div>

//       <select value={this.state.selected_breed} 
//               onChange={this.onBreedSelectChange}>
//         {this.state.breeds.map((breed) => <option key={breed.id} value={breed.id}>{breed.name}</option>)}
//       </select>

//       <div>
//      {this.state.images.map((image) => <img className="cat-image" alt="" src={image.url}></img>)}
//      </div>

//      </div>
//       );
//   }
// }

// export default App;









//     // const url = `https://api.thecatapi.com/v1/breeds`;
//     // const api_key = "live_EwkjZUK3En2Yoij9vB5n4Ebg3dZ1XSbsjtmjkUxXGXLkfvuRYXjwDvhi9BdcueHu"
// let storedBreeds = [];

// 
// const catInfo = document.querySelector('.cat-info');

// fetch(url,{headers: {
//       'x-api-key': api_key
//     }})
// .then((response) => {
//    return response.json();
//  })
// .then((data) => {
//     console.log(data);
//    //filter to only include those with an `image` object
//     data = data.filter(img=> img.image?.url!=null)
    
//     storedBreeds = data;
   
//     for (let i = 0; i < storedBreeds.length; i++) {
//         const breed = storedBreeds[i];
//         let option = document.createElement('option');
//         //skip any breeds that don't have an image
//         if(!breed.image)continue
     
//         //use the current array index
//         option.value = i;
//         option.innerHTML = `${breed.name}`;
//         catSelector.appendChild(option);
//     }
//    //show the first breed by default
//     createMarkupHandler(12, catInfo);
//    showBreedImage(0)
// })
// .catch(function(error) {
//    console.log(error);
// });


// const createMarkupHandler=(i, container)=> {
//     markup = `
//     <div><img class=breed-image src='${storedBreeds[i].image.url}'/></div>
//     <div><h2 class=breed-name>${storedBreeds[i].name}</h2>
//     <p></p>
//     <p>Temperament:<span class=breed-temperament>${storedBreeds[i].temperament}</span></p></div>
//     `
//     container.innerHTML = markup;
// }


// function showBreedImage(index)
// { 
//   document.getElementById("breed_image").src= storedBreeds[index].image.url;
//   document.getElementById("breed_json").textContent= storedBreeds[index].temperament
//   document.getElementById("wiki_link").href= storedBreeds[index].wikipedia_url
//   document.getElementById("wiki_link").innerHTML= storedBreeds[index].wikipedia_url
// }
