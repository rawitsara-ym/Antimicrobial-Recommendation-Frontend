export default {
  data() {
    return {
      host: process.env.VUE_APP_HOST,
    };
  },
  methods: {
    upperFirst(str) {
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    },
    sortObjectByName(obj) {
      obj.sort((a, b) => {
        let a_name = a.name.toLowerCase();
        let b_name = b.name.toLowerCase();
        if (a_name < b_name) {
          return -1;
        }
        if (a_name > b_name) {
          return 1;
        }
        return 0;
      });
      return obj;
    },
    convertTime(seconds) {
      return new Date(seconds * 1000).toISOString().substr(11, 8);
    },
  },
};
