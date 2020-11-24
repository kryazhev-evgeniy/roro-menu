<template>
  <q-form @submit="signIn">
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
    <div class="row">
      <q-btn class="full-width" color="primary" label="Войти" type="submit" />
    </div>
  </q-form>
</template>

<script>
export default {
  name: "SignInForm",
  data: () => {
    return {
      Login: "",
      Password: "",
    };
  },
  methods: {
    signIn() {
      this.$store
        .dispatch("SignIn", {
          login: this.Login,
          password: this.Password,
        })
        .then(() => {
          this.$emit("sign");
          this.Login = "";
          this.password = "";
        });
    },
  },
};
</script>
