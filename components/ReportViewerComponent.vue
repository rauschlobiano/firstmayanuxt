<template>
  <v-app>
    <div  ref="draggableContainerReportViewer" id="draggable-container-reportviewer"
      class="pa-0"
      @click="incrementZindex"
    >
      <v-card elevation="2" min-width="900" height="700" v-if="showflag">
        <div id="draggable-header-reportviewer" @mousedown="dragMouseDown">
          <v-row>
            <v-col cols="2">
              <span style="color: white; font-size: 12px"> Report Viewer </span>
            </v-col>
            <v-spacer> </v-spacer>
            <v-col cols="1" class="text-right">
              <v-btn  x-small  icon  dark
                @click="tellParentToHideThis" class="mr-1">
                <v-icon>mdi-power</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </div>
        <v-container style="max-height: 670px" class="overflow-y-auto">

          <v-btn @click="print" absolute right icon color="primary" class="mr-4"><v-icon>mdi-printer</v-icon> Print</v-btn>

          <v-row>
            <v-col cols="3">
              <v-select v-model="selectedReportType" dense class="caption"
                :items="reportTypes" label="Report Type" @change="reportTypeChanged"
              >
              </v-select>
            </v-col>
            <v-col cols="2">
              <v-text-field class="caption" dense v-model="filters.dateFrom" label="Date From"
               :rules="dateRules" >
              </v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field class="caption" dense v-model="filters.dateTo" label="Date To"
               :rules="dateRules" >
              </v-text-field>
            </v-col>
            <v-col>
              <v-btn small color="primary" @click="getReportData">Load Report</v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <div id="printMe">
                <div style="text-align: center" class="arial">
                  <v-row dense>
                    <v-col>
                      <span class="company"> {{ companyName }} </span> <br>
                      <span class="subtitle"> {{ subTitle }} </span>
                    </v-col>
                  </v-row>
                  <v-row dense>
                    <v-col>
                      <span class="reportname" > {{ reportName }} </span>
                    </v-col>
                  </v-row>

                    <hr>
                    <v-row>
                      <v-col>
                        <v-data-table dense :headers="headers" :items="tableData" item-key="name"  class="arial elevation-1"
                        :hide-default-footer="true">
                        </v-data-table>
                      </v-col>
                    </v-row>

                  </div>
              </div>
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
    name: "ReportViewerComponent",
    props: ["showflag"],

    data: function () {
      return {
        reportTypes: ['Item Sales'],
        selectedReportType: '',
        filters: {
          dateFrom: '',
          dateTo: '',
        },

        output: null,
        companyName: "The Full Name of Company",
        subTitle: "Company complete address and contact number 123123123",
        reportName: "Name of Report",
        dateTime: "Header",
        snackbar: false,
        snackbartext: "",
        tableData: [],
        tableHeaders: [],
        grandTotal: 0,
        pageNumber: "Page x of X",

      headers: [
        { text: 'Client', value: 'client.accountname',},
        { text: 'Price Code', value: 'pricecode' },
        { text: 'Status', value: 'transstatus' },
        { text: 'Date', value: 'transdate' },
        { text: 'Total', value: 'transtotal', align: "right", },
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
      async getReportData() {
        //validate filters
        if(!this.validateDate(this.filters.dateFrom)){
          this.snackbar = true;
				  this.snackbartext = "Invalid Date From";
        }
        else if(!this.validateDate(this.filters.dateTo)){
          this.snackbar = true;
				  this.snackbartext = "Invalid Date To";
        }
        else
        {
          console.log('Getting report data...');
          let res = await this.callApi("POST", "/itemselltrans/reporttrans", {filters: this.filters});
          if (res.data) {
            console.log(res.data);
            this.tableData = res.data;
            //get the totals
            res.data.forEach(trans => {
              this.grandTotal += Number(trans.transtotal);
            });
            //add the total to the last row
            this.tableData.push({transtotal: this.grandTotal});
          } else {
            console.log("There are no transactions.");
          }
        }
      },
      validateDate(dt){
        var m = moment(dt, 'MM/DD/YYYY');
        return m.isValid();
      },
      tellParentToHideThis() {
        this.$emit("formclose", false);
      },
      reportTypeChanged(val) {
        console.log(val);
      },
      incrementZindex() {
        //if form is still shown
        if (this.showflag) {
          document.getElementById("draggable-container-reportviewer").style.zIndex =
            this.$store.state.lastzindex + 1;
          document.getElementById("draggable-header-reportviewer").style.zIndex =
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
        this.$refs.draggableContainerReportViewer.style.top =
          this.$refs.draggableContainerReportViewer.offsetTop -
          this.positions.movementY +
          "px";
        this.$refs.draggableContainerReportViewer.style.left =
          this.$refs.draggableContainerReportViewer.offsetLeft -
          this.positions.movementX +
          "px";
      },
      closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
      },

    },
    created() {
      this.filters.dateFrom = moment().format('MM/DD/YYYY');
      this.filters.dateTo = moment().format('MM/DD/YYYY');

    }
  }
</script>

<style scoped>

</style>
