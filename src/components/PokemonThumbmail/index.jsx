import React, {useEffect, useState} from 'react';
import { ProgressBar } from 'react-bootstrap';
import {MdOutlineFavoriteBorder, MdOutlineFavorite} from 'react-icons/md';
import {GiHighGrass, GiPoisonBottle, GiPsychicWaves, GiGroundbreaker, GiStoneSphere, GiHighPunch, GiIceCube, GiFairyWand} from 'react-icons/gi';
import {ImFire} from 'react-icons/im';
import {IoWater} from 'react-icons/io5';
import {AiFillBug} from 'react-icons/ai';
import {MdPets} from 'react-icons/md';
import {BsLightningCharge} from 'react-icons/bs';
import {BiGhost} from 'react-icons/bi';
import Cookies from 'js-cookie';

import './style-thumb.css';

const PokemonThumbmail = ({data, id, name, image, type}) => {
  const [showAttributes, setShowAttributes] = useState(false);
  const [favorite, setFavorite] = useState(false);



  const savePokemon = () => {
    setFavorite(!favorite);
    Cookies.set(name, `${!favorite}`);
  };

  useEffect(() => {
      if(Cookies.get(name) === 'true') {
        return;
      };

      Cookies.remove(name); // remove all false
  }, [favorite]);


  return (
    <div>
        <div className='pokemom-thumb-container'>

            <div className='thumb-box'>
                    <div className='favourite-icon' onClick={savePokemon} style={{padding: '10px'}}>
                      {(Cookies.get(name) === 'false' || !Cookies.get(name)) ?
                             <MdOutlineFavoriteBorder style={{cursor: 'pointer', fontSize: '30px', color: '#F56A79'}}/>
                             : <MdOutlineFavorite style={{cursor: 'pointer', fontSize: '30px', color: '#F56A79'}}/>
                      }
                      </div>    


            <img src={image} alt={name} style={{transform: 'scale(1.5)'}} />

                <div className='thumb-details'>

                  <div className='pokemons-names'>
                    
                    <h1>{name[0].toUpperCase() + name.substring(1)}</h1>
                    <div className='thumb-id'><span>#{id >= 10 ? '' : '0'}{id}</span></div>

                  </div>
                    <p>Type: <span id="typePoke">
                      {type}
                    {type === 'grass' ? <GiHighGrass style={{ marginLeft: '5px', marginBottom: '5px', color: 'green', border: '1px solid green', borderRadius: '50%'}} /> : ''}
                    {type === 'fire' ? <ImFire  style={{ marginLeft: '5px', marginBottom: '5px', color: '#F56A79', border: '1px solid #F56A79', borderRadius: '50%'}}/> : ''}
                    {type === 'water' ? <IoWater  style={{ marginLeft: '5px', marginBottom: '5px', color: 'blue', border: '1px solid blue', borderRadius: '50%'}}/> : ''}
                    {type === 'bug' ? <AiFillBug  style={{ marginLeft: '5px', marginBottom: '5px', color: 'orange', border: '1px solid orange', borderRadius: '50%'}}/> : ''}
                    {type === 'normal' ? <MdPets  style={{ marginLeft: '5px', marginBottom: '5px', color: 'white', border: '1px solid white', borderRadius: '50%'}}/> : ''}
                    {type === 'electric' ? <BsLightningCharge  style={{ marginLeft: '5px', marginBottom: '5px', color: '#fcc419', border: '1px solid #fcc419', borderRadius: '50%'}}/> : ''}
                    {type === 'poison' ? <GiPoisonBottle  style={{ marginLeft: '5px', marginBottom: '5px', color: 'purple', border: '1px solid purple', borderRadius: '50%'}}/> : ''}
                    {type === 'ground' ? <GiGroundbreaker  style={{ marginLeft: '5px', marginBottom: '5px', color: 'brown', border: '1px solid brown', borderRadius: '50%'}}/> : ''}
                    {type === 'fairy' ? <GiFairyWand  style={{ marginLeft: '5px', marginBottom: '5px', color: 'pink', border: '1px solid pink', borderRadius: '50%'}}/> : ''}
                    {type === 'fighting' ? <GiHighPunch  style={{ marginLeft: '5px', marginBottom: '5px', color: 'red', border: '1px solid red', borderRadius: '50%'}}/> : ''}
                    {type === 'psychic' ? <GiPsychicWaves  style={{ marginLeft: '5px', marginBottom: '5px', color: 'black', border: '1px solid black', borderRadius: '50%'}}/> : ''}
                    {type === 'rock' ? <GiStoneSphere  style={{ marginLeft: '5px', marginBottom: '5px', color: 'gray', border: '1px solid gray', borderRadius: '50%'}}/> : ''}
                    {type === 'ghost' ? <BiGhost  style={{ marginLeft: '5px', marginBottom: '5px', color: 'black', border: '1px solid black', borderRadius: '50%'}}/> : ''}
                    {type === 'ice' ? <GiIceCube  style={{ marginLeft: '5px', marginBottom: '5px', color: '#0DCAF0', border: '1px solid #0DCAF0', borderRadius: '50%'}}/> : ''}

                     </span>
                    </p>
                </div>

                <button id="buttonAttr"type="button" onClick={() => setShowAttributes(!showAttributes)} style={{minWidth: '200px'}}>{showAttributes ? 'close attributes' : 'show attributes'}</button>
               
                {showAttributes && 
                        <div className='status-pokemon-mini'>
                            <div className='progress-bars-mini'>
                                  <h3>HP</h3>
                                  <ProgressBar  variant="success" className="bar" now={data.stats[0].base_stat} />
                            </div>
                            <div className='progress-bars-mini'>
                              <h3>ATTACK</h3>
                              <ProgressBar  variant="danger"  className="bar" now={data.stats[1].base_stat} />
                            </div>
                            <div className='progress-bars-mini'>
                              <h3>DEFENSE</h3>
                              <ProgressBar  variant="info" className="bar" now={data.stats[2].base_stat} />
                            </div>
                            <div className='progress-bars-mini'>
                              <h3>SPEED</h3>
                              <ProgressBar  variant="warning" className="bar" now={data.stats[3].base_stat} />
                            </div>
                        </div>
                }
            </div>
        </div>
    
    </div>
  )
}

export default PokemonThumbmail;