import axios from "axios";
import { getRootApi } from "./index";

export default {
  actions: {
    LoadMealTimes() {
      return axios({
        url: getRootApi("api/mealtime"),
      });
    },
    AddMealTime(store, data) {
      return axios({
        method: "POST",
        url: getRootApi("api/mealtime"),
        data: data,
      });
    },
    DeleteMealTime(store, id) {
      return axios({
        method: "DELETE",
        url: getRootApi("api/mealtime"),
        data: { id: id },
      });
    },
    UpdateMealTime(store, data) {
      return axios({
        method: "PUT",
        url: getRootApi("api/mealtime"),
        data,
      });
    },
  },
};
