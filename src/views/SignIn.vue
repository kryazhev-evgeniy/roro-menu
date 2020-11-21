<template>
  <q-form @submit="signIn" style="height: 600px;" class="row items-center">
    <div class="col">
      <div class="q-mb-md text-center text-h3">Авторизация</div>
      <div style="width: 400px; margin: 0 auto;">
        <q-input
          outlined
          v-model="Login"
          label="Логин"
          class="q-mb-md"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Введите пожалуйста логин',
          ]"
        />
        <q-input
          outlined
          v-model="Password"
          label="Пароль"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Введите пожалуйста пароль',
          ]"
        />
        <br />
        <div class="row">
          <q-btn
            class="full-width"
            color="primary"
            label="Войти"
            type="submit"
          />
        </div>
        <div class="row justify-center items-center" style="height: 70px;">
          <p class="text-h6">
            Нет аккаунта?
            <router-link class="text-primary" to="/signup"
              >Зарегистрируйся</router-link
            >
          </p>
        </div>
      </div>
    </div>
  </q-form>
</template>
<script>
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
        });
    },
  },
};
</script>
