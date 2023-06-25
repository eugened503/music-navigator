<template>
  <main class="login">
    <section class="forms">
      <!-- <form class="login" @submit.prevent="login(loginForm)"> -->
      <form class="login" @submit.prevent="submitForm">
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email address"
          v-model="state.email"
          name="email"
          autocomplete="on"
        />
        <!-- {{ v$.email.$errors }} -->
        <div class="form__errors">
          <div v-for="(error, index) of v$.email.$errors" :key="index">
            <p class="form__error">{{ error.$message }}</p>
          </div>
        </div>
        <input
          type="password"
          placeholder="Password"
          v-model="state.password"
          name="password"
          autocomplete="on"
        />
        <!-- {{ v$.password.$errors }} -->
        <div class="form__errors">
          <div v-for="(error, index) of v$.password.$errors" :key="index">
            <p class="form__error">{{ error.$message }}</p>
          </div>
        </div>
        <button type="submit">Login</button>
        <router-link :to="{ name: 'Register' }">Register</router-link>
      </form>
      <!-- {{ v$ }} -->
    </section>
  </main>
</template>

<script setup>
import { ref, computed, reactive } from "vue";
import { useStoreUser } from "../stores/storeUser";
import useVuelidate from "@vuelidate/core";
import {
  required,
  minLength,
  helpers,
  email,
  sameAs,
} from "@vuelidate/validators";

//const loginForm = ref({});
const { login } = useStoreUser();

const state = reactive({
  email: "",
  password: "",
});

const rules = computed(() => ({
  email: {
    $autoDirty: true,
    required: helpers.withMessage("Поле является обязательным", required),
    containsEmailRequirement: helpers.withMessage(
      () => "Некорректный e-mail",
      (value) =>
        /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
          value.toString()
        )
    ),
  },
  password: {
    $autoDirty: true,
    minLength: helpers.withMessage(
      "Минимальная длина пароля - 8 символов",
      minLength(8)
    ),
    required: helpers.withMessage("Поле является обязательным", required),
  },
}));

const v$ = useVuelidate(rules, state);

const submitForm = async () => {
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) return;
  login(state);
};
</script>

<style lang="scss" scoped>
.forms {
  display: flex;
  min-height: 100vh;
}

form {
  //flex: 1 1 0%;
  margin: auto;
  padding: 128px 16px 16px;

  a {
    display: block;
  }

  &.login input:not([type="submit"]) {
    color: #2c3e50;
    border-bottom: 2px solid #2c3e50;
  }

  &.login button {
    width: 100%;
    background-color: rgb(245, 66, 101);
    color: #fff;
    font-weight: 700;
    padding: 1rem 2rem;
    border-radius: 0.5rem;
    cursor: pointer;
    text-transform: uppercase;
  }
}

h2 {
  font-size: 32px;
  text-transform: uppercase;
  margin-bottom: 32px;
}

input {
  appearance: none;
  border: none;
  outline: none;
  background: none;

  display: block;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  font-size: 24px;
  margin-bottom: 32px;
  padding: 8px 0;
}

input:not([type="submit"]) {
  opacity: 0.8;
  transition: 0.4s;
}

input:focus:not([type="submit"]) {
  opacity: 1;
}

input::placeholder {
  color: inherit;
}
</style>
