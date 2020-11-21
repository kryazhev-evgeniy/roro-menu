import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

function getRootApi(path) {
  return `http://localhost:3000/${path}`;
}

const store = new Vuex.Store({
  state: {
    User: JSON.parse(localStorage.getItem("user")) || {},
    Token: localStorage.getItem("token"),
  },
  mutations: {
    setToken(state, token) {
      state.Token = token;
      axios.defaults.headers.common["Authorization"] = token;
      localStorage.setItem("token", token);
    },
    setUser(state, data) {
      state.User = data;
      localStorage.setItem("user", JSON.stringify(data));
    },
  },
  getters: {
    isAuth({ Token }) {
      return !!Token;
    },
    User({ User }) {
      return User;
    },
  },
  actions: {
    SignIn({ commit }, dataUser) {
      return new Promise((resolve, reject) => {
        axios({
          method: "POST",
          url: getRootApi("api/user/auth"),
          data: {
            login: dataUser.login,
            password: dataUser.password,
          },
        })
          .then((resp) => {
            commit("setToken", `Bearer ${resp.data.token}`);
            commit("setUser", resp.data.user);
            resolve(resp);
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      });
    },
    SignUp(context, data) {
      return new Promise((resolve, reject) => {
        axios({
          method: "POST",
          url: getRootApi("api/user"),
          data: {
            login: data.Login,
            password: data.Password,
            username: data.FIO,
            isAadmin: data.isAadmin,
          },
        })
          .then((resp) => {
            resolve(resp);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    LogOut({ commit }) {
      return new Promise((resolve, reject) => {
        try {
          commit("setToken", "");
          commit("setUser", {});
          delete axios.defaults.headers.common["Authorization"];
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    },
  },
});

export default store;
