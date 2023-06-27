<template>
   <Form
      nameLink="Login"
      title="Register"
      titleLink="У вас есть профиль?"
      subTitleLink="Авторизоваться!"
      :action="register"
      nameButton="Register"
    ></Form>
</template>

<script setup>
import { useStoreUser } from "../stores/storeUser";
import Form from "../components/Form.vue";

const { register } = useStoreUser();
</script>