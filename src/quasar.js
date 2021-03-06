import Vue from "vue";
import langRu from "quasar/lang/ru";
import "./styles/quasar.styl";
import iconSet from "quasar/icon-set/fontawesome-v5.js";
import "@quasar/extras/roboto-font/roboto-font.css";
import "@quasar/extras/fontawesome-v5/fontawesome-v5.css";
import { Quasar, QTooltip, Notify } from "quasar";

Vue.use(Quasar, {
  config: {},
  plugins: { Notify },
  iconSet: iconSet,
  components: {
    QTooltip,
  },
  lang: langRu,
});
