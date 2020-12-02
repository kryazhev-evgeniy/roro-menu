<template>
  <div class="q-ma-xl">
    <header>
      <div class="row">
        <div class="col text-h1">
          Меню
        </div>
        <div class="col"></div>
      </div>
    </header>
    <div>
      <MealTime
        v-for="(mealtime, index) in mealtimes"
        :key="index"
        :mealTime="mealtime"
      />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from "vuex";

export default {
  name: "Home",
  components: {
    MealTime: () => import("../components/MealTime"),
  },
  data() {
    return {
      mealtimes: [],
    };
  },
  computed: {
    ...mapGetters(["isAuth"]),
  },
  mounted() {
    this.$store.dispatch("LoadMealTimes").then((resp) => {
      this.mealtimes = resp.data;
    });
  },
};
</script>
