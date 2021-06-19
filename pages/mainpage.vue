<template>
<v-app>
    <v-app-bar app color="deep-purple" dense dark fixed>
      <v-toolbar-title>Valhalla Goods Inc.</v-toolbar-title>
      <h1 class="mx-4" style="color: gray">|</h1>
      <v-btn @click="clickProfile" icon>
        <v-icon>mdi-account-group</v-icon>
      </v-btn>

      <v-btn @click="clickItem" icon>
        <v-icon>mdi-cart</v-icon>
      </v-btn>

      <v-btn @click="clickSellItem" icon>
        <v-icon>mdi-printer-pos</v-icon>
      </v-btn>

    </v-app-bar>
    <v-main>
    <v-row>
      <!-- adding data-app to prevent error in v-select element -->
      <div data-app>
      <ProfileComponent :showprofileflag="showhideprof" @profileformclose="closeFromProfile" @reupdateproflist="getallprofiles">
      </ProfileComponent>
      </div>

      <div data-app>
      <ItemComponent :showflag="showhideitem" @formclose="closeFromItem" @reupdateitemlist="getallitems">
      </ItemComponent>
      </div>

      <div data-app>
      <SellItemComponent :showflag="showhidesellitem"  @formclose="closeFromSellItem">
      </SellItemComponent>
      </div>

      <v-card class="mx-auto mt-10" height="80" width="300" v-if="!connected">
        <v-row class="my-auto">
          <v-col class="text-center">
              <h4 style="color: maroon">Not connected to server!</h4>
          </v-col>
        </v-row>
        <v-row>

        </v-row>
      </v-card>

    </v-row>
</v-main>


  </v-app>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'

  import ProfileComponent from '~/components/ProfileComponent'
  import ItemComponent from '~/components/ItemComponent'
  import SellItemComponent from '~/components/SellItemComponent'

export default {
  components: {
    ProfileComponent, ItemComponent, SellItemComponent,
  },
  data: function () {
    return {
      ...mapState(['counter','profileslistdata','profiletypedata']),
      showhideprof: false,
      showhideitem: false,
      showhidesellitem: false,
      connected: true,
    }
  },

  methods: {
    ...mapMutations(['mutateZindex','closeProfile', 'updateProfileList','updateProfileArray',
        'updateProfileTypeList', 'updateItemList', 'updateVendorList', 'updateItemArray',
        'updateItemSize', 'updateItemSizePiece', 'updateItemPrice', 'updatePriceCode',
        'updateGenderList', 'updateAccountStatsList', 'updateProfGroupList'
      ]),
    clickProfile() {
      //this.$store.dispatch('actionShowHideProfile')
      this.showhideprof = !this.showhideprof;

    },
    clickItem() {
      //this.$store.dispatch('actionShowHideProfile')
      this.showhideitem = !this.showhideitem
    },
    clickSellItem() {
      //this.$store.dispatch('actionShowHideProfile')
      this.showhidesellitem = !this.showhidesellitem
    },
    closeFromProfile(showhide){
      this.showhideprof = showhide
    },
    closeFromItem(showhide){
      this.showhideitem = showhide
    },
    closeFromSellItem(showhide){
      this.showhidesellitem = showhide
    },
    //profiles
    async getallprofiles(state){
      console.log('getting all profiles')
      let res = await this.callApi('get', '/profiles')
      this.updateProfileList(res.data)

      //create the profiles array
      let profarray = []
      res.data.forEach(element => {
        profarray.push(element.name)
      });
      this.updateProfileArray(profarray)
    },

    //items
    async getallitems(state){
      console.log('getting all items')
      let res = await this.callApi('get', '/items')
      this.updateItemList(res.data)

      let itemarray = []
      res.data.forEach(element => {
        itemarray.push(element.itemdescrip)
      });
      this.updateItemArray(itemarray)
    },
    async getallitemsizes(state){
      console.log('getting all item sizes')
      let res = await this.callApi('GET', '/itemsizes')
      this.updateItemSize(res.data)
    },
    async getallitemsizepieces(state){
      console.log('getting all item size pieces')
      let res = await this.callApi('GET', '/itemsizepieces')
      this.updateItemSizePiece(res.data)
    },
    async getallitemprices(state){
      console.log('getting all item prices')
      let res = await this.callApi('GET', '/itemprices')
      this.updateItemPrice(res.data)
    },

    //vendors
    async getallvendors(state){
      console.log('getting all vendors')
      let res = await this.callApi('get', '/profiles/suppliers')
      this.updateVendorList(res.data)
    },


    //taggings
    async getallprofilestypes(state){
      console.log('getting all profile types');
      let res = await this.callApi('get', '/taggings/proftypes');
      this.updateProfileTypeList(res.data);
    },
    async getallgenders(state){
      console.log('getting all genders')
      let res = await this.callApi('get', '/taggings/genders')
      this.updateGenderList(res.data)
    },
    async getallaccountstats(state){
      console.log('getting all account stats')
      let res = await this.callApi('get', '/taggings/accountstats')
      this.updateAccountStatsList(res.data)
    },
    async getallprofgroups(state){
      console.log('getting all account stats')
      let res = await this.callApi('get', '/taggings/profgroups')
      this.updateProfGroupList(res.data)
    },
    async getallpricecodes(state){
      console.log('getting all price codes')
      let res = await this.callApi('get', '/taggings/pricecodes')
      this.updatePriceCode(res.data)
    },
    async firstcheck(){
      try{
        console.log('Trying to connect to API....');
        let res = await this.callApi('GET', '/firstcheck');
        if(res.data){
          this.connected = true;
        }
        else {
          this.connected = false;
          console.log('API Connection attempt failed!');
        }
        console.log('Connected? : ' + this.connected);
      }catch(ex){
        this.connected = false;
      }
    },
    async retryconnection(){
      if(!this.connected){
        let timeleft = 5;
        setInterval(() => {

        }, 1000);
      }
    }

  },
  //this displays on the server side
  asyncData({isDev, route, store, env, params, query, req, res, redirect, error})
  {
    console.log('done loading');

  },

  async created() {
    await this.firstcheck();
    //checking if we have connection to the API
    if(this.connected == true){
      console.log('connected to API');
      this.getallprofiles();
      this.getallvendors();
      this.getallgenders();
      this.getallaccountstats();
      this.getallprofilestypes();
      this.getallprofgroups();
      this.getallpricecodes()

      this.getallitems();
      this.getallitemsizes()

      // // this.getallitemsizepieces()
      // // this.getallitemprices()
    }
  }

}
</script>


<style>


</style>
