import _ from "lodash";

export default {
  data: () => ({
    page: 1,
    pageSize: 5,
    pageCount: 0,
    allItems: [],
    items: [],
  }),
  watch: {
    page: function(val) {
      this.items = this.allItems[val - 1];
    },
  },
  methods: {
    setupPagination(allItems) {
      this.allItems = _.chunk(allItems, this.pageSize);
      this.pageCount = _.size(this.allItems);
      console.log(this.allItems);
      this.items = this.allItems[this.page - 1] || this.allItems[0];
    },
  },
};
