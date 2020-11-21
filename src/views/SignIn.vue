<template>
  <div>
    <div>Авторизация</div>
    <div>
      <q-input outlined v-model="Login" label="Логин" />
      <q-input outlined v-model="Password" label="Пароль" />
      <br />
      <q-btn label="Войти" @click="signIn()" />
    </div>
  </div>
</template>
<script>
import { Notify } from "quasar";

export default {
  name: "SignIn",
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
          this.Login = "";
          this.password = "";
          this.$router.push("/");
        })
        .catch((err) => {
          Notify.create({
            message: err,
          });
        });
    },
  },
};
</script>
