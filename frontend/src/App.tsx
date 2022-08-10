import axios from "axios";
import React, { useState } from "react";
import "./App.css";

import PokemonSearch from "./PokemonSearch";
import Employee from "./Employee";

function App() {
  return (
    <div>
      <PokemonSearch />
      <Employee />
    </div>
  );
}

export default App;
