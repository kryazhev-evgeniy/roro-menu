<template>
  <q-layout view="lHh Lpr lFf" dark>
    <q-header elevated class="bg-dark">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="fas fa-bars"
        />

        <q-toolbar-title>
          {{ $store.getters.User.name }}
        </q-toolbar-title>

        <div>
          <q-btn
            flat
            dense
            round
            color="white"
            icon="fas fa-cog"
            @click="settings = !settings"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen">
      <q-list v-if="$store.getters.isAuth">
        <q-item-label header class="bg-dark text-white">
          {{ $store.getters.User.name }}
        </q-item-label>

        <q-item clickable tag="router-link" to="/">
          <q-item-section avatar>
            <q-icon name="fas fa-home" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Главная</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable @click="logOut()">
          <q-item-section avatar>
            <q-icon name="fas fa-sign-out-alt" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Выход</q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          clickable
          tag="router-link"
          to="/admin/users"
          v-if="$store.getters.User.isAdmin"
        >
          <q-item-section avatar>
            <q-icon name="fas fa-users-cog" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Пользватели</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>

      <q-list v-if="!$store.getters.isAuth">
        <q-item-label header>
          Вы не авторизованы
        </q-item-label>

        <q-item clickable tag="router-link" to="/">
          <q-item-section avatar>
            <q-icon name="fas fa-home" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Главная</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable tag="router-link" to="/signin">
          <q-item-section avatar>
            <q-icon name="fas fa-sign-in-alt" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Войти</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable tag="router-link" to="/signup">
          <q-item-section avatar>
            <q-icon name="fas fa-user-plus" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Зарегистрироватся</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view></router-view>
    </q-page-container>

    <q-dialog v-model="settings">
      <q-card>
        <q-card-section>
          <div class="text-h6">Настройки</div>
        </q-card-section>

        <q-card-section class="q-pt-none"> </q-card-section>

        <q-card-actions align="center">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script>
import { Notify } from "quasar";
export default {
  name: "LayoutDefault",

  components: {},

  data() {
    return {
      leftDrawerOpen: false,
      settings: false,
    };
  },
  methods: {
    logOut() {
      this.$store
        .dispatch("LogOut")
        .then(() => {
          Notify.create({
            message: `Вышел пользователь`,
          });
        })
        .catch((error) => {
          Notify.create({
            message: error,
          });
        });
    },
  },
};
</script>

<style>
/* хром, сафари */
*::-webkit-scrollbar {
  width: 0;
}

/* ie 10+ */
* {
  -ms-overflow-style: none;
}

/* фф (свойство больше не работает, других способов тоже нет)*/
* {
  overflow: -moz-scrollbars-none;
}
</style>
