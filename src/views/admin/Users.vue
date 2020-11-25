<template>
  <div class="q-pa-xl">
    <div class="row items-center justify-between">
      <div class="col-12 col-md-6">
        <h2 class="text-center">Пользователи</h2>
      </div>
      <div class="col-12 col-md-6">
        <div class="row justify-center">
          <q-btn-group flat rounded class="q-ma-lg">
            <q-btn
              rounded
              color="primary"
              size="md"
              padding="md"
              icon="fa fa-user-plus"
              @click="addUserDialog = true"
            >
              <q-tooltip>
                Добавить пользователя
              </q-tooltip>
            </q-btn>
            <q-btn
              rounded
              color="primary"
              size="md"
              padding="md"
              icon="fa fa-user-minus"
              :disable="!selected.length > 0"
              @click="deleteUser()"
            >
              <q-tooltip>
                Удалить пользователя
              </q-tooltip>
            </q-btn>
            <q-btn
              rounded
              color="primary"
              size="md"
              padding="md"
              icon="fa fa-key"
              @click="setPassword = true"
              :disable="!selected.length > 0 || selected.length > 1"
            >
              <q-tooltip>
                Сменить пароль
              </q-tooltip>
            </q-btn>
          </q-btn-group>
        </div>
      </div>
    </div>
    <div>
      <q-table
        :data="items"
        :columns="columns"
        row-key="_id"
        selection="multiple"
        :selected.sync="selected"
      >
      </q-table>
      <div class="q-pa-lg flex flex-center">
        <q-pagination
          v-show="pageCount > 1"
          v-model="page"
          :max="pageCount"
          :input="false"
          :direction-links="true"
          :boundary-links="true"
        >
        </q-pagination>
      </div>
    </div>

    <q-dialog v-model="setPassword" persistent>
      <q-card style="min-width: 450px">
        <q-card-section>
          <div class="text-h6">Новый пароль</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            v-model="newPassword"
            autofocus
            @keyup.enter="setPassword = false"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Выход" v-close-popup />
          <q-btn
            flat
            label="Сохранить"
            v-close-popup
            @click="setPasswordUser"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="addUserDialog" persistent>
      <q-card style="min-width: 450px">
        <q-form @submit="signUp">
          <q-card-section>
            <div class="text-h6">Новый Пользователь</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-input
              v-model="addUserForm.FIO"
              label="ФИО"
              autofocus
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Введите пожалуйста ФИО',
              ]"
            />
            <q-input
              v-model="addUserForm.Login"
              label="Логин"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Введите пожалуйста логин',
              ]"
            />
            <q-input
              v-model="addUserForm.Password"
              label="Пароль"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Введите пожалуйста пароль',
              ]"
            />
            <q-checkbox v-model="addUserForm.isAdmin" label="Администратор" />
          </q-card-section>

          <q-card-actions align="center" class="text-primary">
            <q-btn flat label="Выход" v-close-popup />
            <q-btn flat label="Добавить" type="submit" />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import PaginationMixin from "../../mixins/pagination.mixin";
import { Notify } from "quasar";

export default {
  name: "Users",
  mixins: [PaginationMixin],
  data() {
    return {
      newPassword: "",
      setPassword: false,
      addUserDialog: false,
      addUserForm: {
        FIO: "",
        Login: "",
        Password: "",
        isAdmin: false,
      },
      columns: [
        {
          name: "username",
          label: "ФИО",
          field: "username",
          align: "left",
          sortable: true,
        },
        {
          name: "login",
          label: "Логин",
          field: "login",
          align: "left",
          sortable: true,
        },
      ],
      selected: [],
      page: 1,
    };
  },
  computed: {
    isSelected() {
      if (this.selected.length > 0) {
        return true;
      } else {
        return false;
      }
    },
  },
  mounted() {
    this.$store.dispatch("LoadUsers").then((resp) => {
      this.setupPagination(resp.data);
    });
  },
  methods: {
    deleteUser() {
      this.selected.forEach((item) => {
        this.$store
          .dispatch("DeleteUser", item._id)
          .then(() => {
            this.addUserDialog = false;
            this.$store.dispatch("LoadUsers").then((resp) => {
              this.setupPagination(resp.data);
            });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    },
    setPasswordUser() {
      this.$store
        .dispatch("SetPassword", {
          id: this.selected[0]._id,
          password: this.newPassword,
        })
        .then(() => {
          this.newPassword = "";
          this.setPassword = false;
          this.$store.dispatch("LoadUsers").then((resp) => {
            this.setupPagination(resp.data);
          });
        })
        .catch((err) => {
          this.$q.notify({
            message: err,
            color: "danger",
          });
        });
    },
    signUp() {
      this.$store
        .dispatch("SignUp", {
          Login: this.addUserForm.Login,
          Password: this.addUserForm.Password,
          FIO: this.addUserForm.FIO,
          isAdmin: this.addUserForm.isAdmin,
        })
        .then(() => {
          this.$store.dispatch("LoadUsers").then((resp) => {
            this.setupPagination(resp.data);
          });
          this.addUserForm.Password = "";
          this.addUserForm.Login = "";
          this.addUserForm.FIO = "";
          this.addUserForm.isAdmin = false;
          this.addUserDialog = false;
        })
        .catch((err) => {
          Notify.create({
            message: err,
          });
        });
    },
  },
};
</script>
