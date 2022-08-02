import axios from "axios";
import React, { useState } from "react";
import "./App.css";

function App() {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonInfo, setPokemonInfo] = useState<undefined | any>(undefined);

  const POKEMON_BASE_URL = "https://pokeapi.co/api/v2";

  const search = (): void => {
    pokemonName === ""
      ? alert("Please enter pokemon name")
      : axios.get(POKEMON_BASE_URL + "/pokemon/" + pokemonName).then((res) => {
          setPokemonInfo(res.data);
        });
  };

  return (
    <div className="App">
      <h1>Pokemon Search</h1>

      <div>
        <label>Pokemon Name</label> <br />
        <input
          type="text"
          id="pokemon-name"
          name="pokemon-name"
          onChange={(e) => setPokemonName(e.target.value)}
        />
        <br />
        <button onClick={search}>Search</button>
      </div>

      <p>You have entered {pokemonName}</p>
      {pokemonInfo === undefined ? (
        <p>Pokemon not found</p>
      ) : (
        <div id="pokemon-result">
          <img src={pokemonInfo.sprites.other.dream_world.front_default} />
        </div>
      )}
    </div>
  );
}

export default App;
