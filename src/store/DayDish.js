import axios from "axios";
import { getRootApi } from "./index";

export default {
  actions: {
    LoadDayDish() {
      return axios({
        url: getRootApi("api/daydish"),
      });
    },
    AddDayDish(store, data) {
      return axios({
        method: "POST",
        url: getRootApi("api/daydish"),
        data,
      });
    },
    DeleteDayDish(store, id) {
      return axios({
        method: "DELETE",
        url: getRootApi("api/daydish"),
        data: {
          id,
        },
      });
    },
    UpdateDayDish(store, data) {
      return axios({
        method: "PUT",
        url: getRootApi("api/daydish"),
        data,
      });
    },
  },
};
