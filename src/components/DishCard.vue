<template>
  <div class="col-12 col-sm-6 col-md-4">
    <q-card class="shadow-0 q-ma-sm">
      <q-img :src="dish.urlImage">
        <div class="absolute-bottom">
          <div class="text-h5 text-center">{{ dish.name }}</div>
        </div>
      </q-img>
      <q-card-actions align="center" v-if="!readOnly">
        <q-btn
          flat
          color="primary"
          icon="fas fa-trash-alt"
          @click="deleteDish()"
        >
        </q-btn>
        <q-btn
          flat
          color="primary"
          icon="fas fa-edit"
          @click="viewEditDish = true"
        />
        <q-btn
          flat
          color="primary"
          icon="fas fa-eye"
          v-if="dish.description.length > 0"
          @click="viewDish = true"
        />
      </q-card-actions>
    </q-card>
    <q-dialog v-model="viewDish">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">{{ dish.name }}</div>
          <q-space />
          <q-btn icon="fas fa-times" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          {{ dish.description }}
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="viewEditDish" persistent>
      <q-card style="min-width: 350px">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Редактировать блюдо</div>
          <q-space />
          <q-btn icon="fas fa-times" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="q-pt-md">
          <q-form @submit.prevent="editDish">
            <q-input outlined placeholder="Название" v-model="dish.name" />
            <q-input
              outlined
              type="textarea"
              placeholder="Описание"
              v-model="dish.description"
            />
            <q-input
              outlined
              placeholder="Изображение"
              v-model="dish.urlImage"
            />
            <q-btn
              flat
              label="Сохранить"
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
export default {
  name: "DishCard",
  props: {
    dish: Object,
    readOnly: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    viewDish: false,
    viewEditDish: false,
  }),
  methods: {
    deleteDish() {
      this.$store
        .dispatch("DeleteDish", this.dish)
        .then(() => {
          this.$q.notify("Блюдо Удалено");
          this.$emit("deleted", this.dish);
        })
        .catch((err) => {
          this.$q.notify(err);
        });
    },
    editDish() {
      this.$store
        .dispatch("UpdateDish", {
          id: this.dish,
          new: {
            name: this.dish.name,
            description: this.dish.description,
            urlImage: this.dish.urlImage,
          },
        })
        .then((resp) => {
          this.viewEditDish = false;
          this.$q.notify(`Блюдо ${resp.data.name} сохранено`);
        })
        .catch((err) => {
          this.$q.notify(err);
        });
    },
  },
};
</script>
