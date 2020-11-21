<template>
  <div>
    <div class="q-ma-xl text-center text-h3">Авторизация</div>
    <div style="width: 400px; margin: 0 auto;">
      <q-input outlined v-model="Login" label="Логин" class="q-mb-md" />
      <q-input outlined v-model="Password" label="Пароль" />
      <br />
      <q-btn
        class="full-width"
        color="primary"
        label="Войти"
        @click="signIn()"
      />
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
