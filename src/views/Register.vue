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

<script setup lang="ts">
import { useStoreUser } from '@/stores/storeUser'
import Form from '@/components/Form.vue'

const { register } = useStoreUser()
</script>
