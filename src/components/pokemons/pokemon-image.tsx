import { component$, useComputed$, useSignal, useTask$ } from "@builder.io/qwik";
interface Props{
    // puede ser calquiera de los dos tipos de dato:
    id: number | string,

    //optional values are ?
    size?: number,
    backImage?: boolean,
    isVisible?: boolean,
}

export const PokemonImage = component$(( {
    id, 
    size=200,
    backImage = false,
    isVisible=true
}: Props) => {

    const imageLoaded = useSignal(false);
    useTask$(({track}) =>{
        track(()=>id);
        imageLoaded.value = false;
    });

    const imageUrl = useComputed$(()=>{
        return (backImage)
        ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${ id }.png`
        : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ id }.png`;
    })
    return (
        <div class="flex items-center justify-center"
        style={{width: `${size}px`, height: `${size}px`}}>
            { !imageLoaded.value && <span>Loading... </span>}
            <img
                width="200" height="200"
                src={ imageUrl.value} 
                alt="Pokemon Sprite"
                style={{width: `${size}px`}}
                onLoad$={()=> {
                    //setTimeout(() => {
                        imageLoaded.value = true
                    //}, 2000)
                }}
                class = {[{
                    'hidden': !imageLoaded.value,
                    'brightness-0': !isVisible
                },'transition-all']}
            />
        </div>
    )
});