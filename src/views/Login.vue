<template>
    <Form
      nameLink="Register"
      title="Login"
      titleLink="У вас нет профиля?"
      subTitleLink="Зарегистрируйтесь!"
      :form="loginForm"
      :action="login"
      nameButton="Login"
    ></Form>
</template>

<script setup>
import { reactive } from "vue";
import { useStoreUser } from "../stores/storeUser";
import Form from "../components/Form.vue";

const { login } = useStoreUser();
const loginForm = reactive({
  email: "",
  password: "",
});
</script>