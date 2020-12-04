<template>
  <div class="q-ma-xl">
    <header>
      <div class="row items-center">
        <p class="text-h1 q-mr-md">Приёмы пищи</p>
        <q-btn
          flat
          round
          color="primary"
          icon="fas fa-plus"
          @click="dialogs.addMealtime = true"
        >
          <q-tooltip>
            Добавить Добавить приём пищи
          </q-tooltip>
        </q-btn>
      </div>
    </header>
    <main>
      <div>
        <MealTime
          v-for="(mealtime, index) in mealtimes"
          :key="index"
          :mealTime="mealtime"
          @deleted="deletedMealtime"
        />
      </div>
    </main>
    <q-dialog v-model="dialogs.addMealtime" full-width>
      <q-card class="q-pa-md">
        <q-card-section>
          <p class="text-h4">Длбавить приём пищи {{ dialogs.form.name }}</p>
        </q-card-section>
        <q-card-section>
          <q-input
            outlined
            label="Название приёма пищи"
            class="q-mb-md"
            v-model="dialogs.form.name"
            :error="$v.dialogs.form.name.$error"
          />
          <q-table
            class="dishesTable"
            style="height: 600px"
            title="Блюда"
            :data="dishes"
            grid
            row-key="_id"
            selection="multiple"
            :selected.sync="dishSelected"
            hide-header
          >
            <template v-slot:item="props">
              <div
                class="q-pa-xs col-md-6 col-sm-12 col-xl-3 grid-style-transition"
                :style="props.selected ? 'transform: scale(0.95);' : ''"
              >
                <q-card :class="props.selected ? 'bg-grey-2' : ''">
                  <q-card-section>
                    <q-checkbox
                      dense
                      v-model="props.selected"
                      :label="props.row.name"
                    />
                  </q-card-section>
                  <q-card-section>
                    <DishCard :dish="props.row" :readOnly="true" />
                  </q-card-section>
                </q-card>
              </div>
            </template>
          </q-table>
        </q-card-section>
        <q-card-actions>
          <q-btn label="Добавить" @click="submitMealTime" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";

export default {
  name: "MealTimes",
  data: () => ({
    dialogs: {
      addMealtime: false,
      form: {
        name: "",
      },
    },
    mealtimes: [],
    editMealtimeForm: {},
    dishes: [],
    dishSelected: [],
    dishesColumns: [
      {
        name: "image",
        label: "image",
        field: "urlImage",
      },
    ],
  }),
  validations: {
    dialogs: {
      form: {
        name: { required },
      },
    },
  },
  components: {
    DishCard: () => import("../../components/DishCard.vue"),
    MealTime: () => import("../../components/MealTime.vue"),
  },
  mounted() {
    this.$store.dispatch("LoadDishes").then((Response) => {
      this.dishes = Response.data;
    });
    this.$store.dispatch("LoadMealTimes").then((Response) => {
      this.mealtimes = Response.data;
    });
  },
  methods: {
    submitMealTime() {
      this.$v.dialogs.form.$touch();

      if (this.$v.dialogs.form.$error && this.dishSelected.length < 1) {
        this.$q.notify("Пожалуйста введите название приёма пищи");
        this.$q.notify("Выберите блюдо");
        return;
      }
      this.$store
        .dispatch("AddMealTime", {
          name: this.dialogs.form.name,
          dishes: this.dishSelected.map((item) => {
            return item._id;
          }),
        })
        .then((Response) => {
          this.$q.notify(`Добавлен приём пищи ${Response.data.name}`);
          this.dialogs.addMealtime = false;
          this.mealtimes.push(Response.data);
          this.dialogs.form.name = "";
          this.dishSelected = [];
        });
    },
    deletedMealtime(mealtime) {
      this.$store.dispatch("DeleteMealTime", mealtime._id).then((Response) => {
        this.$q.notify(Response.data);
        this.$store.dispatch("LoadMealTimes").then((Response) => {
          this.mealtimes = Response.data;
        });
      });
    },
  },
};
</script>

<style lang="stylus" scoped>
@import '~quasar-variables'

.dishesTable
  overflow-y scroll;
</style>
