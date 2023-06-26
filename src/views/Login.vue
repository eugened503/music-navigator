<template>
  <main class="login">
    <section class="forms">
      <!-- <form class="login" @submit.prevent="login(loginForm)"> -->
      <form class="login" @submit.prevent="submitForm">
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email address"
          v-model="loginForm.email"
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
          v-model="loginForm.password"
          name="password"
          autocomplete="on"
        />
        <!-- {{ v$.password.$errors }} -->
        <div class="form__errors">
          <div v-for="(error, index) of v$.password.$errors" :key="index">
            <p class="form__error">{{ error.$message }}</p>
          </div>
        </div>
        <button :disabled="getLoginLoaded" type="submit">Login</button>
        <router-link :to="{ name: 'Register' }">Register</router-link>
      </form>
    </section>
  </main>
</template>

<script setup>
import { computed, reactive } from "vue";
import { useStoreUser } from "../stores/storeUser";
import useVuelidate from "@vuelidate/core";
import { storeToRefs } from "pinia";
import {
  required,
  minLength,
  helpers,
  email,
} from "@vuelidate/validators";

const { login } = useStoreUser();
const { getLoginLoaded } = storeToRefs(useStoreUser());

const loginForm = reactive({
  email: "",
  password: "",
});

const rules = computed(() => ({
  email: {
    $autoDirty: true,
    required: helpers.withMessage("Поле является обязательным", required),
    email: helpers.withMessage("Некорректный e-mail", email),
  },
  password: {
    $autoDirty: true,
    minLength: helpers.withMessage(
      "Минимальная длина пароля - 6 символов",
      minLength(6)
    ),
    required: helpers.withMessage("Поле является обязательным", required),
  },
}));

const v$ = useVuelidate(rules, loginForm);

const submitForm = async () => {
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) return;
  login(loginForm);
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
