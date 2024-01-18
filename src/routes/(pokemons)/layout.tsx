import { Slot, component$ } from '@builder.io/qwik';
import { PokemonProvider } from '~/context';
import Navbar from '~/components/shared/navbar/navbar';
export default component$(() => {
    return(
        <PokemonProvider>
            <Navbar />
            <main class="flex flex-col items-center justify-center">
                <Slot />
            </main>
        </PokemonProvider>
    )
});