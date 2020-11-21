<template>
  <div>
    <div class="text-h3 text-center q-ma-xl">Регистрация</div>
    <div style="width: 400px; margin: 0 auto;">
      <div class="">
        <q-input outlined v-model="Login" label="Логин" class="q-mb-md" />
        <q-input outlined v-model="Password" label="Пароль" />
        <br />
        <q-input outlined v-model="FIO" label="ФИО" />
        <br />
        <q-btn
          color="primary"
          class="full-width"
          label="Войти"
          @click="signUp()"
        />
      </div>
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
