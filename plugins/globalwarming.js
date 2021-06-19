import Vue from 'vue';

// import Vuetify from 'vuetify';
// import 'vuetify/dist/vuetify.min.css';

// Vue.use(Vuetify);


//the methods here will be used throughout the app
Vue.mixin({
  methods: {

    async callApi(method, url, dataBody) {
      try {
        let data = await this.$axios({
          headers: {
            'Access-Control-Allow-Origin' : '*',
          },
          method: method,
          url: url,
          data: dataBody,
        })
        .catch(e => {
          return false;
        })

        return data;
      }
      catch(e) {
        return e.response
      }
    },

  }
})
