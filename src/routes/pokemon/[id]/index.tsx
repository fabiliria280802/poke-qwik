import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-image";

/* Notes:
 * Validacion regreso de numeros no strings.
 * redirige un error: 301
 * debes agregar la palabra: throw
 */
export const usePokemonId = routeLoader$<number>(({ params, redirect }) => {
  const id = Number(params.id);
  if (isNaN(id)) throw redirect(301, "/");
  if (id <= 0) throw redirect(301, "/");
  if (id > 1008) throw redirect(301, "/");
  return id;
});

export default component$(() => {
  const pokemonId = usePokemonId();
  return (
    <>
      <span class="text-5xl">Pokemon: {pokemonId}</span>
      <PokemonImage id={pokemonId.value} isVisible />
    </>
  );
});
