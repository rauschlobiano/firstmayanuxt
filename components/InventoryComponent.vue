<template>
  <v-app>
    <div  ref="draggableContainerInventory" id="draggable-container-Inventory"
      class="pa-0"
      @click="incrementZindex"
    >
      <v-card elevation="2" min-width="700" height="700" v-if="showflag">
        <div id="draggable-header-Inventory" @mousedown="dragMouseDown">
          <v-row>
            <v-col cols="2">
              <span style="color: white; font-size: 12px"> Items Inventory </span>
            </v-col>
            <v-spacer> </v-spacer>
            <v-col cols="1" class="text-right">
              <v-btn  x-small  icon  dark @click="tellParentToHideThis" class="mr-1"> <v-icon>mdi-power</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </div>
        <v-container style="max-height: 670px" class="overflow-y-auto">
          <v-row>
            <v-spacer></v-spacer>
            <!-- <v-col cols="2">
                <v-text-field class="caption" dense v-model="filters.dateTo" label="As of "
                :rules="dateRules" >
                </v-text-field>
            </v-col> -->
            <v-col cols="1">
                <v-btn @click="getInventoryData" color="primary" small> Load Inventory </v-btn>
            </v-col>
            <v-spacer></v-spacer>
          </v-row>

          <v-row>
            <v-col>
              <v-data-table height="500px" :headers="headers" :items="inventoryData"
                item-key="_id"  no-data-text="No Data" :hide-default-footer="true"
                class="elevation-1 my-0" :search="search"  disable-pagination>
              </v-data-table>
            </v-col>
          </v-row>

        </v-container>
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
    name: "InventoryComponent",
    props: ["showflag"],

    data: function () {
      return {
        search: '',
        snackbar: false,
        snackbartext: '',
        asofdate: '',
        selectedReportType: 1,
        filters: {
          dateTo: '',
        },
        inventoryData: [

        ],
        headers: [
          { text: 'Code', value: '_id',},
          { text: 'Item Description', value: 'itemdescrip',},
          { text: 'Pieces', value: 'totalpieces' },
        ],
          positions: {
              clientX: undefined,
              clientY: undefined,
              movementX: 0,
              movementY: 0,
          },
          dateRules: [
            (v) => !!v || "Required",
            v => (v && this.validateDate(v)) || 'Invalid Date',
          ],
        }
    },
    methods: {
      ...mapMutations(["mutateZindex"]),
      async print () {
        // Pass the element id here
        await this.$htmlToPaper('printMe');
      },
      async getInventoryData() {
        //validate filters
        // if(!this.validateDate(this.filters.dateFrom)){
        //   this.snackbar = true;
				//   this.snackbartext = "Invalid Date-From";
        // }
        // else
        // {
        console.log('Getting inventory data...');
        let res = await this.callApi("POST", "/iteminventory/inventorycount", {filters: this.filters});
        console.log(res);
        if(Array.isArray(res.data))
        {
          let newarray = [];
          res.data.forEach(x => {
            x.totalpieces = this.commaSeparate(x.totalpieces);
            this.inventoryData.push(x);
          });
        }

      },
      validateDate(dt){
        var m = moment(dt, 'MM/DD/YYYY');
        return m.isValid();
      },
      tellParentToHideThis() {
        this.$emit("formclose", false);
      },

      incrementZindex() {
        //if form is still shown
        if (this.showflag) {
          document.getElementById("draggable-container-Inventory").style.zIndex =
            this.$store.state.lastzindex + 1;
          document.getElementById("draggable-header-Inventory").style.zIndex =
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
        this.$refs.draggableContainerInventory.style.top =
          this.$refs.draggableContainerInventory.offsetTop -
          this.positions.movementY +
          "px";
        this.$refs.draggableContainerInventory.style.left =
          this.$refs.draggableContainerInventory.offsetLeft -
          this.positions.movementX +
          "px";
      },
      closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
      },
      currencyformat(amt) {
        return new Intl.NumberFormat("en", {
          currency: "Php",
          style: "currency",
        }).format(amt);
      },
      commaSeparate(x){
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }

    },
    created() {
      let today = new Date();
      let firstday = new Date(today.getFullYear(),today.getMonth(),1);
      this.filters.dateFrom = moment(firstday).format('MM/DD/YYYY');
      this.filters.dateTo = moment().format('MM/DD/YYYY');

    }
  }
</script>

<style scoped>

</style>
