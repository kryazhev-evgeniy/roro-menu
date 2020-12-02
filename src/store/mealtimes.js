import axios from "axios";
import { getRootApi } from "./index";

export default {
  actions: {
    LoadMealTimes() {
      return axios({
        url: getRootApi("api/mealtime"),
      });
    },
  },
};
