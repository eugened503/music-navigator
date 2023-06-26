<template>
   <Form
      nameLink="Login"
      title="Register"
      titleLink="У вас есть профиль?"
      subTitleLink="Авторизоваться!"
      :form="registerForm"
      :action="register"
      nameButton="Register"
    ></Form>
</template>

<script setup>
import { reactive } from "vue";
import { useStoreUser } from "../stores/storeUser";
import Form from "../components/Form.vue";

const { register } = useStoreUser();
const registerForm = reactive({
  email: "",
  password: "",
});
</script>