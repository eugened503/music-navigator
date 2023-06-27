<template>
  <section>
    <form class="form" @submit.prevent="submitForm">
      <h1>{{ title }}</h1>
      <input
        type="email"
        placeholder="Email address"
        v-model="form.email"
        name="email"
        autocomplete="on"
      />
      <div class="form__errors">
        <p
          v-for="(error, index) of v$.email.$errors"
          :key="index"
          class="form__error"
        >
          {{ error.$message }}
        </p>
      </div>
      <input
        type="password"
        placeholder="Password"
        v-model="form.password"
        name="password"
        autocomplete="on"
      />
      <div class="form__errors height">
        <p
          v-for="(error, index) of v$.password.$errors"
          :key="index"
          class="form__error"
        >
          {{ error.$message }}
        </p>
      </div>
      <button class="button" :disabled="getLoaded" type="submit">
        {{ nameButton }}
      </button>
      <p class="form__footer">
        {{ titleLink }}
        <router-link :to="{ name: nameLink }"
          >&nbsp;{{ subTitleLink }}</router-link
        >
      </p>
    </form>
  </section>
</template>

<script setup>
import { reactive } from "vue";
import useFormContent from "../composables/useFormContent";

const props = defineProps({
  title: String,
  nameLink: String,
  titleLink: String,
  subTitleLink: String,
  nameButton: String,
  action: Function,
});

const form = reactive({
  email: "",
  password: "",
});

const { getLoaded, submitForm, v$ } = useFormContent(props.action, form);
</script>

<style lang="scss" scoped>
section {
  display: flex;
  min-height: 100vh;
}

.form {
  margin: auto;
  padding: 128px 16px 16px;
  max-width: 291px;

  &__footer {
    display: flex;
    font-size: 14px;
    margin: 24px 0 0;
    a {
      color: $clr-saturated-blue;
    }
  }

  &__errors {
    height: 20px;
    margin: 0 0 12px;
    p {
      color: $clr-carrot;
    }

    &.height {
      height: 40px;
    }
  }

  h1 {
    font-size: 32px;
    text-transform: uppercase;
    margin-bottom: 32px;
  }

  input {
    display: block;
    width: 100%;
    font-size: 24px;
    margin-bottom: 12px;
    padding: 8px 0;
    appearance: none;
    border: none;
    outline: none;
    background: none;

    &:not([type="submit"]) {
      opacity: 0.8;
      transition: 0.4s;
    }

    &:focus:not([type="submit"]) {
      opacity: 1;
    }
    &::placeholder {
      color: inherit;
    }

    &:not([type="submit"]) {
      color: $clr-slate-grey;
      border-bottom: 2px solid $clr-slate-grey;
    }

    a {
      display: block;
    }
  }
}
</style>
