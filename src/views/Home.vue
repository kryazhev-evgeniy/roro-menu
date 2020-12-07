<template>
  <div class="q-ma-xl">
    <header class="q-ma-md">
      <p class="text-h3 text-center">меню</p>
      <div class="row justify-center">
        <p class="text-center text-h5">
          {{ dayDishes[selectedDayDish].date }}
        </p>
      </div>
      <div class="col">
        <div class="row justify-center">
          <q-btn
            color="primary"
            icon="fas fa-chevron-left"
            flat
            label="Назад"
            @click="LeftDay()"
          />
          <q-btn
            color="primary"
            icon-right="fas fa-chevron-right"
            flat
            label="Вперёд"
            @click="RightDay()"
          />
        </div>
        <div class="row justify-center q-mt-md">
          <q-btn
            flat
            color="green"
            label="Выгрузить в exel"
            @click="exportToExcel()"
          />
        </div>
      </div>
    </header>
    <div>
      <MealTime
        v-for="(meatime, index) in dayDishes[selectedDayDish].mealTimes"
        :key="index"
        :mealTime="meatime"
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
      dayDishes: [],
      selectedDayDish: 0,
      proxyDate: "2019/02/01",
      events: [],
    };
  },
  computed: {
    ...mapGetters(["isAuth"]),
  },
  mounted() {
    this.$store.dispatch("LoadDayDish").then((resp) => {
      this.dayDishes = resp.data;
      this.selectedDayDish = this.dayDishes.length - 1;
    });
  },
  methods: {
    LeftDay() {
      console.log(this.selectedDayDish);
      if (this.selectedDayDish < this.dayDishes.length - 1) {
        this.selectedDayDish += 1;
      } else {
        this.selectedDayDish = this.dayDishes.length - 1;
      }
    },
    RightDay() {
      if (this.selectedDayDish > 0) {
        this.selectedDayDish -= 1;
      } else {
        this.selectedDayDish = this.dayDishes.length - 1;
      }
    },
    exportToExcel() {
      this.$store
        .dispatch("DownloadFileExcel", this.dayDishes[this.selectedDayDish]._id)
        .then((response) => {
          var fileURL = window.URL.createObjectURL(new Blob([response.data]));
          var fileLink = document.createElement("a");
          fileLink.href = fileURL;
          fileLink.setAttribute("download", "doc.xlsx");
          document.body.appendChild(fileLink);
          fileLink.click();
          console.log(response.data);
        });
    },
  },
};
</script>
