<template>
  <q-form @submit="signIn">
    <div class="q-ma-xl text-center text-h3">Авторизация</div>
    <div style="width: 400px; margin: 0 auto;">
      <SignInForm @sign="signin()" />
      <div class="row justify-center items-center" style="height: 70px;">
        <p class="text-h6">
          Нет аккаунта?
          <router-link class="text-primary" to="/signup"
            >Зарегистрируйся</router-link
          >
        </p>
      </div>
    </div>
  </q-form>
</template>
<script>
export default {
  name: "SignIn",
  components: {
    SignInForm: () => import("../components/SignInForm"),
  },
  methods: {
    signin() {
      this.$router.push("/");
    },
  },
};
</script>
