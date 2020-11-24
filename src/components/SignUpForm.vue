<template>
  <q-form @submit="submitSignUp">
    <q-input
      outlined
      v-model="Login"
      label="Логин"
      class="q-mb-md"
      lazy-rules
      :rules="[(val) => (val && val.length > 0) || 'Введите пожалуйста логин']"
    />
    <q-input
      outlined
      v-model="Password"
      label="Пароль"
      lazy-rules
      :rules="[(val) => (val && val.length > 0) || 'Введите пожалуйста пароль']"
    />
    <br />
    <q-input
      outlined
      v-model="FIO"
      label="ФИО"
      lazy-rules
      :rules="[(val) => (val && val.length > 0) || 'Введите пожалуйста ФИО']"
    />
    <br />
    <q-btn
      color="primary"
      class="full-width"
      label="Зарегистрироватся"
      type="submit"
    />
  </q-form>
</template>

<script>
export default {
  name: "SignUpForm",
  data: () => {
    return {
      Login: "",
      Password: "",
      FIO: "",
    };
  },
  methods: {
    submitSignUp() {
      this.$store
        .dispatch("SignUp", {
          Login: this.Login,
          Password: this.Password,
          FIO: this.FIO,
          isAdmin: false,
        })
        .then(() => {
          this.$emit("sign");
          this.Login = "";
          this.Password = "";
          this.FIO = "";
        });
    },
  },
};
</script>
