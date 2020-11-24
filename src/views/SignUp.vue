<template>
  <div>
    <div class="text-h3 text-center q-ma-xl">Регистрация</div>
    <div style="width: 400px; margin: 0 auto;">
      <SignUpForm @sign="singUp()" />
    </div>
  </div>
</template>

<script>
export default {
  name: "SignUp",
  components: {
    SignUpForm: () => import("../components/SignUpForm"),
  },
  methods: {
    singUp() {
      this.$router.push("/");
    },
  },
};
</script>
