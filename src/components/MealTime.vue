<template>
  <div>
    <div>
      <h3>{{ mealTime.name }}</h3>
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
          <q-card-actions align="right">
            <q-btn flat class="full-width">Перейти</q-btn>
          </q-card-actions>
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
  },
};
</script>

<style></style>
