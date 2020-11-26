import axios from "axios";
import { getRootApi } from "./index";

export default {
  actions: {
    LoadDishes() {
      return axios({
        url: getRootApi("api/dish"),
      });
    },
    // eslint-disable-next-line no-unused-vars
    AddDish({ commit }, data) {
      return axios({
        method: "POST",
        url: getRootApi("api/dish"),
        data: data,
      });
    },
    // eslint-disable-next-line no-unused-vars
    DeleteDish({ commit }, data) {
      return axios({
        method: "DELETE",
        url: getRootApi("api/dish"),
        data: {
          id: data._id,
        },
      });
    },
  },
};
