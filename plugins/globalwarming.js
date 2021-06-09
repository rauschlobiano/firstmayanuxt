import Vue from 'vue';

import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);


//the methods here will be used throughout the app
Vue.mixin({
  methods: {
    async callApi(method, url, dataParams) {
      try {
        let data = await this.$axios({
          method: method,
          url: url,
          params: dataParams
        })
        return data;
      }
      catch(e) {
        return e.response
      }
    },

  }
})
