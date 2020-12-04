<template>
  <div class="q-ma-xl">
    <header>
      <div class="row items-center justify-between">
        <div class=" text-h1 text-center">
          Меню
        </div>
        <q-btn
          class="q-pa-sm"
          icon="fas fa-calendar-week"
          round
          color="primary"
        >
          <q-popup-proxy
            @before-show="updateProxy"
            transition-show="scale"
            transition-hide="scale"
          >
            <q-date v-model="proxyDate" :events="events" event-color="orange">
              <div class="row items-center justify-end q-gutter-sm">
                <q-btn label="Cancel" color="primary" flat v-close-popup />
                <q-btn
                  label="OK"
                  color="primary"
                  flat
                  @click="save"
                  v-close-popup
                />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-btn>
      </div>
    </header>
    <div>
      <MealTime
        v-for="(mealtime, index) in mealtimes"
        :key="index"
        :mealTime="mealtime"
        :readOnly="true"
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
      date: "2019/02/01",
      proxyDate: "2019/02/01",
      events: ["2019/02/01", "2019/02/05", "2019/02/06"],
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
