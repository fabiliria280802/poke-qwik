import { $, component$, useSignal } from "@builder.io/qwik";
import { type DocumentHead, useNavigate } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-image";

export default component$(() => {
  /**
   * Notes:
   * valores primitivos con useSignsl: bool, strings, nums
   * los arreglos son useStore: arrays
   */
  const pokemonId = useSignal(1);
  const showBackImage = useSignal(false);
  const isPokemonVisible = useSignal(false);
  //valor de navegacion
  const nav = useNavigate();

  //funcion de validacion no existen pokemons menores o iguales a 0
  const changePokemonId = $((value: number) => {
    if (pokemonId.value + value <= 0) {
      isPokemonVisible.value = false;
    } else {
      isPokemonVisible.value = false;
      pokemonId.value += value;
    }
  });

  //funcion de navegacion de informacion pokemon
  const goToPokemon = $(() => {
    nav(`/pokemon/${pokemonId.value}/`);
  });

  return (
    <>
      <span class="text-2xl">Buscador simple</span>
      <span class="text-9xl">{pokemonId}</span>
      {/*<Link href={`/pokemon/${pokemonId.value}/`}></Link>*/}
      <div onClick$={() => goToPokemon()}>
        <PokemonImage
          id={pokemonId.value}
          backImage={showBackImage.value}
          isVisible={isPokemonVisible.value}
        />
      </div>

      <div class="mr-2">
        <button
          onClick$={() => changePokemonId(-1)}
          class="btn btn-primary mr-2"
        >
          Anterior
        </button>
        <button
          onClick$={() => changePokemonId(+1)}
          class="btn btn-primary mr-2"
        >
          Siguiente
        </button>
        <button
          onClick$={() => (showBackImage.value = !showBackImage.value)}
          class="btn btn-primary mr-2"
        >
          Voltear
        </button>
        <button
          onClick$={() => (isPokemonVisible.value = !isPokemonVisible.value)}
          class="btn btn-primary"
        >
          Revelar
        </button>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "PokeQwik",
  meta: [
    {
      name: "description",
      content: "First application on qwik",
    },
  ],
};
