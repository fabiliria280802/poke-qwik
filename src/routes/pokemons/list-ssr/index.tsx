import { $, component$, useComputed$} from '@builder.io/qwik';

//referencia al tipo de dato DocumentHea
import { type DocumentHead, routeLoader$, useLocation, useNavigate } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { getSmallPokemons } from '~/helpers/get-small-pokemons';
import type { SmallPokemon } from '~/interfaces';

//lista de pokemons
export const usePokemonList = routeLoader$<SmallPokemon[]>(async({query, redirect, pathname})=>{
    //Validacion nos es null y no es menor que 0
    const offset = Number(query.get('offset') || '0');
    if (isNaN(offset)) throw redirect(301, pathname);
    if (offset < 0 ) throw redirect(301, pathname);

    //llamado a la funcion get-small-pokemons
    const pokemons= await getSmallPokemons(offset);
    return pokemons;
});

export default component$(() => {
    //consumir data de pokemon.api
    const pokemonResp= usePokemonList();
    const location = useLocation();
    const nav = useNavigate();
    //obtener el offset de la url
    const currentOffset = useComputed$(()=>{
        const offsetString = new URLSearchParams(location.url.search);
        return Number(offsetString.get('offset') || 0);
    });
    const onClickNav = $((value: number)=>{
        if(currentOffset.value + value < 0) return;
        nav(`/pokemons/list-ssr/?offset=${currentOffset.value-value}`);
    });
    return (
        /* Notes:
        * 1.codigo html para botones, imagenes y nombres de pokemons tienen:
        *   <>codigo</>
        * 2.codigo js para funcionalidad de imagenes y botones con sus respectivas variables:
        *   {codigo}
        * 
        * Codigo no necesario:
            //<Link href={`/pokemons/list-ssr/?offset=${currentOffset.value-10}/`} class="btn btn-primary mr-2">Back</Link>
            //<Link href={`/pokemons/list-ssr/?offset=${currentOffset.value+10}/`} class="btn btn-primary mr-2">Next</Link>
        */
        <>
            <div class="flex flex-col">
                <span class="my-5 text-5xl">Status</span>
                <span >Current offset: {currentOffset}</span>
                <span >Is navigating: {location.isNavigating? 'Yes':'No' }</span>
            </div>
            <div class="mt-10">
                <button onClick$={()=> onClickNav(10)} class="btn btn-primary mr-2">Back</button>
                <button onClick$={()=> onClickNav(-10)} class="btn btn-primary mr-2">Next</button>
            </div>
            <div class="grid grid-cols-5 mt-5">
                {
                    //se obtiene de la data el nombre de los pokemons
                    pokemonResp.value.map(({name, id}) => (
                        <div key={name} class="m-5 flex flex-col justify-center items-center">
                            <PokemonImage id={id}/>
                            <span class = "capitalize">{name}</span>
                        </div>
                    ))
                }
            </div>
        </>
    ) 
});

export const head: DocumentHead = {
    title: "List SSR",
  };

