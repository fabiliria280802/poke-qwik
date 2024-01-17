import axios from "axios";
import type { PokemonResponse } from "~/interfaces";

const getPokemonInfo = (pokemon: string): Promise<PokemonResponse> => {
  const url = `https://pokemon-api3.p.rapidapi.com/pokemon/${pokemon.toLowerCase()}`;

  // Set up the headers with the API key stored in environment variables
  const headers = {
    "X-RapidAPI-Key": process.env.PUBLIC_POKEMON_KEY,
    "X-RapidAPI-Host": "pokemon-api3.p.rapidapi.com",
  };

  return axios
    .get(url, { headers })
    .then((response) => {
      // Map only the necessary fields from the API response
      const { data } = response;
      return {
        abilities: data.abilities,
        height: data.height,
        location_area_encounters: data.location_area_encounters,
        weight: data.weight,
      };
    })
    .catch((error) => {
      throw error;
    });
};

export { getPokemonInfo };
