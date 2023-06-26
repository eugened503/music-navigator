import { computed, reactive } from "vue";
import { useStoreUser } from "../stores/storeUser";
import useVuelidate from "@vuelidate/core";
import { storeToRefs } from "pinia";
import { required, minLength, helpers, email } from "@vuelidate/validators";

export default function useFormContent(action, form) {
  const { getLoaded } = storeToRefs(useStoreUser());
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

  const v$ = useVuelidate(rules, form);

  const submitForm = async () => {
    const isFormCorrect = await v$.value.$validate();
    if (!isFormCorrect) return;
    action(form);
  };

  return { getLoaded, submitForm, v$ };
}
