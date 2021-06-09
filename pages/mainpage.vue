<template>
<v-app>
    <v-app-bar app color="deep-purple" dense dark fixed>
      <v-toolbar-title>TradeTech 2.1</v-toolbar-title>
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
        <ProfileComponent class="col-12" :showprofileflag="showhideprof" @profileformclose="closeFromProfile" @reupdateproflist="getallprofiles">
        </ProfileComponent>
        </div>

        <div data-app>
        <ItemComponent class="col-12" :showflag="showhideitem" @formclose="closeFromItem" @reupdateitemlist="getallitems">
        </ItemComponent>
        </div>

        <div data-app>
        <SellItemComponent class="col-12" :showflag="showhidesellitem"  @formclose="closeFromSellItem">
        </SellItemComponent>
        </div>

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
    }
  },

  methods: {
    ...mapMutations(['incrementCounter','closeProfile', 'updateProfileList','updateProfileArray',
        'updateProfileTypeList', 'updateItemList', 'updateVendorList', 'updateItemArray',
        'updateItemSize', 'updateItemSizePiece', 'updateItemPrice', 'updateItemPriceCode',
      ]),
    clickProfile() {
      //this.$store.dispatch('actionShowHideProfile')
      this.showhideprof = !this.showhideprof
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
      let res = await this.callApi('get', '/allprofiles')
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
      //this.updateItemList(res.data)
      console.log(res);
       //create the profiles array
      // let itemarray = []
      // res.data.forEach(element => {
      //   itemarray.push(element.itemdescrip)
      // });
      // this.updateItemArray(itemarray)
    },
    async getallitemsizes(state){
      console.log('getting all item sizes')
      let res = await this.callApi('get', '/allitemsizes')
      this.updateItemSize(res.data)
    },
    async getallitemsizepieces(state){
      console.log('getting all item size pieces')
      let res = await this.callApi('get', '/allitemsizepieces')
      this.updateItemSizePiece(res.data)
    },
    async getallitemprices(state){
      console.log('getting all item prices')
      let res = await this.callApi('get', '/allitemprices')
      this.updateItemPrice(res.data)
    },
    async getallitempricecodes(state){
      console.log('getting all item price codes')
      let res = await this.callApi('get', '/allitempricecodes')
      this.updateItemPriceCode(res.data)
    },
    //vendors
    async getallvendors(state){
      console.log('getting all vendors')
      let res = await this.callApi('get', '/allvendors')
      this.updateVendorList(res.data)
    },
    //profile types
    async getallprofilestypes(state){
      console.log('getting all profile types')
      let res = await this.callApi('get', '/profiletypes')
      let newarray = []
      res.data.forEach(function (arrayItem) {
          newarray.push(arrayItem.typedescrip)
      });

      this.updateProfileTypeList(newarray)

    },

  },
  //this displays on the server side
  asyncData({isDev, route, store, env, params, query, req, res, redirect, error})
  {
    console.log('done loading');

  },

  async created() {
    //this.getallprofiles()

    this.getallitems()
    // this.getallitemsizes()
    // this.getallitemsizepieces()
    // this.getallitemprices()
    // this.getallitempricecodes()

    // this.getallvendors()
    // this.getallprofilestypes()
  }

}
</script>


<style>

</style>
