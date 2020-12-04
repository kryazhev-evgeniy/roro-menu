<template>
  <div class="q-ma-lg">
    <header>
      <q-btn
        class="q-ma-md"
        color="primary"
        label="Добавить"
        @click="dialogs.addDayDish.active = true"
      />
    </header>
    <q-list bordered class="rounded-borders">
      <q-expansion-item
        v-for="(daydish, index) in daydishes"
        :key="index"
        expand-separator
        :label="daydish.date"
        group="daydishgroup"
      >
        <q-card>
          <q-card-section>
            <div class="row justify-end">
              <q-btn
                flat
                round
                class="q-pa-md"
                color="primary"
                icon="fas fa-trash-alt"
                @click="deletedDayDish(daydish._id)"
              />
              <q-btn
                flat
                round
                class="q-pa-md"
                color="primary"
                icon="fas fa-edit"
                @click="editDayDish(daydish)"
              />
            </div>
            <MealTime
              v-for="(mealtime, index) in daydish.mealTimes"
              :key="index"
              :mealTime="mealtime"
              @deleted="deleteMealtimeDayDish"
              :readOnly="true"
            />
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>

    <q-dialog v-model="dialogs.addDayDish.active" full-width full-height>
      <q-card>
        <q-card-section>
          <p class="text-h4">Длбавить меню на день</p>
        </q-card-section>
        <q-card-section>
          <q-input
            class="q-mr-lg"
            filled
            v-model="dialogs.addDayDish.date"
            mask="date"
            :rules="['date']"
          >
            <template v-slot:append>
              <q-icon name="fas fa-calendar-week" class="cursor-pointer">
                <q-popup-proxy
                  ref="qDateProxy"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="date">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </q-card-section>
        <q-card-section>
          <q-table
            :data="mealtimes"
            grud
            :selected.sync="dialogs.addDayDish.mealtimes"
            grid
            row-key="_id"
            selection="multiple"
            hide-header
          >
            <template v-slot:item="props">
              <div class="q-pa-xs col-12 grid-style-transition">
                <q-card :class="props.selected ? 'bg-grey-2' : ''">
                  <q-card-section>
                    <q-checkbox
                      dense
                      v-model="props.selected"
                      :label="props.row.name"
                    />
                  </q-card-section>
                  <q-card-section>
                    <MealTime :mealTime="props.row" :readOnly="true" />
                  </q-card-section>
                </q-card>
              </div>
            </template>
          </q-table>
        </q-card-section>
        <q-card-actions>
          <q-btn label="Добавить" @click="addDayDish" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="dialogs.editDayDish.active" full-width full-height>
      <q-card>
        <q-card-section>
          <p class="text-h4">Длбавить меню на день</p>
        </q-card-section>
        <q-card-section>
          <q-input
            class="q-mr-lg"
            filled
            v-model="dialogs.editDayDish.daydish.date"
            mask="date"
            :rules="['date']"
          >
            <template v-slot:append>
              <q-icon name="fas fa-calendar-week" class="cursor-pointer">
                <q-popup-proxy
                  ref="qDateProxy"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="date">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </q-card-section>

        <q-card-section>
          <q-btn
            label="Добавить"
            color="primary"
            @click="dialogs.editDayDish.addMealTime.active = true"
          />
          <q-dialog
            v-model="dialogs.editDayDish.addMealTime.active"
            full-height
            full-width
          >
            <q-card>
              <q-card-section>
                <p class="text-h3">Добавить приём пищи</p>
              </q-card-section>

              <q-card-section>
                <q-table
                  :data="mealtimes"
                  grud
                  :selected.sync="dialogs.editDayDish.addMealTime.mealTimes"
                  grid
                  row-key="_id"
                  selection="multiple"
                  hide-header
                >
                  <template v-slot:item="props">
                    <div class="q-pa-xs col-12 grid-style-transition">
                      <q-card :class="props.selected ? 'bg-grey-2' : ''">
                        <q-card-section>
                          <q-checkbox
                            dense
                            v-model="props.selected"
                            :label="props.row.name"
                          />
                        </q-card-section>
                        <q-card-section>
                          <MealTime :mealTime="props.row" :readOnly="true" />
                        </q-card-section>
                      </q-card>
                    </div>
                  </template>
                </q-table>
              </q-card-section>

              <q-card-section>
                <q-btn label="Добавить" @click="addEditDayDishMealtime" />
              </q-card-section>
            </q-card>
          </q-dialog>
        </q-card-section>

        <q-card-section>
          <q-table
            :data="dialogs.editDayDish.daydish.mealTimes"
            grid
            row-key="_id"
            hide-header
          >
            <template v-slot:item="props">
              <div class="q-pa-xs col-12 grid-style-transition">
                <q-card :class="props.selected ? 'bg-grey-2' : ''">
                  <q-card-section>
                    <q-btn
                      flat
                      round
                      class="q-pa-md"
                      color="primary"
                      icon="fas fa-trash-alt"
                      @click="deleteMealtimeforEdit(props.row)"
                    />
                    <MealTime :mealTime="props.row" :readOnly="true" />
                  </q-card-section>
                </q-card>
              </div>
            </template>
          </q-table>
        </q-card-section>
        <q-card-actions>
          <q-btn label="Сохранить" @click="submitEditDayDish" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  data: () => ({
    dialogs: {
      addDayDish: {
        active: false,
        edit: false,
        date: "2019/02/01",
        mealtimes: [],
      },
      editDayDish: {
        active: false,
        daydish: {},
        addMealTime: {
          active: false,
          mealTimes: [],
        },
      },
    },
    mealtimes: [],
    daydishes: [],
  }),
  components: {
    MealTime: () => import("../../components/MealTime"),
  },
  computed: {},
  mounted() {
    this.$store.dispatch("LoadDayDish").then((resp) => {
      this.daydishes = resp.data;
    });
    this.$store.dispatch("LoadMealTimes").then((Response) => {
      this.mealtimes = Response.data;
    });
  },
  methods: {
    addDayDish() {
      this.$store
        .dispatch("AddDayDish", {
          date: this.dialogs.addDayDish.date,
          mealTimes: this.dialogs.addDayDish.mealtimes.map((item) => {
            return item._id;
          }),
        })
        .then(() => {
          this.dialogs.addDayDish.active = false;
          this.dialogs.addDayDish.mealtimes = [];
          this.$q.notify("Добавлено меню надень");

          this.$store.dispatch("LoadDayDish").then((resp) => {
            this.daydishes = resp.data;
          });
          this.$store.dispatch("LoadMealTimes").then((Response) => {
            this.mealtimes = Response.data;
          });
        });
    },
    deletedDayDish(id) {
      this.$store.dispatch("DeleteDayDish", id).then(() => {
        this.$store.dispatch("LoadDayDish").then((resp) => {
          this.daydishes = resp.data;
        });
        this.$q.notify(`Удалено`);
      });
    },

    editDayDish(daydish) {
      this.dialogs.editDayDish.daydish = daydish;
      this.dialogs.editDayDish.active = true;
    },
    submitEditDayDish() {
      this.$store
        .dispatch("UpdateDayDish", {
          id: this.dialogs.editDayDish.daydish._id,
          new: {
            date: this.dialogs.editDayDish.daydish.data,
            mealTimes: this.dialogs.editDayDish.daydish.mealTimes.map(
              (item) => {
                return item._id;
              }
            ),
          },
        })
        .then(() => {
          this.dialogs.editDayDish.active = false;
          this.$q.notify(`Изменино меню дня`);
        });
    },
    deleteMealtimeforEdit(row) {
      var index = this.dialogs.editDayDish.daydish.mealTimes.indexOf(row);
      if (index > -1) {
        this.dialogs.editDayDish.daydish.mealTimes.splice(index, 1);
      }
    },
    addEditDayDishMealtime() {
      this.dialogs.editDayDish.addMealTime.mealTimes.forEach((item) => {
        this.dialogs.editDayDish.daydish.mealTimes.push(item);
      });
      this.dialogs.editDayDish.addMealTime.active = false;
    },
  },
};
</script>

<style></style>
