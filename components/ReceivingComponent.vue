<template>
  <v-app>
    <div  ref="draggableContainerReceiving" id="draggable-container-Receiving"
      class="pa-0"  @click="incrementZindex">
      <v-card elevation="2" :min-width="1000" v-if="showflag">
        <div id="draggable-header-Receiving" @mousedown="dragMouseDown">
          <v-row>
            <v-col cols="2">
              <span style="color: white; font-size: 12px"> Receiving Items </span>
            </v-col>
            <v-spacer> </v-spacer>
            <v-col cols="1" class="text-right">
              <v-btn x-small icon  dark
                @click="tellParentToHideThis" class="mr-1">
                <v-icon>mdi-power</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </div>
        <div class="ma-2">
          <v-row>
            <v-col cols="3">
              <v-text-field dense v-model="search"  append-icon="mdi-magnify"  label="Search"
                single-line hide-details>
              </v-text-field>

              <v-data-table height="500px" :headers="headers" :items="this.$store.state.itemreceivetrans"
                item-key="_id"  no-data-text="No Data" :hide-default-footer="true"
                class="elevation-1 my-0" :search="search"  disable-pagination>
                <template v-slot:body="{ items }">
                  <tbody>
                    <tr v-for="item in items" :key="item._id" @click="selectItem(item)"
                      :class="{
                        selectedRow: item._id == selectedtrans._id,
                      }">
                      <td>{{ item.client.accountname }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-data-table>

            </v-col>

            <v-col cols="9">
              <v-row>
                <v-col cols="7">
                  <v-row class="mt-4">
                    <!-- SUPPLIER -->
                    <v-col cols="10">
                      <v-autocomplete dense flat light v-model="profselect" v-if="creating"
                        :loading="profloading" :items="profitems"  :search-input.sync="profsearch"
                        cache-items class="caption" hide-no-data  hide-details
                        label="Supplier"  @change="autocompleteselectprofile" >
                      </v-autocomplete>

                      <v-text-field v-model="selectedtrans.clientname" dense label="Supplier" readonly v-if="!creating">
                      </v-text-field>
                    </v-col>
                  </v-row>

                  <v-row dense >
                    <v-col>
                      <v-card v-if="creating">
                        <v-container>
                          <v-form v-model="validsale" ref="receiveform"
                            lazy-validation >
                            <v-row class="mt-2">
                              <!-- ITEM DESCRIPTION -->
                              <v-col cols="8">
                                <v-autocomplete light v-model="itemselect" :loading="itemloading"
                                  :items="itemitems" :search-input.sync="itemsearch" cache-items
                                  class="caption pa-0 ma-0" hide-no-data hide-details label="Item Description"
                                  :rules="inputRules"  @change="autocompleteselectitem">
                                </v-autocomplete>
                              </v-col>
                              <!-- ITEM SIZE -->
                              <v-spacer></v-spacer>
                              <v-col cols="3" class="py-0 ma-0">
                                <v-select v-model="itemsize" dense :rules="inputRules" :items="localitemsizes"
                                  label="Size"  item-text="itemsize" class="centered-input caption"
                                  item-value="itemsize" @change="selectsize"
                                >
                                </v-select>
                              </v-col>
                            </v-row>
                            <v-row dense>
                              <!-- QUANTITY -->
                              <v-col cols="3" class="py-0 my-0">
                                <v-text-field v-model="quantity" label="Quantity"
                                  class="centered-input caption" :rules="inputRules">
                                </v-text-field>
                              </v-col>
                              <!-- PRICE EACH -->
                              <v-col cols="3" class="py-0 my-0">
                                <v-text-field class="right-input caption" readonly v-model="priceeachdisplay"
                                  label="Price Each" :rules="inputRules">
                                </v-text-field>
                              </v-col>
                              <!-- TOTAL COST -->
                              <v-col cols="3" class="py-0 my-0">
                                <v-text-field class="right-input caption"
                                  readonly v-model="totalcostdisplay" label="Price Total"
                                  :rules="inputRules"
                                >
                                </v-text-field>
                              </v-col>
                              <v-spacer></v-spacer>
                              <!-- ADD BUTTON -->
                              <v-col cols="3" class="text-right pb-0 mr-0">
                                <v-btn dark  small color="success"
                                  text @click="addtobasket">
                                  <v-icon>mdi-arrow-down</v-icon> Add
                                </v-btn>
                              </v-col>
                            </v-row>
                          </v-form>
                        </v-container>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-col>

                <v-col cols="5">
                  <v-row>
                    <v-col>
                      <div class="text-right mb-3">
                        <v-btn class="mr-1" small  outlined color="primary"
                          @click="createnew" v-if="!creating" depressed
                          ><v-icon>mdi-plus</v-icon> Create
                        </v-btn>
                      </div>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-simple-table>
                        <template v-slot:default>
                          <tbody class="text-right">
                            <tr v-if="!creating">
                              <td>Trans # :</td>
                              <td class="font-weight-bold">
                                {{ String(selectedtrans._id).substring(selectedtrans._id.length - 6) }}
                              </td>
                            </tr>
                            <tr>
                              <td>Date :</td>
                              <td class="font-weight-bold">
                                <span v-if="!creating">{{ transinfo.transdate }}</span>
                                <span v-if="creating">
                                  <v-text-field class="right-input caption" v-model="transinfo.transdate"
                                    label="" :rules="dateRules" @change="transdateChanged">
                                  </v-text-field>
                                </span>
                              </td>
                            </tr>
                            <tr v-if="!creating">
                              <td>Status :</td>
                              <td class="font-weight-bold">
                                {{ transinfo.status }}
                              </td>
                            </tr>
                            <tr style="height: 35px; background-color: honeydew" class="mt-2">
                              <td>Total :</td>
                              <td  class="font-weight-bold" style="font-size: 20px; color: darkgreen">
                                {{ grandtotaldisplay }}
                              </td>
                            </tr>
                            <!-- <tr>
                              <td>Tendered :</td>
                              <td>0</td>
                            </tr>
                            <tr>
                              <td>Change :</td>
                              <td>0</td>
                            </tr> -->
                          </tbody>
                        </template>
                      </v-simple-table>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <div class="caption font-weight-bold">Items to be sold:</div>
                  <v-data-table
                    height="200px" :headers="transitemsheader"  :items="transinfo.transitems" item-key="itemcounter" no-data-text="No Items"
                    :hide-default-footer="true" class="elevation-1 my-0">
                    <template v-slot:item="row">
                        <tr>
                          <td>
                              <v-btn class="caption" text light x-small v-if="creating"
                                @click="removeItem(row.item)">
                                <v-icon color="green">mdi-delete-outline</v-icon>
                              </v-btn>
                          </td>
                          <td>{{row.item.itemcode}}</td>
                          <td>{{row.item.itemdescrip}}</td>
                          <td>{{row.item.quantity}}</td>
                          <td>{{row.item.size}}</td>
                          <td>{{row.item.priceeachdisplay}}</td>
                          <td>{{row.item.totalcostdisplay}}</td>
                        </tr>
                    </template>
                  </v-data-table>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="9">
                  <v-text-field class="button" v-model="transinfo.notes"
                    label="Notes" :readonly="!creating">
                  </v-text-field>
                </v-col>
                <v-col cols="2">
                  <v-btn dark small  color="success"  @click="savetransaction"
                    v-if="creating"  bottom  right absolute>
                    <v-icon small>mdi-content-save</v-icon> Save
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </div>
      </v-card>
      <v-snackbar v-model="snackbar">
        {{ snackbartext }}
        <template v-slot:action="{ attrs }">
          <v-btn color="green" text v-bind="attrs" @click="snackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </v-app>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import moment from "moment";

export default {
  name: "ReceivingComponent",
  props: ["showflag"],

  data: function () {
    return {
      ...mapState([
        "lastzindex",
        "Receivingssumdata",
        "vendorslistdata",
        "profileslistdata",
        "profilesarray",
      ]),
      showdialog: false,
      snackbar: false,
      snackbartext: "",

      //autocomplete profile
      profsearch: null,
      profselect: null,
      profloading: false,
      profitems: [],
      //autocomplete items
      itemsearch: null,
      itemselect: null,
      itemloading: false,
      itemitems: [],
      supplieritems: [],

      //item template
      quantity: 1,
      itemsize: "",
      priceeach: 0,
      priceeachdisplay: "0",
      totalcost: 0,
      totalcostdisplay: "0",
      selecteditem: {},
      totalpieces: 1,

      itemcounter: 0,

      grandtotaldisplay: "0.0",
      selectedtrans: {
        _id: '',
        clientname: '',
		status: '',
      },
      transinfo: {
        transdate: '',
        transstatus: "Posted",
        client: "",
        clientname: "",
        pricecode: "",
		    status: "Posted",
        transtotal: 0,
        transitems: [],
		    notes: "",
      },
      validsale: false,
      valid: false,
      search: "",
      localitemsizes: [],
      inputRules: [
        (v) => !!v || "Required",
        //v => (v && v.length <= 6) || 'Address ID must be 6 characters',
      ],
	  dateRules: [
		(v) => !!v || "Required",
		v => (v && this.validateDate(v)) || 'Invalid Date',
	  ],

      headers: [
        // { text: "TransID", align: "center", value: "_id" },
        { text: "Transactions", align: "start", value: "client.accountname" },
      ],
      transitemsheader: [
        {
          text: "",
          value: "x",
          sortable: false,
          width: "5%",
          fixed: true,
          class: 'dtheaderbg',
          align: 'center'},
        // {
        //   text: "Count",
        //   align: "",
        //   value: "itemcounter",
        //   class: "dtheaderbg",
        //   sortable: false,
        //   width: "20px",
        //   fixed: true,
        // },
        {
          text: "Code",
          align: "center",
          value: "itemcode",
          class: "dtheaderbg",
          sortable: false,
          width: "8%",
          fixed: true,
        },
        {
          text: "Description",
          align: "center",
          value: "itemdescrip",
          class: "dtheaderbg",
          sortable: false,
          width: "20%",
          fixed: true,
        },
        {
          text: "Quantity",
          align: "center",
          value: "quantity",
          class: "dtheaderbg",
          sortable: false,
          width: "7%",
          fixed: true,
        },
        {
          text: "Size",
          align: "center",
          value: "size",
          class: "dtheaderbg",
          sortable: false,
          width: "10%",
          fixed: true,
        },
        {
          text: "Cost",
          align: "right",
          value: "priceeachdisplay",
          class: "dtheaderbg",
          sortable: false,
          width: "12%",
          fixed: true,
        },
        {
          text: "Total",
          align: "right",
          value: "totalcostdisplay",
          class: "dtheaderbg",
          sortable: false,
          width: "15%",
          fixed: true,
        },
      ],
      creating: false,
      positions: {
        clientX: undefined,
        clientY: undefined,
        movementX: 0,
        movementY: 0,
      },
    };
  }, //end of data

  methods: {
    ...mapMutations(["mutateZindex", "updateItemReceiveTrans"]),
    tellParentToUpdate() {
      this.$emit("reupdateitemselllist");
    },
    removeItem(item){
      console.log(item);
      this.transinfo.transitems = this.transinfo.transitems.filter(function(i) {
        return i.itemcounter != item.itemcounter;
      })
      console.log(this.transinfo.transitems);

    },
    async savetransaction() {
      //can't do form validation here because there's another form in the middle
      //doing manual validation
      //if (Object.keys(this.transinfo.client).length === 0) {
      if (this.transinfo.client.length <= 0) {
        this.snackbar = true;
        this.snackbartext = "Please select Client/Customer";
      } else if (parseFloat(this.transinfo.transtotal) <= 0) {
        this.snackbar = true;
        this.snackbartext =
          "There is no transaction to save based on the Totals";
      }
		else if(!this.validateDate(this.transinfo.transdate)){
			this.snackbar = true;
        this.snackbartext =
          "Date is not valid.";
		}
	  else {
        this.snackbar = false;
        this.transinfo.pricecode = "Supplier Price";
        this.transinfo.transtype = "Receiving";

        let res = await this.callApi("POST", "/itemselltrans", this.transinfo);
        console.log(res);
        if (res.data.created) {
          this.snackbar = true;
          this.snackbartext = "Transaction Saved!";
          //clear
          this.$refs.receiveform.reset();
          this.$refs.receiveform.resetValidation();
          this.clearAll();
          //update list
          //this.tellParentToUpdate();
          this.getalltransactions();
        } else {
          this.snackbar = true;
          this.snackbartext = "Transaction Failed....";
        }
      }
    },

    async getalltransactions() {
      let res = await this.callApi("GET", "/itemselltrans/receivinglist");
      console.log(res.data);
      if (res.data) {
        this.updateItemReceiveTrans(res.data);
      } else {
        console.log("There are no transaction data.");
      }
    },

	validateDate(dt){
		var m = moment(dt, 'MM/DD/YYYY');
		return m.isValid();
	},

	transdateChanged(newdate) {
		if(this.creating){
			if(!this.validateDate(newdate)){
				this.snackbar = true;
				this.snackbartext = "Invalid Date";
			};
		}
	},

    clearAll() {
      //autocomplete profile
      this.profsearch = null;
      this.profselect = null;
      this.profloading = false;
      this.profitems = [];

      //autocomplete items
      this.itemsearch = null;
      this.itemselect = null;
      this.itemloading = false;
      this.itemitems = [];

      //item template
      this.quantity = 1;
      this.itemsize = "";
      this.priceeach = 0;
      this.priceeachdisplay = "0";
      this.totalcost = 0;
      this.totalcostdisplay = "0";
      this.selecteditem = {};
      this.totalpieces = 1;
      this.pricecode = "Supplier Price";

      //transaction
      this.itemcounter = 0;
      this.transinfo.transtotal = 0;
      this.transinfo.transitems = [];
      this.grandtotaldisplay = "0.0";


      this.transinfo.client = "";
      this.transinfo.clientname = "";

      this.transinfo.transtotal = 0;
      this.transinfo.transitems = [];
      this.transinfo.notes = "";

      this.validsale = false;
      this.valid = false;
      this.search = "";
      this.transitems = [];
      this.localitemsizes = [];
    },

    createnew() {
      this.clearAll();
      this.creating = true;
      //set the date today automatically
      this.transinfo.transdate = moment().format('MM/DD/YYYY');
    },
    computetotal() {
      this.transinfo.transtotal = 0;
      this.transinfo.transitems.forEach((item) => {
        this.transinfo.transtotal += parseFloat(item.totalcost);
      });
      //this.grandtotaldisplay = new Intl.NumberFormat().format(this.grandtotal)
      this.grandtotaldisplay = new Intl.NumberFormat("en", {
        currency: "Php",
        style: "currency",
      }).format(this.transinfo.transtotal);
    },

     commaSeparate(x){
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      },

    currencyformat(amt) {
      return new Intl.NumberFormat("en", {
        currency: "PHP",
        style: "currency",
      }).format(amt);
    },

    addtobasket() {
      //validation first
      this.validsale = this.$refs.receiveform.validate();
      if (this.validsale) {
        this.itemcounter++;
        //add new row to transaction items
        this.transinfo.transitems.push({
          _id: this.selecteditem._id,
          itemcounter: this.itemcounter,
          itemcode: this.selecteditem.itemcode,
          itemdescrip: this.selecteditem.itemdescrip,
          totalpieces: this.totalpieces,
          totalinventory: this.totalpieces,
          quantity: this.quantity,
          itemsize: this.itemsize,
          size: this.itemsize,
          priceeach: this.priceeach,
          priceeachdisplay: this.priceeachdisplay,
          totalcost: this.totalcost,
          totalcostdisplay: this.totalcostdisplay,
        });
        this.computetotal();
      }
    },

    autocompleteselectprofile(selected) {
      console.log(selected);
      let found = this.$store.state.vendorslistdata.find(function (item,index) {
        if (item.accountname == selected)
        return item;
      });

      if (found) {
        this.transinfo.client = found._id;
        this.getSupplierItems(found._id);
      }
    },

    getSupplierItems(supplier_id){
      console.log('finding items');
      let newitemsarray = [];
      this.$store.state.itemslistdata.map(function (item,index) {
        if (item.supplierprofid == supplier_id){
          newitemsarray.push(item.itemdescrip);
        }
      });
      this.supplieritems = newitemsarray;
      console.log(newitemsarray);
    },

    autocompleteselectitem(selected) {
      let founditem = this.$store.state.itemslistdata.find(function (
        item,
        index
      ) {
        if (item.itemdescrip == selected) return item;
      });

      if (founditem) {
        this.selecteditem._id = founditem._id;
        this.selecteditem.itemdescrip = founditem.itemdescrip;
        this.selecteditem.itemcode = founditem.itemcode;

        //also, get the item sizes based on the selected item
        //from itemsizepiece
        this.itemsizepieces.forEach((element) => {
          if (element.item_id == founditem._id) {
            this.localitemsizes.push({
              itemsizeid: element.itemsizeid,
              itemsize: element.itemsize,
              pieces: element.pieces,
            });
          }
        });

        //set the default selected to pieces
        this.itemsize = "Piece";
        this.totalpieces = 1;
        //get price
        this.getpriceeach(founditem._id);
      }
    },

    getpriceeach(_id) {
      let foundprice = this.$store.state.itemprices.find(function ( price,index) {
        console.log(price);
        if (price.item_id == _id && price.pricecode == "Supplier Price")
          return price;
      });
      console.log(foundprice);
      if (foundprice) {
        this.priceeach = parseFloat(foundprice.price);
      } else {
        this.priceeach = 1;
      }
    },

    gettotalpieces(qty){
      //get the totalpieces
      // let foundsize = this.localitemsizes.find(function (item, index) {
      //   if (item.itemsize == this.itemsize) return item;
      // });
      let foundsize = this.localitemsizes.find(x => x.itemsize === this.itemsize)
      if(foundsize){
        this.totalpieces = parseFloat(foundsize.pieces) * qty;
      }

      console.log(this.totalpieces);

      this.computeeachcost();
    },

    computeeachcost() {
      this.totalcost = Number(this.totalpieces) * Number(this.priceeach);
    },

    selectsize(size) {
      //find from the localitemsizes array the number of pieces
      let foundsize = this.localitemsizes.find(function (item, index) {
        if (item.itemsize == size) return item;
      });
      if (foundsize) {
        this.itemsize = size;
        this.totalpieces = foundsize.pieces * this.quantity;
      } else {
        this.itemsize = "Piece";
        this.totalpieces = 1;
      }

      //re-compute
      this.computeeachcost();
    },

    increment() {
      if (this.quantity < 999999) {
        this.quantity++;
      }
    },
    decrement() {
      if (this.quantity > 1) {
        this.quantity--;
      } else {
        this.quantity = 1;
      }
    },
    querySelectionsProf(v) {
      this.profloading = true;
      setTimeout(() => {
        this.profitems = this.$store.state.vendorsarray.filter((e) => {
          return (e || "").toLowerCase().indexOf((v || "").toLowerCase()) > -1;
        });
        this.profloading = false;
      }, 500);
    },
    querySelectionsItem(v) {
      this.itemloading = true;
      // Simulated ajax query
      setTimeout(() => {
        this.itemitems = this.supplieritems.filter((e) => {
          return (e || "").toLowerCase().indexOf((v || "").toLowerCase()) > -1;
        });
        this.itemloading = false;
      }, 500);
    },
    tellParentToHideThis() {
      this.$emit("formclose", false);
    },

    selectItem(item) {
      this.creating = false;
      this.selectedtrans._id = item._id;
      console.log(item);
      //fetch the details
      this.getspecifictrans(item._id);
    },

    async getspecifictrans(id) {
		this.clearAll();
      let res = await this.callApi("GET", "/itemselltrans/" + id);
      if (res.data)
      {
        console.log(res.data);
        let info = res.data;
        this.selectedtrans.clientname = info.client.accountname;

        this.transinfo._id = info._id;
        this.transinfo.transdate = moment(info.transdate).format('MM/DD/YYYY');
        this.transinfo.transstatus = info.transstatus;

        this.transinfo.clientname = info.client.accountname;
        this.transinfo.transtotal = info.transtotal;
        this.grandtotaldisplay = this.currencyformat(info.transtotal);
        this.transinfo.transitems = info.transitems;
        this.transinfo.notes = info.notes;
      }
      else
      {
        console.log("Not found");
      }
    },

    incrementZindex() {
      //if form is still shown
      if (this.showflag) {
        document.getElementById("draggable-container-Receiving").style.zIndex =
          this.$store.state.lastzindex + 1;
        document.getElementById("draggable-header-Receiving").style.zIndex =
          this.$store.state.lastzindex + 2;
        this.mutateZindex();
      }
    },

    dragMouseDown: function (event) {
      event.preventDefault();
      // get the mouse cursor position at startup:
      this.positions.clientX = event.clientX;
      this.positions.clientY = event.clientY;
      document.onmousemove = this.elementDrag;
      document.onmouseup = this.closeDragElement;
    },

    elementDrag: function (event) {
      event.preventDefault();
      this.positions.movementX = this.positions.clientX - event.clientX;
      this.positions.movementY = this.positions.clientY - event.clientY;
      this.positions.clientX = event.clientX;
      this.positions.clientY = event.clientY;
      // set the element's new position:
      this.$refs.draggableContainerReceiving.style.top =
        this.$refs.draggableContainerReceiving.offsetTop -
        this.positions.movementY +
        "px";
      this.$refs.draggableContainerReceiving.style.left =
        this.$refs.draggableContainerReceiving.offsetLeft -
        this.positions.movementX +
        "px";
    },

    closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    },
  }, //end of methods

  async created() {
    this.getalltransactions();
  },
  computed: {
    itemsizepieces(val) {
      return this.$store.state.itemsizepieces;
    },
    itemslistdata(val) {
      return this.$store.state.itemslistdata;
    },
  },

  watch: {
    itemslistdata(val){
      console.log("item list is updated! - from watch");
    },
    itemsizepieces(val) {
      console.log("itemsizepieces is updated! - from watch");
      //just clear-out the selected item if someone is currently trying add a new transaction
      this.selecteditem._id = "";
      this.selecteditem.itemdescrip = "";
      this.selecteditem.itemcode = "";
      this.localitemsizes = [];
      this.itemselect = null;

      this.quantity = 1;
      this.itemsize = "";
      this.priceeach = 0;
      this.priceeachdisplay = "0";
      this.totalcost = 0;
      this.totalcostdisplay = "0";
      this.totalpieces = 1;
    },
    profsearch(val) {
      val && val !== this.profselect && this.querySelectionsProf(val);
    },
    itemsearch(val) {
      val && val !== this.profselect && this.querySelectionsItem(val);
    },
    totalpieces: function () {
      this.computeeachcost();
    },
    quantity: function (val) {
      this.gettotalpieces(val);
    },
    priceeach: function () {
      if (parseFloat(this.priceeach) > 0)
        this.priceeachdisplay = this.currencyformat(this.priceeach);
      this.computeeachcost();
    },
    totalcost: function () {
      if (parseFloat(this.totalcost) > 0)
        this.totalcostdisplay = this.currencyformat(this.totalcost);
    },

  },
}; //end of export default
</script>

<style>
</style>
