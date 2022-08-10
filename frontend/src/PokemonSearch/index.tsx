import axios from "axios";
import React, { useState } from "react";
import { Pokemon } from "pokenode-ts";
import { Table, TableCell, TableRow, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Button, Grid, Paper, Skeleton } from "@mui/material";

const PokemonSearch = (): JSX.Element => {
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
    console.log(pokemonInfo);
  };

  function getBackColor(poke: Pokemon | undefined | null) {
    let backColor = "#EEE8AA";
    if (poke === undefined || poke === null) {
      return backColor;
    }
    const pokeTypes = poke.types.map((i) => i.type.name);
    if (pokeTypes.includes("fire")) {
      backColor = "#FEC5BB";
    } else if (pokeTypes.includes("grass")) {
      backColor = "#80FFDB";
    } else if (pokeTypes.includes("water")) {
      backColor = "#DFE7FD";
    } else if (pokeTypes.includes("bug")) {
      backColor = "#B0DEA3";
    } else if (pokeTypes.includes("normal")) {
      backColor = "#E0FFFF";
    } else if (pokeTypes.includes("electric")) {
      backColor = "#D8E2DC";
    } else if (pokeTypes.includes("ground")) {
      backColor = "#FAD2E1";
    } else if (pokeTypes.includes("fairy")) {
      backColor = "#FFF1E6";
    } else if (pokeTypes.includes("ghost")) {
      backColor = "#F8EDEB";
    } else if (pokeTypes.includes("fighting")) {
      backColor = "#F1FAEE";
    } else if (pokeTypes.includes("rock")) {
      backColor = "#A8DADC";
    }
    return backColor;
  }

  function getTypes() {
    if (pokemonInfo !== undefined && pokemonInfo !== null) {
      return pokemonInfo.types.map((item) => item.type.name);
    }
  }

  function getAbilities() {
    if (pokemonInfo !== undefined && pokemonInfo !== null) {
      return pokemonInfo.abilities.map((ability) => ability.ability.name);
    }
  }

  return (
    <div>
      <h1>Pokemon Search</h1>

      <div className="search-field">
        <div style={{ display: "flex", justifyContent: "center" }}>
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
            size="medium"
          />
          <Button
            aria-label="search"
            onClick={() => {
              search();
            }}
          >
            <SearchIcon style={{ fill: "blue" }} />
          </Button>
        </div>
      </div>

      {/* <p>You have entered {pokemonName}</p> */}

      {pokemonInfo === undefined ? (
        <div></div>
      ) : (
        <div
          id="pokemon-result"
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            padding: "100px 10px 0px 10px",
          }}
        >
          <Paper sx={{ backgroundColor: getBackColor(pokemonInfo) }}>
            <Grid
              container
              direction="row"
              spacing={5}
              sx={{
                justifyContent: "center",
              }}
            >
              <Grid item>
                <Box>
                  {pokemonInfo === undefined || pokemonInfo === null ? (
                    <h1> Pokemon not found</h1>
                  ) : (
                    <div>
                      <Table>
                        <TableRow>
                          <h1>
                            {`${pokemonInfo.id.toString()}. ${pokemonInfo.name
                              .charAt(0)
                              .toUpperCase()}${pokemonInfo.name.slice(1)}`}
                          </h1>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <b>Height:</b> {pokemonInfo.height / 10} m
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <b>Weight:</b> {pokemonInfo.weight / 10} kg
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell style={{ verticalAlign: "top" }}>
                            <b>Types:</b>
                          </TableCell>
                          <TableCell>
                            {getTypes()?.map((t) => (
                              <TableRow>
                                {t.charAt(0).toUpperCase() + t.slice(1)}
                              </TableRow>
                            ))}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell style={{ verticalAlign: "top" }}>
                            <b>Abilities:</b>
                          </TableCell>
                          <TableCell>
                            {getAbilities()?.map((a) => (
                              <TableRow>
                                {a.charAt(0).toUpperCase() + a.slice(1)}
                              </TableRow>
                            ))}
                          </TableCell>
                        </TableRow>
                      </Table>
                    </div>
                  )}
                </Box>
              </Grid>
              <Grid item>
                <Box>
                  {pokemonInfo?.sprites.other.dream_world.front_default ? (
                    <img
                      height="300px"
                      width="300px"
                      alt={pokemonInfo.name}
                      src={pokemonInfo.sprites.other.dream_world.front_default}
                    ></img>
                  ) : (
                    <Skeleton width={300} height={300} />
                  )}
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </div>
      )}
    </div>
  );
};

export default PokemonSearch;
