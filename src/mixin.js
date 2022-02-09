export default {
  data() {
    return {
      host: "http://localhost:8000",
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
  },
};
