<template>
  <div class="q-ma-xl">
    <header>
      <div class="row">
        <div class="col-12 col-md-6">
          <div class="row items-center">
            <p class="text-center text-h3 q-ma-sm">Блюда</p>
            <q-btn
              flat
              round
              color="primary"
              icon="fas fa-plus"
              @click="addFormDish = true"
            >
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
        <DishCard
          v-for="(dish, index) in dishes"
          :key="index"
          :dish="dish"
          @deleted="deletedDish"
        />
      </div>
    </div>

    <q-dialog v-model="addFormDish" persistent>
      <q-card style="min-width: 350px">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Добавить блюдо</div>
          <q-space />
          <q-btn icon="fas fa-times" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="q-pt-md">
          <q-form @submit.prevent="addDishHandler">
            <q-input
              outlined
              placeholder="Название"
              v-model="addForm.name"
              :error="$v.addForm.name.$error"
            />
            <q-input
              outlined
              type="textarea"
              placeholder="Описание"
              v-model="addForm.description"
              :error="$v.addForm.description.$error"
            />
            <q-input
              outlined
              placeholder="Изображение"
              v-model="addForm.urlImage"
              :error="$v.addForm.urlImage.$error"
            />
            <q-btn
              flat
              label="add"
              type="submit"
              class="full-width text-primary"
            />
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { required } from "vuelidate/lib/validators";

export default {
  name: "Dishes",
  data: () => ({
    dishes: [],
    addFormDish: false,
    addForm: {
      name: "",
      description: "",
      urlImage: "",
    },
  }),
  validations: {
    addForm: {
      name: { required },
      description: { required },
      urlImage: { required },
    },
  },
  computed: {},
  methods: {
    ...mapActions(["LoadDishes", "AddDish"]),
    setup() {
      this.LoadDishes()
        .then((resp) => {
          this.dishes = resp.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    removeItemOnce(arr, value) {
      var index = arr.indexOf(value);
      if (index > -1) {
        arr.splice(index, 1);
      }
      return arr;
    },
    showDish() {
      this.viewDish = true;
    },
    addDishHandler() {
      this.$v.addForm.$touch();

      if (this.$v.addForm.$error) {
        this.$q.notify("Заполните все поля");
        return;
      }

      this.AddDish(this.addForm)
        .then((resp) => {
          this.$q.notify("Блюдо Добавлено");
          this.dishes.push(resp.data);
        })
        .catch((err) => {
          this.$q.notify(err);
        });
    },
    deletedDish(val) {
      this.removeItemOnce(this.dishes, val);
    },
  },
  mounted() {
    this.setup();
  },
  components: {
    DishCard: () => import("../../components/DishCard"),
  },
};
</script>
