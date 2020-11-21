<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class='bg-dark'>
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
          admin
        </q-toolbar-title>

        <div>...</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
    >
      <q-list v-if="$store.getters.isAuth">
        <q-item-label header class="bg-dark text-white">
          menu
        </q-item-label>

        <q-item clickable tag="router-link" to="/about">
          <q-item-section avatar>
            <q-icon name="fas fa-graduation-cap" />
          </q-item-section>
          <q-item-section>
            <q-item-label>About</q-item-label>
            <q-item-label caption>about</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable tag="router-link" to="/home">
          <q-item-section avatar>
            <q-icon name="fas fa-graduation-cap" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Home</q-item-label>
            <q-item-label caption>home</q-item-label>
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
</template>

<script>

export default {
  name: 'LayoutDefault',

  components: {
  },

  data () {
    return {
      leftDrawerOpen: false,
      dark: false
    }
  }
}
</script>

<style>
</style>
