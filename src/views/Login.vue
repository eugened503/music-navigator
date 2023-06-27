<template>
    <Form
      nameLink="Register"
      title="Login"
      titleLink="У вас нет профиля?"
      subTitleLink="Зарегистрируйтесь!"
      :action="login"
      nameButton="Login"
    ></Form>
</template>

<script setup>
import { useStoreUser } from "../stores/storeUser";
import Form from "../components/Form.vue";
const { login } = useStoreUser();

</script>