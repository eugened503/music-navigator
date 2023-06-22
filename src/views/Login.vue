<template>
  <main class="login">
    <section class="forms">
      <form class="login" @submit.prevent="login(loginForm)">
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email address"
          v-model="loginForm.email"
          name="email"
          autocomplete="on"
        />
        <input
          type="password"
          placeholder="Password"
          v-model="loginForm.password"
          name="password"
          autocomplete="on"
        />
        <input type="submit" value="Login" />
        <router-link :to="{ name: 'Register' }">Register</router-link>
      </form>
    </section>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { useStoreUser } from "../stores/storeUser";

const loginForm = ref({});
const { login } = useStoreUser();
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

form.login input:not([type="submit"]) {
  color: #2c3e50;
  border-bottom: 2px solid #2c3e50;
}

form.login input[type="submit"] {
  background-color: rgb(245, 66, 101);
  color: #fff;
  font-weight: 700;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  cursor: pointer;
  text-transform: uppercase;
}
</style>
