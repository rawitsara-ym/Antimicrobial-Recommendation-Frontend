export default {
  data() {
    return {
      host: "http://localhost:8000",
      lastest_version: 5,
      antimicrobial_name: [
        "amikacin",
        "amoxicillin/clavulanic acid",
        "cefalexin",
        "cefovecin",
        "doxycycline",
        "enrofloxacin",
        "gentamicin",
        "imipenem",
        "marbofloxacin",
        "nitrofurantoin",
        "trimethoprim/sulfamethoxazole",
      ],
      api_anti: [
        {
          version: 1,
          accuracy: 0.88,
          precision: 0.66,
          recall: 0.84,
          f1: 0.78
        },
        {
          version: 2,
          accuracy: 0.99,
          precision: 0.85,
          recall: 0.91,
          f1: 0.88
        },
        {
          version: 3,
          accuracy: 0.98,
          precision: 0.76,
          recall: 0.44,
          f1: 0.68
        },
        {
          version: 4,
          accuracy: 0.98,
          precision: 0.76,
          recall: 0.44,
          f1: 0.68
        },
        {
          version: 5,
          accuracy: 0.99,
          precision: 0.85,
          recall: 0.91,
          f1: 0.88
        },
      ],
      api_perf: [
        {
          antimicrobial: "amikacin",
          version: 1,
          accuracy: 0.944,
          precision: 0.766,
          recall: 0.814,
          f1: 0.795,
          performance: 'better'
        },
        {
          antimicrobial: "amoxicillin/clavulanic acid",
          version: 1,
          accuracy: 0.944,
          precision: 0.766,
          recall: 0.814,
          f1: 0.795,
          performance: 'better'
        },
        {
          antimicrobial: "cefalexin",
          version: 2,
          accuracy: 0.944,
          precision: 0.766,
          recall: 0.814,
          f1: 0.795,
          performance: 'worse'
        },
        {
          antimicrobial: "cefovecin",
          version: 3,
          accuracy: 0.944,
          precision: 0.766,
          recall: 0.814,
          f1: 0.795,
          performance: 'better'
        },
        {
          antimicrobial: "doxycycline",
          version: 3,
          accuracy: 0.944,
          precision: 0.766,
          recall: 0.814,
          f1: 0.795,
          performance: 'better'
        },
        {
          antimicrobial: "enrofloxacin",
          version: 3,
          accuracy: 0.944,
          precision: 0.766,
          recall: 0.814,
          f1: 0.795,
          performance: 'same'
        },
        {
          antimicrobial: "gentamicin",
          version: 1,
          accuracy: 0.944,
          precision: 0.766,
          recall: 0.814,
          f1: 0.795,
          performance: 'better'
        },
        {
          antimicrobial: "imipenem",
          version: 3,
          accuracy: 0.944,
          precision: 0.766,
          recall: 0.814,
          f1: 0.795,
          performance: 'worse'
        },
        {
          antimicrobial: "marbofloxacin",
          version: 2,
          accuracy: 0.944,
          precision: 0.766,
          recall: 0.814,
          f1: 0.795,
          performance: 'worse'
        },
        {
          antimicrobial: "nitrofurantoin",
          version: 1,
          accuracy: 0.944,
          precision: 0.766,
          recall: 0.814,
          f1: 0.795,
          performance: 'better'
        },
        {
          antimicrobial: "trimethoprim/sulfamethoxazole",
          version: 2,
          accuracy: 0.944,
          precision: 0.766,
          recall: 0.814,
          f1: 0.795,
          performance: 'better'
        },
        {
          antimicrobial: "All Model By Case",
          version: '-',
          accuracy: 0.944,
          precision: 0.766,
          recall: 0.814,
          f1: 0.795,
          performance: 'better'
        },
      ],
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
