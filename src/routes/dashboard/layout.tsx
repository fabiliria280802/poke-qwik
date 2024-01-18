import { Slot, component$ } from "@builder.io/qwik";
import Navbar from "~/components/shared/navbar/navbar";

export default component$(() => {
  return (
    <>
      <Navbar />
      <div class="flex flex-col items-center justify-center mt-2">
        <span class="text-5xl">dashboard layout</span>
        <Slot />
      </div>
    </>
  );
});