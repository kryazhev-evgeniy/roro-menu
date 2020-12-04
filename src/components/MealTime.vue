<template>
  <div>
    <div class="row justify-between items-center">
      <h1>{{ mealTime.name }}</h1>
      <q-btn
        v-if="!readOnly"
        flat
        round
        class="q-pa-md"
        color="primary"
        icon="fas fa-trash-alt"
        @click="deletedMealtime"
      />
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
  </div>
</template>

<script>
export default {
  name: "MealTime",
  props: {
    mealTime: Object,
    readOnly: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    deletedMealtime() {
      this.$emit("deleted", this.mealTime._id);
    },
  },
};
</script>

<style></style>
