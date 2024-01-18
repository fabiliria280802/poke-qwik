/* Notes:
 * se importa la libreria useStylesScoped$ con el siguiente comando:
 *   import {  useStylesScoped$ } from '@builder.io/qwik';
 */
import {
  component$,
  useOnDocument,
  $,
  useStore,
  useTask$,
} from "@builder.io/qwik";

//referencia al tipo de dato
import type { DocumentHead } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-image";
import { getSmallPokemons } from "~/helpers/get-small-pokemons";
import type { SmallPokemon } from "~/interfaces";

interface PokemonPageState {
  currentPage: number;
  isLoading: boolean;
  pokemons: SmallPokemon[];
}

/* Notes:
 * se importa el archivo de estilos:
 * import styles from '../../styles.css?inline';
 */

export default component$(() => {
  /* Notes:
   * Se usa el comando:
   *   useStylesScoped$(styles);
   * para definir los estilos css de una pagina completa de forma individual y no global.
   */
  const pokemonState = useStore<PokemonPageState>({
    currentPage: 0,
    isLoading: false,
    pokemons: [],
  });
  //solo lo ve el cliente
  //  useVisibleTask$(async({track})=>{
  // track(()=> pokemonState.currentPage);
  // const pokemons = await getSmallPokemons(pokemonState.currentPage * 10);
  // pokemonState.pokemons = [...pokemonState.pokemons, ...pokemons];
  //});

  useTask$(async ({ track }) => {
    track(() => pokemonState.currentPage);
    const pokemons = await getSmallPokemons(pokemonState.currentPage * 10, 30);
    pokemonState.pokemons = [...pokemonState.pokemons, ...pokemons];
    pokemonState.isLoading = false;
  });
  useOnDocument(
    "scroll",
    $(() => {
      const maxScroll = document.body.scrollHeight;
      const CurrentScroll = window.scrollY + window.innerHeight;
      if (CurrentScroll + 200 >= maxScroll && !pokemonState.isLoading) {
        pokemonState.isLoading = true;
        pokemonState.currentPage++;
      }
    }),
  );

  return (
    <>
      <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span>Current offset: {pokemonState.currentPage}</span>
        <span>Is navigating: </span>
      </div>
      <div class="mt-10">
        {/*<button onClick$={()=> pokemonState.currentPage--} class="btn btn-primary mr-2">Back</button>*/}
        <button
          onClick$={() => pokemonState.currentPage++}
          class="btn btn-primary mr-2"
        >
          Next
        </button>
      </div>
      <div class="grid sm:grid-cols-2 md:grid-cols-5 xl:grid-flow-col-7 mt-5">
        {
          //se obtiene de la data el nombre de los pokemons
          pokemonState.pokemons.map(({ name, id }) => (
            <div
              key={name}
              class="m-5 flex flex-col justify-center items-center"
            >
              <PokemonImage id={id} />
              <span class="capitalize">{name}</span>
            </div>
          ))
        }
      </div>
    </>
  );
  //<span>Hello world - CLIENT</span>
});

//titulo de la head
export const head: DocumentHead = {
  title: "List Client",
};
