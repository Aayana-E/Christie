import logo from './logo.svg';
import './App.css';
import { useState, useEffect, use } from 'react';

function App() {
  const [pokemon1, setPokemon1] = useState(null);
  const [pokemon2, setPokemon2] = useState(null);

  //fetch data from single Pokemon by ID
  const fetchPokemon = async(id) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const data = await res.json();
    return{
      name: data.name,
      image: data.sprites.front_default,
      types: data.types.map(t => t.type.name),
    };
  };


  //get 2 random pokemon
useEffect(() => {
  const getTwoPokemon = async() => {
  const id1 = Math.floor(Math.random() * 898) + 1;
  let id2 = Math.floor(Math.random() * 898) + 1;
  //didnt make const so we can change if the same
  //checks to see if 2 people are the same
  //if they are then pick another

  while (id1 === id2) {
    id2 = Math.floor(Math.random() * 898) + 1;
  }

  const poke1 = await fetchPokemon(id1);
  const poke2 = await fetchPokemon(id2);

  setPokemon1(poke1);
  setPokemon2(poke2);

};

  getTwoPokemon();

  }, []);
  return (
    <div className="App">
      <h1>Pokemon Showdown (Better Version)</h1>
      <div className='pokemon-container'>
        {pokemon1 && (
          <div className='pokemon-card'>
            <h2>{pokemon1.name}</h2>
            <img src={pokemon1.image}alt="Pokemon whatever got pulled idk"></img>
            <p> Types: {pokemon1.types.join(", ")}</p>
          </div>
        )}

        <span className='vs'> VS</span>
        {pokemon2 && (
          <div className='pokemon-card'>
            <h2>{pokemon2.name}</h2>
            <img src={pokemon2.image}></img>
            <p> Types: {pokemon2.types.join(", ")}</p>
          </div>
        )}
      </div>

      
    </div>
  );
}

export default App;
