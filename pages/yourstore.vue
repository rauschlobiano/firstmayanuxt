<template>
  <v-app>
    <v-app-bar app color="deep-purple" dense dark fixed>
      <v-toolbar-title>Valhalla Online Services</v-toolbar-title>
      <h1 class="mx-4" style="color: gray">|</h1>

      <div v-if="loggedin">
        <v-row justify="center">
          <v-col class="text-center">
            <v-tooltip bottom style="z-index: 1000;">
              <template v-slot:activator="{ on, attrs }">
                <v-btn @click="backtohome" icon v-bind="attrs" v-on="on">
                  <v-icon>mdi-home</v-icon>
                </v-btn>
              </template>
              <span>Home</span>
            </v-tooltip>

            <v-tooltip bottom style="z-index: 1000;">
              <template v-slot:activator="{ on, attrs }">
                <v-btn @click="clickProfile" icon v-bind="attrs" v-on="on">
                  <v-icon>mdi-account-group</v-icon>
                </v-btn>
              </template>
              <span>Profiles</span>
            </v-tooltip>

            <v-tooltip bottom style="z-index: 1000;">
              <template v-slot:activator="{ on, attrs }">
                <v-btn @click="clickItem" icon v-bind="attrs" v-on="on">
                  <v-icon>mdi-cart</v-icon>
                </v-btn>
              </template>
              <span>Items</span>
            </v-tooltip>

            <v-tooltip bottom style="z-index: 1000;">
              <template v-slot:activator="{ on, attrs }">
                <v-btn @click="clickInventoryIn" icon v-bind="attrs" v-on="on">
                  <v-icon>mdi-truck</v-icon>
                </v-btn>
              </template>
              <span>Receiving</span>
            </v-tooltip>

            <v-tooltip bottom style="z-index: 1000;">
              <template v-slot:activator="{ on, attrs }">
                <v-btn @click="clickItemTransfer" icon v-bind="attrs" v-on="on">
                  <v-icon>mdi-transfer</v-icon>
                </v-btn>
              </template>
              <span>Transfers</span>
            </v-tooltip>

            <v-tooltip bottom style="z-index: 1000;">
              <template v-slot:activator="{ on, attrs }">
                <v-btn @click="clickSellItem" icon v-bind="attrs" v-on="on">
                  <v-icon>mdi-point-of-sale</v-icon>
                </v-btn>
              </template>
              <span>Sell Item</span>
            </v-tooltip>

            <v-tooltip bottom style="z-index: 1000;">
              <template v-slot:activator="{ on, attrs }">
                <v-btn @click="clickInventory" icon v-bind="attrs" v-on="on">
                  <v-icon>mdi-warehouse</v-icon>
                </v-btn>
              </template>
              <span>Inventory</span>
            </v-tooltip>

            <v-tooltip bottom style="z-index: 1000;">
              <template v-slot:activator="{ on, attrs }">
                <v-btn @click="clickReportViewer" icon v-bind="attrs" v-on="on">
                  <v-icon>mdi-file-chart</v-icon>
                </v-btn>
              </template>
              <span>Reports</span>
            </v-tooltip>

            <v-tooltip bottom style="z-index: 1000;">
              <template v-slot:activator="{ on, attrs }">
                <v-btn @click="clickAccountDetails" icon v-bind="attrs" v-on="on">
                  <v-icon>mdi-account-details</v-icon>
                </v-btn>
              </template>
              <span>Account</span>
            </v-tooltip>

            <v-btn @click="logout" icon>
              <v-icon>mdi-power</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </v-app-bar>
    <v-main>
      <v-row>
        <!-- adding data-app to prevent error in v-select element -->
        <div data-app>
          <ProfileComponent :showprofileflag="showhideprof" @profileformclose="closeFromProfile" @reupdateproflist="getallprofiles">
          </ProfileComponent>
        </div>

        <div data-app>
          <ItemComponent
            :showflag="showhideitem"
            @formclose="closeFromItem"
            @reupdateitemlist="getallitems"
            @reupdateitemsizepiece="getallitemsizepieces"
          >
          </ItemComponent>
        </div>

        <div data-app>
          <SellItemComponent :showflag="showhidesellitem" @formclose="closeFromSellItem"> </SellItemComponent>
        </div>

        <div data-app>
          <ReportViewerComponent :showflag="showhidereportviewer" @formclose="closeFromReportViewer"> </ReportViewerComponent>
        </div>

        <div data-app>
          <InventoryComponent :showflag="showhideinventory" @formclose="closeFromInventory"> </InventoryComponent>
        </div>

        <div data-app>
          <ReceivingComponent :showflag="showhideinventoryin" @formclose="closeFromInventoryIn"> </ReceivingComponent>
        </div>

        <div data-app>
          <ItemTransferComponent :showflag="showhideitemtransfer" @formclose="closeFromItemTransfer"> </ItemTransferComponent>
        </div>

        <div data-app>
          <AccountComponent :showflag="showhideaccountdetails" @formclose="closeFromItemTransfer"> </AccountComponent>
        </div>

        <v-card class="mx-auto mt-10" height="120" width="300" v-if="!connected">
          <v-row class="my-auto">
            <v-col class="text-center">
              <h3 style="color: maroon">Not connected to server!</h3>
              <h4 class="mt-4">Reloading in {{ remainingtime }}</h4>
              <v-container v-if="reconnecting">
                <v-progress-circular indeterminate color="primary"> </v-progress-circular>
              </v-container>
            </v-col>
          </v-row>
        </v-card>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
import { mapState, mapMutations } from "vuex";

import ProfileComponent from "~/components/ProfileComponent";
import ItemComponent from "~/components/ItemComponent";
import SellItemComponent from "~/components/SellItemComponent";
import ReportViewerComponent from "~/components/ReportViewerComponent";
import InventoryComponent from "~/components/InventoryComponent";
import ReceivingComponent from "~/components/ReceivingComponent";
import ItemTransferComponent from "~/components/ItemTransferComponent";
import AccountComponent from "../components/AccountComponent.vue";
import moment from "moment";

export default {
  components: {
    ProfileComponent,
    ItemComponent,
    SellItemComponent,
    ReportViewerComponent,
    InventoryComponent,
    ReceivingComponent,
    ItemTransferComponent,
    AccountComponent
  },
  data: function() {
    return {
      ...mapState(["counter", "profileslistdata", "profiletypedata"]),
      loggedin: false,
      showhideprof: false,
      showhideitem: false,
      showhidesellitem: false,
      showhidereportviewer: false,
      showhideinventory: false,
      showhideinventoryin: false,
      showhideitemtransfer: false,
      showhideaccountdetails: false,
      connected: true,
      reconnecting: false,
      remainingtime: 10
    };
  },

  methods: {
    ...mapMutations([
      "mutateZindex",
      "closeProfile",
      "updateProfileList",
      "updateProfileArray",
      "updateProfileTypeList",
      "updateItemList",
      "updateVendorList",
      "updateVendorArray",
      "updateItemArray",
      "updateItemSize",
      "updateItemSizePiece",
      "updateItemPrice",
      "updatePriceCode",
      "updateGenderList",
      "updateAccountStatsList",
      "updateProfGroupList",
      "updateItemLocations",
      "updateItemTransferTrans",
      "updateLegitUser",
      "updateUserInfo",
      "updateUserId",
      "updateUserToken"
    ]),
    backtohome() {
      this.$router.push("/");
    },
    async logout() {
      this.loggedin = false;
      let res = await this.callApi("POST", "/userinfo/logout", { uname: this.$store.state.userinfo.uname });
      this.updateLegitUser(false);
      this.updateUserInfo({});
      this.updateUserId("");
      this.updateUserToken("");

      this.$router.push("/");
    },
    clickProfile() {
      this.showhideprof = !this.showhideprof;
    },
    clickItem() {
      //this.$store.dispatch('actionShowHideProfile')
      this.showhideitem = !this.showhideitem;
    },
    clickSellItem() {
      //this.$store.dispatch('actionShowHideProfile')
      this.showhidesellitem = !this.showhidesellitem;
    },
    clickReportViewer() {
      //this.$store.dispatch('actionShowHideProfile')
      this.showhidereportviewer = !this.showhidereportviewer;
    },
    clickAccountDetails() {
      this.showhideaccountdetails = !this.showhideaccountdetails;
    },
    clickInventory() {
      this.showhideinventory = !this.showhideinventory;
    },
    clickInventoryIn() {
      this.showhideinventoryin = !this.showhideinventoryin;
    },
    clickItemTransfer() {
      this.showhideitemtransfer = !this.showhideitemtransfer;
    },
    closeFromProfile(showhide) {
      this.showhideprof = showhide;
    },
    closeFromItem(showhide) {
      this.showhideitem = showhide;
    },
    closeFromSellItem(showhide) {
      this.showhidesellitem = showhide;
    },
    closeFromReportViewer(showhide) {
      this.showhidereportviewer = showhide;
    },
    closeFromInventory(showhide) {
      this.showhideinventory = showhide;
    },
    closeFromInventoryIn(showhide) {
      this.showhideinventoryin = showhide;
    },
    closeFromItemTransfer(showhide) {
      this.showhideitemtransfer = showhide;
    },
    closeFromUser(showhide) {
      this.showhideaccountdetails = showhide;
    },
    //profiles
    async getallprofiles(state) {
      console.log("getting all profiles");
      let res = await this.callApi("get", "/profiles/clients");
      this.updateProfileList(res.data);

      //create the profiles array
      let profarray = [];
      res.data.forEach(element => {
        profarray.push(element.accountname);
      });
      this.updateProfileArray(profarray);
    },

    //items
    async getallitems(state) {
      console.log("getting all items");
      let res = await this.callApi("get", "/items");
      this.updateItemList(res.data);

      let itemarray = [];
      res.data.forEach(element => {
        itemarray.push(element.itemdescrip);
      });
      this.updateItemArray(itemarray);
    },
    async getallitemlocations(state) {
      console.log("getting all items locations");
      let res = await this.callApi("get", "/itemlocations");
      this.updateItemLocations(res.data);
    },
    async getallitemtransfers(state) {
      console.log("getting all items transfers");
      let res = await this.callApi("GET", "/itemselltrans/itemtransferlist");

      res.data.forEach(element => {
        element.transdate = moment(element.transdate).format("MM/DD/YYYY");
      });
      this.updateItemTransferTrans(res.data);
    },
    async getallitemsizes(state) {
      console.log("getting all item sizes");
      let res = await this.callApi("GET", "/itemsizes");
      this.updateItemSize(res.data);
    },
    async getallitemsizepieces(state) {
      console.log("getting all item size pieces");
      let res = await this.callApi("GET", "/itemsizepieces");
      this.updateItemSizePiece(res.data);
    },
    async getallitemprices(state) {
      console.log("getting all item prices");
      let res = await this.callApi("GET", "/itemprices");
      this.updateItemPrice(res.data);
    },

    //vendors
    async getallvendors(state) {
      console.log("getting all vendors");
      let res = await this.callApi("get", "/profiles/suppliers");
      this.updateVendorList(res.data);

      //create the vendors array
      let vendorsarray = [];
      res.data.forEach(element => {
        vendorsarray.push(element.accountname);
      });
      this.updateVendorArray(vendorsarray);
    },

    //taggings
    async getallprofilestypes(state) {
      console.log("getting all profile types");
      let res = await this.callApi("get", "/taggings/proftypes");
      this.updateProfileTypeList(res.data);
    },
    async getallgenders(state) {
      console.log("getting all genders");
      let res = await this.callApi("get", "/taggings/genders");
      this.updateGenderList(res.data);
    },
    async getallaccountstats(state) {
      console.log("getting all account stats");
      let res = await this.callApi("get", "/taggings/accountstats");
      this.updateAccountStatsList(res.data);
    },
    async getallprofgroups(state) {
      console.log("getting all account stats");
      let res = await this.callApi("get", "/taggings/profgroups");
      this.updateProfGroupList(res.data);
    },
    async getallpricecodes(state) {
      console.log("getting all price codes");
      let res = await this.callApi("get", "/taggings/pricecodes");
      this.updatePriceCode(res.data);
    },
    async firstcheck() {
      try {
        console.log("Trying to connect to API....");
        this.reconnecting = true;
        let res = await this.callApi("GET", "/firstcheck");

        if (res.data) {
          console.log("Connected!");
          this.connected = true;
          this.reconnecting = false;
        } else {
          this.connected = false;
          console.log("API Connection attempt failed!");
          //start running the timer
          this.retryconnection();
        }
        console.log("Connected? : " + this.connected);
      } catch (ex) {
        this.connected = false;
      }
    },
    async retryconnection() {
      var interval;

      this.remainingtime = 10;
      if (!this.connected) {
        interval = setInterval(() => {
          this.remainingtime--;
          console.log(this.remainingtime);
          if (this.remainingtime == 0) {
            this.firstcheck();
            clearInterval(interval);
          }
        }, 1000);
      }
    }
  },
  //this displays on the server side
  asyncData({ isDev, route, store, env, params, query, req, res, redirect, error }) {
    console.log("done loading");
  },
  async getalldata() {
    console.log(this.connected);
  },
  async created() {
    //checking connection to the API
    await this.firstcheck();
    if (this.connected == true && this.$store.state.legituser) {
      console.log("Loading Store data...");
      this.getallprofiles();
      this.getallvendors();
      this.getallgenders();
      this.getallaccountstats();
      this.getallprofilestypes();
      this.getallprofgroups();
      this.getallpricecodes();

      this.getallitems();
      this.getallitemsizes();

      this.getallitemsizepieces();
      this.getallitemprices();
      this.getallitemlocations();
      this.getallitemtransfers();
    } else {
      console.log("not gonna anything for you");
    }

    //check if user logged in
    if (this.$store.state.legituser) {
      this.loggedin = true;
    } else {
      this.$router.push("/");
    }
  }
};
</script>

<style></style>
