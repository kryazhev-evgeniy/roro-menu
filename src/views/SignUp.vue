<template>
  <div>
    <div>Регистрация</div>
    <div>
      <q-input outlined v-model="Login" label="Логин" />
      <q-input outlined v-model="Password" label="Пароль" />
      <br />
      <q-input outlined v-model="FIO" label="ФИО" />
      <br />
      <q-btn label="Войти" @click="signUp()" />
    </div>
  </div>
</template>

<script>
import { Notify } from "quasar";

export default {
  name: "SignUp",
  data: () => {
    return {
      Login: "",
      Password: "",
      FIO: "",
    };
  },
  methods: {
    signUp() {
      this.$store
        .dispatch("SignUp", {
          Login: this.Login,
          Password: this.Password,
          FIO: this.FIO,
          isAdmin: false,
        })
        .then(() => {
          this.Login = "";
          this.Password = "";
          this.FIO = "";
          this.$router.push("/signin");
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
