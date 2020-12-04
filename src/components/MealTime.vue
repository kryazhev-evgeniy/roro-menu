<template>
  <div>
    <div class="row justify-between items-center">
      <h1>{{ mealTime.name }}</h1>
      <div>
        <q-btn
          v-if="!readOnly"
          flat
          round
          class="q-pa-md"
          color="primary"
          icon="fas fa-trash-alt"
          @click="deletedMealtime"
        />
        <q-btn
          v-if="!readOnly"
          flat
          round
          class="q-pa-md"
          color="primary"
          icon="fas fa-edit"
          @click="editMealtime = true"
        />
      </div>
    </div>
    <div class="row">
      <div
        v-for="(dish, index) in mealTime.dishes"
        :key="index"
        class="col-12 col-sm-6 col-md-4 q-pa-sm"
      >
        <q-card class="shadow-20">
          <q-img :src="dish.urlImage">
            <div class="absolute-bottom">
              <div class="text-h6">{{ dish.name }}</div>
            </div>
          </q-img>
        </q-card>
      </div>
    </div>
    <q-dialog v-model="editMealtime" full-width>
      <q-card class="q-pa-md">
        <q-card-section>
          <p class="text-h4">Длбавить приём пищи {{ mealTime.name }}</p>
        </q-card-section>
        <q-card-section>
          <q-input
            outlined
            label="Название приёма пищи"
            class="q-mb-md"
            v-model="mealTime.name"
          />
          <q-table
            class="dishesTable"
            style="height: 600px"
            title="Блюда"
            :data="mealTime.dishes"
            grid
            row-key="_id"
            hide-header
          >
            <template v-slot:top>
              <q-btn
                color="primary"
                label="Добавить блюдо"
                @click="addDishMealTImeDialog.active = true"
              />
            </template>
            <template v-slot:item="props">
              <div
                class="q-pa-xs col-md-6 col-sm-12 col-xl-3 grid-style-transition"
              >
                <q-card>
                  <q-card-section>
                    <DishCard :dish="props.row" :readOnly="true" />
                    <div class="row">
                      <q-btn
                        flat
                        round
                        class="q-pa-md"
                        color="primary"
                        icon="fas fa-trash-alt"
                        @click="deleteDishMealTime(props.row)"
                      />
                    </div>
                  </q-card-section>
                </q-card>
              </div>
            </template>
          </q-table>
        </q-card-section>
        <q-card-actions>
          <q-btn label="Сохранить" @click="submitMealTime" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="addDishMealTImeDialog.active" full-width>
      <q-card>
        <q-card-actions>
          <q-btn label="Сохранить" @click="addDishMealTIme" />
        </q-card-actions>
        <q-table
          class="bg-white"
          title="Блюда"
          :data="addDishMealTImeDialog.dishes"
          selection="multiple"
          :selected.sync="addDishMealTImeDialog.selected"
          grid
          row-key="_id"
          hide-header
        >
          <template v-slot:item="props">
            <div
              class="q-pa-xs col-md-6 col-sm-12 col-xl-3 grid-style-transition"
            >
              <q-card>
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
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  name: "MealTime",
  props: {
    mealTime: Object,
    mealTimeID: Number,
    readOnly: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    editMealtime: false,
    addDishMealTImeDialog: {
      active: false,
      dishes: [],
      selected: [],
    },
  }),
  components: {
    DishCard: () => import("../components/DishCard.vue"),
  },
  methods: {
    submitMealTime() {
      console.log({
        id: this.mealTime._id,
        new: {
          name: this.mealTime.name,
          dishes: this.mealTime.dishes.map((item) => {
            return item._id;
          }),
        },
      });
      this.$store
        .dispatch("UpdateMealTime", {
          id: this.mealTime._id,
          new: {
            name: this.mealTime.name,
            dishes: this.mealTime.dishes.map((item) => {
              return item._id;
            }),
          },
        })
        .then((Response) => {
          this.$q.notify(`Изменён приём пищи ${Response.data.name}`);
          this.editMealtime = false;
        });
    },
    deletedMealtime() {
      this.$emit("deleted", this.mealTime);
    },
    deleteDishMealTime(row) {
      var index = this.mealTime.dishes.indexOf(row);
      if (index > -1) {
        this.mealTime.dishes.splice(index, 1);
      }
    },
    addDishMealTIme() {
      this.addDishMealTImeDialog.selected.forEach((item) => {
        this.mealTime.dishes.push(item);
      });
      this.addDishMealTImeDialog.active = false;
    },
  },
  mounted() {
    this.$store.dispatch("LoadDishes").then((Response) => {
      this.addDishMealTImeDialog.dishes = Response.data;
    });
  },
};
</script>

<style></style>
