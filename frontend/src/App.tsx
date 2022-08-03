import axios from "axios";
import React, { useState } from "react";
import { Pokemon } from "pokenode-ts";
import { IconButton, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "./App.css";

function App() {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonInfo, setPokemonInfo] = useState<undefined | Pokemon>(
    undefined
  );

  const POKEMON_BASE_URL = "https://pokeapi.co/api/v2";

  const search = (): void => {
    pokemonName === ""
      ? alert("Please enter pokemon name")
      : axios
          .get(POKEMON_BASE_URL + "/pokemon/" + pokemonName)
          .then((res) => {
            setPokemonInfo(res.data);
          })
          .catch((err) => {
            console.log("Pokemon not found");
            setPokemonInfo(undefined);
          });
  };

  return (
    <div className="App">
      <h1>Pokemon Search</h1>

      <div>
        <TextField
          id="search-bar"
          className="text"
          value={pokemonName}
          onChange={(prop: any) => {
            setPokemonName(prop.target.value);
          }}
          label="Enter a Pokémon Name..."
          variant="outlined"
          placeholder="Search..."
          size="small"
        />
        <IconButton
          aria-label="search"
          onClick={() => {
            search();
          }}
        >
          <SearchIcon style={{ fill: "blue" }} />
        </IconButton>
      </div>

      <p>You have entered {pokemonName}</p>

      {pokemonInfo === undefined ||
      pokemonInfo.sprites.other.dream_world.front_default === null ? (
        <p>Pokemon not found</p>
      ) : (
        <div id="pokemon-result">
          <img src={pokemonInfo.sprites.other.dream_world.front_default} />
          <p>Pokemon ID: {pokemonInfo.id}</p>
          <p>Name: {pokemonInfo.name}</p>
          <p>Height: {pokemonInfo.height / 10}m</p>
          <p>Weight: {pokemonInfo.weight / 10}kg</p>
        </div>
      )}
    </div>
  );
}

export default App;
