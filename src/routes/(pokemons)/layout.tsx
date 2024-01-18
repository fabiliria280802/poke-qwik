import { Slot, component$ } from '@builder.io/qwik';

export default component$(() => {
    return(
        <>
            <h2>Pokemon Layout</h2>
            <Slot />
        </>
    )
});