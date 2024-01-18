import { component$, useStore, useStylesScoped$ } from "@builder.io/qwik";

import styles from "./login.css?inline";

export default component$(() => {
  useStylesScoped$(styles);
  const formState = useStore({
    email: "",
    password: "",
  });
  const onSubmit = $(() => {});
  return (
    <form class="login-form">
      <div class="relative">
        <input
          onInput$={(ev) =>
            (formState.email = (ev.target as HTMLInputElement).value)
          }
          name="email"
          type="text"
          placeholder="Email address"
        />
        <label for="email">Email Address</label>
      </div>
      <div class="relative">
        <input
          onInput$={(ev) =>
            (formState.password = (ev.target as HTMLInputElement).value)
          }
          name="password"
          type="password"
          placeholder="Password"
        />
        <label for="password">Password</label>
      </div>
      <div class="relative">
        <button>Ingresar</button>
      </div>
      <code>{JSON.stringify(formState, undefined, 2)}</code>
    </form>
  );
});
