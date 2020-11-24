<template>
  <div>
    <header></header>
    <div class="q-ma-xl">
      <div v-for="index in 3" :key="index">
        <div>
          <h3>Завтрак {{ index }}</h3>
        </div>
        <div class="row">
          <div
            v-for="index in 3"
            :key="index"
            class="col-12 col-sm-6 col-md-4 q-pa-sm"
          >
            <q-card class="shadow-20">
              <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">
                <div class="absolute-bottom">
                  <div class="text-h6">Our Changing Planet</div>
                  <div class="text-subtitle2">by John Doe</div>
                </div>
              </q-img>
              <q-card-actions align="right">
                <q-btn flat class="full-width">Перейти</q-btn>
              </q-card-actions>
            </q-card>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
};
</script>
