<template>
  <div class="wrapper">
    <q-layout view="lHh Lpr lFf" v-show="!splashScreen">
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
            <q-btn flat dense round color="white" icon="fas fa-cog">
              <q-menu>
                <div class="row no-wrap q-pa-md">
                  <div class="column">
                    <div class="text-h6 q-mb-md text-center">Настройки</div>
                    <q-toggle v-model="darkMode" label="Тёмная тема" />
                  </div>
                </div>
              </q-menu>
            </q-btn>
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

          <q-item
            clickable
            tag="router-link"
            to="/admin/dishes"
            v-if="$store.getters.User.isAdmin"
          >
            <q-item-section avatar>
              <q-icon name="fas fa-users-cog" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Блюда</q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            clickable
            tag="router-link"
            to="/admin/mealtime"
            v-if="$store.getters.User.isAdmin"
          >
            <q-item-section avatar>
              <q-icon name="fas fa-users-cog" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Приёмы пищи</q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            clickable
            tag="router-link"
            to="/admin/daydish"
            v-if="$store.getters.User.isAdmin"
          >
            <q-item-section avatar>
              <q-icon name="fas fa-users-cog" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Дни меню</q-item-label>
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
    </q-layout>
    <q-layout view="1Hh Lpr 1Ff" v-show="splashScreen">
      <div class="row justify-center q-mt-xl">
        <h1 class="self-center text-center">Добро пожаловать</h1>
      </div>
    </q-layout>
  </div>
</template>

<script>
import { Notify, Dark } from "quasar";

export default {
  name: "LayoutDefault",
  components: {},
  computed: {
    darkMode: {
      get: () => {
        return Dark.mode;
      },
      set: (newValue) => {
        Dark.set(newValue);
      },
    },
  },
  data() {
    return {
      leftDrawerOpen: false,
      splashScreen: false,
      routes: [
        { icon: "fas fa-home", auth: false, title: "Главная", link: "/" },
        {
          icon: "fas fa-users-cog",
          auth: false,
          title: "Пользователи",
          link: "/",
        },
      ],
    };
  },
  methods: {
    logOut() {
      this.$store
        .dispatch("LogOut")
        .then(() => {
          this.$router.push("/");
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
