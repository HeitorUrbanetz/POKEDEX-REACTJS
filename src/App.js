import React, { useEffect, useState } from 'react';
import './global.css';
import axios from 'axios';
import Pokemons from './components/Pokemons';
import Header from './components/Header';
import PokemonThumbmail from './components/PokemonThumbmail';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [pokemon, setPokemon] = useState('');
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonType, setPokemonType] = useState('');

  const [allPokemons, setAllPokemons] = useState([]);
  const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=20');

  const [show, setShow] = useState(false);



  const getAllPokemon = async () => {
    const res = await axios.get(loadMore);
    const data = await res.data;
  
    setLoadMore(data.next);
    
    const createPokemonObject = async (pokemon) => {
          pokemon.forEach( async (pokemon) => {
          const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
          setAllPokemons(currentList => [...currentList, res]); // get the current list, use the spread (take all elements before) and at the end of it put the new elements
        });
    };

    createPokemonObject(data.results);
  };


  useEffect(() => {
    getAllPokemon();
  }, []);

  // search only one pokemon
  const getPokemon = async() => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    const res = await axios.get(url);

    try {
      const pokemonArray = [];

      pokemonArray.push(res.data);
      setPokemonData(pokemonArray);
      setPokemonType(res.data.types[0].type.name);
      console.log(res)
      
    } catch(e) {

      console.log(e);

    };
  };


  const handleSubmit = (e) => {
    const input = document.querySelector('#inputID');
    e.preventDefault();

    if(input.value === '') {
      setShow(false);
      return
    };
    setShow(true);

    getPokemon();
    
  };

  const handleChange = (e) => {
    setPokemon(e.target.value.toLowerCase());
  };

  return(
    <div className='APP'>
      <div className='header-title'>
      <div>
          <form onSubmit={handleSubmit}>
         <Header handleChange={handleChange} pokemonsList={setAllPokemons}/>
          </form>
      </div>
      </div>

    <div className='content'>
      <div className='content-pokemons'>
          {
            show === true && pokemonData.map((data) => <Pokemons data={data} type={pokemonType} />)
          }

          <div className='all-pokemons'>
              {
                allPokemons.map((pokemon, index) => <PokemonThumbmail data={pokemon.data} key={index} id={pokemon.data.id} name={pokemon.data.name} image={pokemon.data.sprites.front_default} type={pokemon.data.types[0].type.name}/>)
              }
          </div> 
          
            <p style={{marginTop: '10px'}}>Made by Heitor Urbanetz</p>
      </div>

      </div>
    </div>
  )
};

export default App;
