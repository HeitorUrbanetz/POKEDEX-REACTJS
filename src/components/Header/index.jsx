import React, { useState } from 'react';
import './style.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../images/pokemon-logo-9.png';



const Header = ({handleChange, pokemonsList}) => {

  const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=20');

  

  const getAllPokemon = async () => {
    const res = await axios.get(loadMore);
    const data = await res.data;
  
    setLoadMore(data.next);

    toast.success('Pokemons Loaded!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      className: 'bg-black',
      bodyClassName: "text-white"
      });

    const createPokemonObject = async (pokemon) => {
          pokemon.forEach( async (pokemon) => {
          const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
          pokemonsList(currentList => [...currentList, res]); // get the current list, use the spread (take all elements before) and at the end of it put the new elements
        });
    };

    createPokemonObject(data.results);
  };


  return (
    <div className='header'>
      <a href='https://github.com/HeitorUrbanetz' rel="noreferrer" target="_blank">
        <img src={logo} alt="pokemon"  className="photo"/>
      </a>
      <div className='right-contents-header'>
        <input autoComplete="off" spellCheck="false" id="inputID" placeholder="Search your pokemon!" type="text" onChange={handleChange}/>
        <ToastContainer />
        <div className='buttons-header-right'>
            <button id="bR1" type="submit">SEARCH</button>
            <button  id="bR2" onClick={getAllPokemon}>LOAD MORE!</button>
        </div>

      </div>
    </div>
  )
}

export default Header;