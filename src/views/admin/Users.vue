<template>
  <div class="q-pa-xl">
    <div class="row items-center justify-between">
      <h2>Пользователи</h2>
      <div>
        <q-btn-group flat rounded>
          <q-btn
            rounded
            color="primary"
            size="md"
            padding="md"
            icon="fa fa-user-plus"
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
            :disable="!isSelected"
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
            :disable="!isSelected"
          >
            <q-tooltip>
              Сменить пароль
            </q-tooltip>
          </q-btn>
        </q-btn-group>
      </div>
    </div>
    <div>
      <q-table
        :data="users"
        :columns="columns"
        row-key="_id"
        selection="single"
        :selected.sync="selected"
      />
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
        <q-card-section>
          <div class="text-h6">Новый Пользователь</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input v-model="addUserForm.FIO" label="ФИО" autofocus />
          <q-input v-model="addUserForm.Login" label="Логин" />
          <q-input v-model="addUserForm.Password" label="Пароль" />
          <q-checkbox v-model="addUserForm.isAdmin" label="Администратор" />
        </q-card-section>

        <q-card-actions align="center" class="text-primary">
          <q-btn flat label="Выход" v-close-popup />
          <q-btn flat label="Добавить" v-close-popup @click="signUp" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { Notify } from "quasar";

export default {
  name: "Users",
  data() {
    return {
      newPassword: "",
      setPassword: false,
      addUserDialog: true,
      addUserForm: {
        FIO: "",
        Login: "",
        Password: "",
        isAdmin: false,
      },
      users: [],
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
      this.users = resp.data;
    });
  },
  methods: {
    deleteUser() {
      this.$store
        .dispatch("DeleteUser", this.selected[0]._id)
        .then(() => {
          this.$store.dispatch("LoadUsers").then((resp) => {
            this.users = resp.data;
          });
        })
        .catch((err) => {
          console.log(err);
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
            this.users = resp.data;
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
