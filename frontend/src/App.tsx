import axios from "axios";
import React, { useState } from "react";
import "./App.css";

function App() {
  const [pokemonName, setPokemonName] = useState("");

  const POKEMON_BASE_URL = "https://pokeapi.co/api/v2";

  const search = (): void => {
    axios.get(POKEMON_BASE_URL + "/pokemon/" + pokemonName).then((res) => {
      console.log(res.data);
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

      <div id="pokemon-result">This will show the result</div>
    </div>
  );
}

export default App;
