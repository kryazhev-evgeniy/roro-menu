<template>
  <div class="q-ma-xl">
    <header>
      <div class="row">
        <div class="col-12 col-md-6">
          <div class="row items-center">
            <p class="text-center text-h3 q-ma-sm">Блюда</p>
            <q-btn flat round color="primary" icon="fas fa-plus">
              <q-tooltip>
                Добавить блюдо
              </q-tooltip>
            </q-btn>
          </div>
        </div>
        <div class="col-12 col-md-6"></div>
      </div>
    </header>
    <div class="content shadow-2">
      <div class="row">
        <div class="col-12 col-sm-6 col-md-4" v-for="index in 30" :key="index">
          <q-card class="shadow-0 q-ma-sm">
            <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">
              <div class="absolute-bottom">
                <div class="text-h6">Our Changing Planet</div>
                <div class="text-subtitle2">by John Doe</div>
              </div>
            </q-img>
            <q-card-actions align="center">
              <q-btn flat color="primary" icon="fas fa-trash-alt"> </q-btn>
              <q-btn flat color="primary" icon="fas fa-edit" />
              <q-btn flat color="primary" icon="fas fa-eye" @click="showDish" />
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>

    <q-dialog v-model="viewDish">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Close icon</div>
          <q-space />
          <q-btn icon="fas fa-times" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
          repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis
          perferendis totam, ea at omnis vel numquam exercitationem aut, natus
          minima, porro labore. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet
          porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam
          exercitationem aut, natus minima, porro labore. Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Rerum repellendus sit voluptate
          voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at
          omnis vel numquam exercitationem aut, natus minima, porro labore.
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  name: "Dishes",
  data: () => ({
    viewDish: false,
  }),
  methods: {
    showDish() {
      this.viewDish = true;
    },
  },
};
</script>
