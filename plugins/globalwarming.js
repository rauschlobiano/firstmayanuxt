import Vue from 'vue';
import VueHtmlToPaper from 'vue-html-to-paper';

const options = {
  name: '_blank',
  specs: [
    'fullscreen=yes',
    'titlebar=yes',
    'scrollbars=yes'
  ],
  styles: [
    // 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
    // 'https://unpkg.com/kidlat-css/css/kidlat.css'
    'https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.min.css',
    './reportcss.css'
  ],
  timeout: 1000, // default timeout before the print window appears
  autoClose: true, // if false, the window will not close after printing
  //windowTitle: window.document.title, // override the window title
}

Vue.use(VueHtmlToPaper, options);


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
