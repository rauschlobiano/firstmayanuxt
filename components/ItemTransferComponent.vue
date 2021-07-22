<template>
  <v-app>
    <div  ref="draggableContainerItemTransfer" id="draggable-container-ItemTransfer"
      class="pa-0"  @click="incrementZindex">
      <v-card elevation="2" :min-width="1100" v-if="showflag">
        <div id="draggable-header-ItemTransfer" @mousedown="dragMouseDown">
          <v-row>
            <v-col cols="2">
              <span style="color: white; font-size: 12px"> Item Transfer </span>
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
            <v-col cols="2">
              <v-text-field dense v-model="search"  append-icon="mdi-magnify"  label="Search"
                single-line hide-details>
              </v-text-field>

              <v-data-table height="500px" :headers="headers" :items="this.$store.state.itemtransfertrans"
                item-key="_id"  no-data-text="No Data" :hide-default-footer="true"
                class="elevation-1 my-0" :search="search"  disable-pagination>
                <template v-slot:body="{ items }">
                  <tbody>
                    <tr v-for="item in items" :key="item._id" @click="selectItem(item)"
                      :class="{
                        selectedRow: item._id == selectedtrans._id,
                      }">
                      <td>{{ item.transdate }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-data-table>
            </v-col>

            <v-col cols="10">
               <v-row>
                  <v-col>
                    <div class="text-right">
                      <v-btn class="mr-1" small  outlined color="primary"
                        @click="createnew" v-if="!creating" depressed
                        ><v-icon>mdi-plus</v-icon> Create
                      </v-btn>
                    </div>
                  </v-col>
              </v-row>
              <v-row>
                <v-col cols="5">
                  <v-row dense>
                    <!-- SOURCE -->
                    <v-col cols="12">
                      <v-select v-model="itemSourceLocation" dense :rules="inputRules" :items="this.$store.state.itemlocations"
                        label="Source Location"  item-text="location" class="centered-input caption" v-if="creating"
                        item-value="location" @change="selectSourceLocation"
                      >
                      </v-select>


						            <v-text-field v-model="itemSourceLocation" dense label="Source Location" readonly v-if="!creating">
                        </v-text-field>

                    </v-col>
                  </v-row>

                  <v-row dense>
                    <v-col cols="12">
                      <v-text-field dense v-model="searchSourceItem"  append-icon="mdi-magnify"  label="Search" single-line hide-details>
                      </v-text-field>

                      <div class="caption font-weight-bold">SOURCE ITEMS</div>

                      <v-data-table
                        height="377px" :headers="sourceitemsheader"  :items="sourceItems" item-key="itemcounter" no-data-text="No Items"
                        :hide-default-footer="true" class="elevation-1 my-0" :search="searchSourceItem" v-if="creating">
                        <template v-slot:body="{ items }">
                          <tbody>
                            <tr v-for="item in items" :key="item._id" @click="selectSourceItem(item)" @dblclick="selectSourceItemDialog(item)"
                              :class="{
                                selectedRow: item._id == selectedSourceItem._id,
                              }">
                                <td>{{item.itemcode}}</td>
                              <td>{{item.itemdescrip}}</td>
                              <td>{{item.totalpieces}}</td>
                            </tr>
                          </tbody>
                        </template>
                      </v-data-table>

                    </v-col>
                  </v-row>

                </v-col>

                <v-col cols="7">
                   <v-row dense>
                    <!-- DESTINATION -->
                    <v-col cols="8">
                      <v-select v-model="itemDestinationLocation" dense :rules="inputRules" :items="this.$store.state.itemlocations"
                        label="Destination Location"  item-text="location" class="centered-input caption" v-if="creating"
                        item-value="location" @change="selectDestinationLocation"
                      >
                      </v-select>

						            <v-text-field v-model="itemDestinationLocation" dense label="Destination Location" readonly v-if="!creating">
                        </v-text-field>

                    </v-col>
                    <v-col>
                      <!-- DATE -->
                      <v-text-field class="right-input caption" v-model="transinfo.transdate" dense
                        label="Date" :rules="dateRules" @change="transdateChanged" v-if="creating">
                      </v-text-field>

                      <v-text-field v-model="transinfo.transdate" dense label="Date" readonly v-if="!creating">
                      </v-text-field>
                    </v-col>

                    </v-row>
                    <v-row >
                        <v-col cols="12">
                          <div class="caption font-weight-bold">ITEMS TO BE TRANSFERRED</div>
                          <v-data-table
                            height="390px" :headers="transitemsheader"  :items="transinfo.transitems" item-key="itemcounter" no-data-text="No Items"
                            :hide-default-footer="true" class="elevation-1 my-0">
                            <template v-slot:item="row">
                                <tr>
                                  <td>
                                      <v-btn class="caption" text light x-small v-if="creating"
                                        @click="removeItem(row.item)">
                                        <v-icon color="red">mdi-delete-outline</v-icon>
                                      </v-btn>
                                  </td>
                                  <td>{{row.item.itemcode}}</td>
                                  <td>{{row.item.itemdescrip}}</td>
                                  <td>{{row.item.quantity}}</td>
                                  <td>{{row.item.size}}</td>
                                </tr>
                            </template>
                          </v-data-table>
                        </v-col>
                      </v-row>
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


          <v-dialog v-model="itemdialog" height="500" width="450">
            <v-card>
              <v-container>
                  <v-row>
                    <v-col>

                          <v-form v-model="validsale" ref="transferform"
                            lazy-validation >
                            <v-row>
                              <v-col class="text-center">
                                <h4 class="ml-2">Transfer Item</h4>
                                <h4>{{selectedSourceItem.itemdescrip}}</h4>
                              </v-col>
                            </v-row>
                            <v-row class="mt-2">

                              <!-- QUANTITY -->
                              <v-col cols="6">
                                <v-text-field dense v-model="quantity" label="Quantity"
                                  class="centered-input caption" :rules="inputRules">
                                </v-text-field>
                              </v-col>

                              <!-- ITEM SIZE -->
                              <v-col cols="6">
                                <v-select v-model="itemsize" dense :rules="inputRules" :items="localitemsizes"
                                  label="Size"  item-text="itemsize" class="centered-input caption"
                                  item-value="itemsize" @change="selectsize"
                                >
                                </v-select>
                              </v-col>
                            </v-row>

                            <v-row>
                              <v-spacer></v-spacer>
                              <!-- ADD BUTTON -->
                              <v-col class="text-right">
                                <v-btn dark  small color="success"
                                  text @click="addtobasket">
                                  <v-icon>mdi-arrow-right</v-icon> Add
                                </v-btn>
                              </v-col>
                            </v-row>
                          </v-form>
                    </v-col>
                  </v-row>
                </v-container>
            </v-card>
          </v-dialog>

    </div>
  </v-app>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import moment from "moment";

export default {
  name: "ItemTransferComponent",
  props: ["showflag"],

  data: function () {
    return {
      ...mapState([
        "lastzindex",
        "ItemTransferssumdata",
        "vendorslistdata",
        "profileslistdata",
        "profilesarray",
      ]),
      showdialog: false,
      snackbar: false,
      snackbartext: "",
      itemdialog: false,
      searchSourceItem: "",
      searchDestinationItem: "",

      sourceItems: [],

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
      itemSourceLocation: '',
      itemDestinationLocation: '',

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
      selectedSourceItem: {
        _id: '',
        itemdescrip: '',
        itemcode: '',
        totalpieces: 0,
      },
      finalTransInfo: {
        transitems: []
      },
      finalItems: [],
      transinfo: {
        transdate: '',
        transstatus: "Posted",
        client: "",
        clientname: "",
        pricecode: "",
		    status: "Posted",
        transtotal: 0,
        transitems: [],
        itemsource: [],
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
        { text: "Transactions", align: "start", value: "transdate" },
      ],
      transitemsheader: [
        {  text: "", value: "x",  sortable: false, width: "5%",  fixed: true, class: 'dtheaderbg', align: 'center'},
        { text: "Code",  align: "center", value: "itemcode", class: "dtheaderbg", sortable: false, width: "8%", fixed: true,},
        { text: "Description", align: "center", value: "itemdescrip", class: "dtheaderbg", sortable: false, width: "20%", fixed: true,},
        { text: "Quantity", align: "center", value: "quantity", class: "dtheaderbg", sortable: false, width: "7%", fixed: true,},
        { text: "Size", align: "center", value: "size", class: "dtheaderbg", sortable: false, width: "10%", fixed: true,},
      ],
      sourceitemsheader: [
        { text: "Code",  align: "center", value: "_id", class: "dtheaderbg", sortable: false, width: "8%", fixed: true,},
        { text: "Description", align: "center", value: "itemdescrip", class: "dtheaderbg", sortable: false, width: "20%", fixed: true,},
        { text: "Pieces", align: "center", value: "totalpieces", class: "dtheaderbg", sortable: false, width: "20%", fixed: true,},

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
    ...mapMutations(["mutateZindex", "updateItemTransferTrans"]),
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

    addtobasket() {
      //verify if selected item totalpieces is not less than the desired transfer pieces
      if(Number(this.selectedSourceItem.totalpieces) < Number(this.totalpieces))
      {
        this.snackbar = true;
        this.snackbartext = "Destination Item Total Pieces must not be greater than Source Item Total Pieces";
      }
      else {
        //before adding, find similar items already in the list
        //based on itemcode, itemdescription and size
        //and combine the number of pieces
        let thereis = false;

          for (let i = 0; i < this.transinfo.transitems.length; i++)
          {
            const item = this.transinfo.transitems[i];
            if(item.itemdescrip == this.selectedSourceItem.itemdescrip
              && item.itemcode == this.selectedSourceItem.itemcode
              && item.size == this.itemsize)
              {
                //modify the existing item
                thereis = true;
                console.log(item);
                this.combinequantities(i);
                break;
              }
              };

          if(!thereis)
          {
            this.itemcounter++;
            //add new row to transaction items
            this.transinfo.transitems.push({
              _id: this.selectedSourceItem._id,
              itemcounter: this.itemcounter,
              itemlocation: this.itemDestinationLocation,
              itemcode: this.selectedSourceItem.itemcode,
              itemdescrip: this.selectedSourceItem.itemdescrip,
              totalpieces: this.totalpieces,
              totalinventory: this.totalpieces,
              quantity: this.quantity,
              itemsize: this.itemsize,
              size: this.itemsize,
              transtype: "Transfer",
            });
            //add also to sourceitems - negative inventory
            this.transinfo.itemsource.push({
              _id: this.selectedSourceItem._id,
              itemcounter: this.itemcounter,
              itemlocation: this.itemSourceLocation,
              itemcode: this.selectedSourceItem.itemcode,
              itemdescrip: this.selectedSourceItem.itemdescrip,
              totalpieces: this.totalpieces,
              totalinventory: Number(this.totalpieces) * -1,
              quantity: this.quantity,
              itemsize: this.itemsize,
              size: this.itemsize,
              transtype: "Transfer",
            });
          }
          this.finalitems = this.transinfo.transitems.concat(this.transinfo.itemsource);
          console.log(this.finalitems);
          this.itemdialog = false;
      }
    },

    combinequantities(itemindex){
      this.transinfo.transitems[itemindex].quantity += this.quantity;
      this.transinfo.transitems[itemindex].totalpieces += this.totalpieces;
    },

    async savetransaction() {
      //can't do form validation here because there's another form in the middle
      //doing manual validation
      //if (Object.keys(this.transinfo.client).length === 0) {
      if (this.itemSourceLocation.length <= 0) {
        this.snackbar = true;
        this.snackbartext = "Please select Source Location";
      } else if (parseFloat(this.itemDestinationLocation.length) <= 0) {
        this.snackbar = true;
        this.snackbartext = "Please select Destination Location";
      }
      else if(!this.validateDate(this.transinfo.transdate)){
        this.snackbar = true;
        this.snackbartext = "Date is not valid.";
      }
      else if(this.transinfo.notes.length <= 0){
        this.snackbar = true;
        this.snackbartext = "Please input Notes / Remarks.";
      }
      else if(this.transinfo.transitems.length <= 0){
        this.snackbar = true;
        this.snackbartext = "There is no transaction to save.";
      }

	    else {
        this.snackbar = false;
        this.transinfo.pricecode = "Supplier Price";
        this.transinfo.transtype = "Item Transfer";

        this.finalTransInfo = this.transinfo;
        this.finalTransInfo.transitems = this.finalitems;

        console.log(this.finalTransInfo);

        let res = await this.callApi("POST", "/itemselltrans", this.finalTransInfo);
        console.log(res);
        if (res.data.created) {
          this.creating = false;
          this.snackbar = true;
          this.snackbartext = "Transfer Transaction Saved!";

          this.clearAll();
          //update list
          //this.tellParentToUpdate();
          this.getalltransactions();
        }
        else {
          this.snackbar = true;
          this.snackbartext = "Transaction Failed....";
        }
      }
    },

    async selectSourceLocation(val){
      console.log('selecting source location: '+ val);
      //query all items in the select source location
      let res = await this.callApi("GET", "/itemselltrans/itemsbylocation/"+val);
      console.log(res.data);
      if (res.data) {
        this.sourceItems = res.data;
      } else {
        console.log("There are no transaction data.");
      }
    },

    selectDestinationLocation(selected){
      //must not be the same as Source
      if(this.itemSourceLocation == selected)
      {
        this.snackbar = true;
        this.snackbartext = "Destination Location must not be the same as Source Location";
        this.itemDestinationLocation = '';
      }
      else {
        console.log(this.itemDestinationLocation);
        console.log('selecting destination location');

      }
    },

    async getalltransactions() {
      let res = await this.callApi("GET", "/itemselltrans/itemtransferlist");
      console.log(res.data);
      if (res.data) {
        //format the date
        res.data.forEach(element => {
          element.transdate = moment(element.transdate).format('MM/DD/YYYY');
        });
        this.updateItemTransferTrans(res.data);
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
      this.transinfo._id = '';
      this.itemcounter = 0;
      this.transinfo.transtotal = 0;
      this.transinfo.transitems = [];
      this.grandtotaldisplay = "0.0";
      this.finalitems = [];
      this.finalTransInfo = {};
      this.itemSourceLocation = "";
      this.itemDestinationLocation = "";

      this.transinfo.client = "60c0e4ca879b195d4080b5e3";
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
    selectSourceItem(item) {
      this.selectedSourceItem._id = item._id;
      this.selectedSourceItem.itemdescrip = item.itemdescrip;
      this.selectedSourceItem.itemcode = item.itemcode;
      this.selectedSourceItem.totalpieces = item.totalpieces;

    },
    selectSourceItemDialog(item) {
      this.itemdialog = true;
      console.log(item);

      //also, get the item sizes based on the selected item
        //from itemsizepiece
        this.itemsizepieces.forEach((element) => {

          if (element.item_id == this.selectedSourceItem._id) {
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
    },

    async getspecifictrans(id) {
		this.clearAll();
      let res = await this.callApi("GET", "/itemselltrans/" + id);
      if (res.data)
      {
        console.log(res.data);
        let info = res.data;
        let theItems = [];
        //remove the items with negative totalinventory
        info.transitems.forEach(item => {
          if(Number(item.totalinventory) > 0){
            theItems.push(item);
            this.itemDestinationLocation = item.itemlocation;
          }
        });
        this.selectedtrans.clientname = '';

        this.transinfo._id = info._id;
        this.transinfo.transdate = moment(info.transdate).format('MM/DD/YYYY');
        this.transinfo.transstatus = info.transstatus;

        this.transinfo.clientname = '';
        this.transinfo.transtotal = info.transtotal;
        this.grandtotaldisplay = this.currencyformat(info.transtotal);
        this.transinfo.transitems = theItems;
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
        document.getElementById("draggable-container-ItemTransfer").style.zIndex =
          this.$store.state.lastzindex + 1;
        document.getElementById("draggable-header-ItemTransfer").style.zIndex =
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
      this.$refs.draggableContainerItemTransfer.style.top =
        this.$refs.draggableContainerItemTransfer.offsetTop -
        this.positions.movementY +
        "px";
      this.$refs.draggableContainerItemTransfer.style.left =
        this.$refs.draggableContainerItemTransfer.offsetLeft -
        this.positions.movementX +
        "px";
    },

    closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    },
  }, //end of methods

  async created() {

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
