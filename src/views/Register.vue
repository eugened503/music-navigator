<template>
  <main class="login">
    <section class="forms">
      <form class="register" @submit.prevent="register(registerForm)">
        <h2>Register</h2>
        <input
          type="email"
          placeholder="Email address"
          v-model="registerForm.email"
          name="email"
          autocomplete="on"
        />
        <input
          type="password"
          placeholder="Password"
          v-model="registerForm.password"
          name="password"
          autocomplete="on"
        />
        <button type="submit">Register</button>
        <router-link :to="{ name: 'Login' }">Login</router-link>
      </form>
    </section>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { useStoreUser } from "../stores/storeUser";
const registerForm = ref({});
const { register } = useStoreUser();
</script>

<style lang="scss" scoped>
.forms {
  display: flex;
  min-height: 100vh;
}

form {
  //flex: 1 1 0%;
  margin: auto;
  padding: 8rem 1rem 1rem;
  a {
    display: block;
  }
}

form.register {
  color: $clr-white;
  background-color: rgb(245, 66, 101);
  background-image: linear-gradient(
    to bottom right,
    rgb(245, 66, 101) 0%,
    rgb(189, 28, 60) 100%
  );
}

h2 {
  font-size: 2rem;
  text-transform: uppercase;
  margin-bottom: 2rem;
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
  font-size: 1.5rem;
  margin-bottom: 2rem;
  padding: 0.5rem 0rem;
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

form.register input:not([type="submit"]) {
  color: $clr-white;
  border-bottom: 2px solid $clr-white;
}
</style>
