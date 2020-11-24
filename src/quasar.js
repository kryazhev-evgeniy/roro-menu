import Vue from "vue";

import "./styles/quasar.styl";
import iconSet from "quasar/icon-set/fontawesome-v5.js";
import "@quasar/extras/roboto-font/roboto-font.css";
import "@quasar/extras/fontawesome-v5/fontawesome-v5.css";
import { Quasar, QTooltip } from "quasar";

Vue.use(Quasar, {
  config: {},
  plugins: {},
  iconSet: iconSet,
  components: {
    QTooltip,
  },
});
