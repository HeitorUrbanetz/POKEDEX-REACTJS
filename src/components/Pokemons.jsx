import React, { useEffect } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import './Pokemons.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Pokemons = ({data, type}) => {

  useEffect(() => {
    getAbilities();
  }, []);

  useEffect(() => {
    changeBackgroundColor();
    console.log(data)
  }, [type])

  const getAbilities = () => {
    const abilities = [];

    for(let i = 0, max = data.abilities.length; i < max; i++) {
      abilities.push(
      <li>
       - {data.abilities[i].ability.name.toUpperCase()}
      </li>
      );
    }

    return abilities;
  };

  const changeBackgroundColor = () => {
    const background = document.querySelector('.pokemon-box');

    switch(type){
      case 'electric':
        background.style.backgroundColor = '#FFFF00';
        background.style.color = '#444';
      break;
      case 'fire':
        background.style.backgroundColor = '#ff6b6b';
        background.style.color = '#fff';
      break;
      case 'grass':
        background.style.backgroundColor = '#8ce99a';
        background.style.color = '#fff';
      break;
      case 'water':
        background.style.backgroundColor = '#66d9e8';
        background.style.color = '#fff';
      break;
      case 'normal':
        background.style.backgroundColor = '#fff';
        background.style.border = '1px solid #333';
        background.style.color = '#444';
      break;
      default:
        background.style.backgroundColor = '#fff';
        background.style.border = '1px solid #333';
        background.style.color = '#444';
      break;
    };
  };


  return (
    <div className='container-pokemons'>

      <div className='pokemon-box'>

      <div className='left'>
          <div>
            <div className='pokemon-info'>
              <div className='pokemon-name'>
                <h3>NAME: {data.name.toUpperCase()}</h3>
  
              </div>
              <div className='pokemon-sprite'>
                <img src={data.sprites["front_default"]} height="200px"alt={data.name}/>
              </div>
              <div className='pokemon-type'>
                <h3>TYPE: {type.toUpperCase()}</h3>
              </div>
            </div>
          </div>
      </div>

<div className='middle-content'>
    <div className='middle'>
      <div className='other-infos'>
          <h1>ABILITIES:</h1>

          <ul style={{listStyle: 'none'}}>
            {getAbilities()}
          </ul>
        </div>
      </div>

        
        <div className='status-pokemon'>
          <div className='progress-bars'>
            <h3>HP</h3>
            <ProgressBar  variant="success" className="bar" now={data.stats[0].base_stat} />
          </div>
          <div className='progress-bars'>
            <h3>ATTACK</h3>
            <ProgressBar  variant="danger"  className="bar" now={data.stats[1].base_stat} />
          </div>
          <div className='progress-bars'>
            <h3>DEFENSE</h3>
            <ProgressBar  variant="info" className="bar" now={data.stats[2].base_stat} />
          </div>
          <div className='progress-bars'>
            <h3>SPEED</h3>
            <ProgressBar  variant="warning" className="bar" now={data.stats[3].base_stat} />
          </div>
        </div>
  
    </div>

      </div>

    </div>
  )
}

export default Pokemons;