'use strict';
/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Homework/blob/main/3-UsingAPIs/Week2/README.md#exercise-2-gotta-catch-em-all

Complete the four functions provided in the starter `index.js` file:

`fetchData`: In the `fetchData` function, make use of `fetch` and its Promise 
  syntax in order to get the data from the public API. Errors (HTTP or network 
  errors) should be logged to the console.

`fetchAndPopulatePokemons`: Use `fetchData()` to load the pokemon data from the 
  public API and populate the `<select>` element in the DOM.
  
`fetchImage`: Use `fetchData()` to fetch the selected image and update the 
  `<img>` element in the DOM.

`main`: The `main` function orchestrates the other functions. The `main` 
  function should be executed when the window has finished loading.

Use async/await and try/catch to handle promises.

Try and avoid using global variables. As much as possible, try and use function 
parameters and return values to pass data back and forth.
------------------------------------------------------------------------------*/
async function fetchData(url) {
  const response = await fetch(url);
  const data = response.json();
  if (!response.ok) {
    throw new Error('Request failed!');
  }
  return await data;
}

function fetchAndPopulatePokemons() {
  const choosePokemonButton = document.createElement('button');
  choosePokemonButton.type = 'button';
  choosePokemonButton.textContent = 'Get Pokemon!';
  choosePokemonButton.classList.add('button');
  document.body.appendChild(choosePokemonButton);


  const selectPokemon = document.createElement('select');
  selectPokemon.classList.add('select');
  document.body.appendChild(selectPokemon);

  let data = 0;
  const publicApi = 'https://pokeapi.co/api/v2/pokemon?limit=151';

  choosePokemonButton.addEventListener('click',async()=>{
    try {
      data= await fetchData(publicApi);
    }catch(error){
      console.error(error.message)
    }

    const results = data.results;
    for( const pokemon of results){
      const option = document.createElement('option');
      option.textContent = pokemon.name;
      option.value = results.indexOf(pokemon)+1;
      selectPokemon.appendChild(option)
    }
  });
  selectPokemon.addEventListener('change',fetchImage )
}

async function fetchImage(value) {
  const removeImage = document.querySelector('img');
  if (removeImage) {
    removeImage.remove();
  }
  const data = `https://pokeapi.co/api/v2/pokemon/${value.currentTarget.value}`;
  const select = document.querySelector('select');
  try{
    if (select) {
      const getData = await fetchData(data);
      const image = document.createElement('img');
      image.alt = 'Selected Pokemon Image';
      image.src = getData.sprites.other.home.front_default;
      image.classList.add('pokemon-image');
      document.body.appendChild(image);
    }
}catch(error){
  console.log(error)
}}

async function main() {
  try {
const url= 'https://pokeapi.co/api/v2/pokemon?limit=80';
fetchAndPopulatePokemons(url)
  }catch(error) {
    console.log(error)
  }}

window.addEventListener('load', main);