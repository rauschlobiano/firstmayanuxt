<template>
<v-app>
  <div ref="draggableContainerItem" id="draggable-container-item" class="pa-0" @click="incrementZindex">
      <v-card elevation="2" :min-width="900" v-if="showflag">
        <div id="draggable-header-item" @mousedown="dragMouseDown">
            <v-row>
            <v-col cols="12" md="2">
              <span style="color: white; font-size: 12px">
                Items
              </span>
            </v-col>
            <v-spacer>
            </v-spacer>
            <v-col cols="12" md="1">
              <v-btn x-small icon dark @click="tellParentToHideThis">
                <v-icon>mdi-power</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </div>

        <v-container>
          <v-row>
            <v-col cols="5">
              <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>

              <v-data-table height="500px" :headers="headers" :items="this.$store.state.itemslistdata" item-key="iteminfoid"
                :items-per-page="15" class="elevation-1 my-0" :search="search">
                <template v-slot:body="{ items }">
                  <tbody>
                  <tr v-for="item in items" :key="item._id" @click="selectItem(item)"
                  :class="{'selectedRow': item.itemcode == iteminfo.itemcode}">
                    <td>{{ item.itemdescrip }}</td>
                  </tr>
                  </tbody>
                </template>
              </v-data-table>
            </v-col>
            <v-col cols="7">
              <v-row>
                <v-col cols="3">
                  Item Details
                </v-col>
                <v-spacer></v-spacer>
                <v-col cols="12" md=4>
                  <div class="text-right">
                    <v-btn class="mr-1" x-small light fab color="primary" @click="createnew"
                    v-if="!creating" depressed>
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                    <v-btn x-small light fab color="error" @click="showdialog = true" v-if="!creating" depressed>
                      <v-icon>mdi-minus</v-icon>
                    </v-btn>
                  </div>
                </v-col>
              </v-row>

                <v-form v-model="valid" ref="form" lazy-validation class="mt-3">
                  <v-container>
                    <v-row dense>
                      <v-col cols="6">
                        <v-text-field dense v-model="iteminfo.itemcode" :rules="inputRules"
                        :counter="20" label="Code" @change="changetrigger">
                        </v-text-field>
                      </v-col>
                    </v-row>
                    <v-row dense>
                      <v-col cols="12">
                        <v-text-field dense v-model="iteminfo.itemdescrip" :counter="80"  :rules="inputRules"
                        label="Description" @change="changetrigger">
                        </v-text-field>
                      </v-col>
                    </v-row>
                    <v-row dense>
                      <v-col cols="12">
                        <v-select dense v-model="iteminfo.supplierprofid" :rules="inputRules"
                        :items="this.$store.state.vendorslistdata" label="Supplier" item-text="accountname"
                          item-value="_id" @change="changetrigger" >
                          </v-select>
                      </v-col>
                    </v-row>

                  </v-container>
                </v-form>

                <v-row>
                <v-tabs	v-model="tab" v-if="!creating">
                  <v-tab	v-for="item in tabitems" :key="item.tab">
                    {{ item.tab }}
                  </v-tab>
                </v-tabs>
                <v-tabs-items v-model="tab">
                  <!-- ITEM SIZE PIECE -->
                  <v-tab-item>
                    <v-card flat>
                      <v-row>
                        <v-col class="text-right">
                          <v-btn class="mr-1" x-small light fab color="info"
                            v-if="!creating" depressed>
                            <v-icon>mdi-plus</v-icon>
                          </v-btn>
                        </v-col>
                      </v-row>

                      <v-data-table height="200px" :headers="headerssizepiece" :items="itemsizepiecelocal" item-key="_id"
                        :items-per-page="15" class="elevation-1 my-2 mx-1">
                        <template v-slot:body="{ items }">
                        <tbody>
                        <tr v-for="item in items" :key="item._id" @click="selectItemSizePiece(item)"
                          :class="{'selectedRow': item._id == selecteditemsizepiece._id}">
                          <td>{{ item.itemsize }}</td>
                          <td>{{ item.pieces }}</td>
                          <td>{{ item.action }}</td>
                        </tr>
                        </tbody>
                        </template>
                        <template v-slot:item.actions="{ item }">
                          <v-icon
                            small
                            class="mr-2"
                            @click="editItem(item)"
                          >
                            mdi-pencil
                          </v-icon>
                          <v-icon
                            small
                            @click="deleteItem(item)"
                          >
                            mdi-delete
                          </v-icon>
                        </template>
                      </v-data-table>
                    </v-card>
                  </v-tab-item>
                  <!-- ITEM PRICING -->
                  <v-tab-item>
                    <v-card flat>
                      <v-data-table height="200px" :headers="headersprice" :items="itempricelocal" item-key="_id"
                        :items-per-page="15" class="elevation-1 my-0">
                        <template v-slot:body="{ items }">
                        <tbody>
                        <tr v-for="item in items" :key="item._id" @click="selectItemPrice(item)"
                          :class="{'selectedRow': item._id == selecteditemprice._id}">
                          <td>{{ item.pricecode }}</td>
                          <td>{{ dollarformat(item.price) }}</td>
                        </tr>
                        </tbody>
                        </template>
                      </v-data-table>
                    </v-card>
                  </v-tab-item>
                </v-tabs-items>
              </v-row>

              <v-btn color="success" small @click="saveitem" v-if="creating" :disabled="!valid" depressed bottom right absolute>
                <v-icon small>mdi-content-save-all</v-icon> Save
              </v-btn>

              <v-row dense v-if="!creating" class="font-weight-light mt-4">
                <v-spacer></v-spacer>
                Last Updated by <span class="font-weight-bold mx-1"> {{iteminfo.editedBy}}</span> on {{iteminfo.updatedAt}}
              </v-row>

            </v-col>
          </v-row>



          <v-dialog v-model="showdialog" max-width="290">
            <v-card>
              <v-card-title class="headline">
                Delete Item?
              </v-card-title>

              <v-card-text>
                This will delete the item permanently.
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn color="maroon" text @click="showdialog = false">
                  No
                </v-btn>

                <v-btn color="green darken-1" text @click="deleteitem">
                  Yes
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-container>
      </v-card>
      <v-snackbar v-model="snackbar"> {{snackbartext}}
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
import {mapState, mapMutations} from 'vuex'
import moment from 'moment'

export default {
  name: 'ItemComponent',
  props: ['showflag'],
  data: function () {
    return {
      ...mapState(['counter', 'lastzindex', 'itemslistdata', 'vendorslistdata']),
      valid: false,
      showdialog: false,
      snackbar: false,
      snackbartext: '',
      creating: true,
      tabitems: [
		  { tab: 'Size/Piece' },
          { tab: 'Pricing' }
		],
      tab: null,
	  itemsizepiecelocal: [],
	  itempricelocal: [],
    proceedtodelete: false,
	  selecteditemsizepiece: {},
	  selecteditemprice: {},
      iteminfo: {
        iteminfoid: '',
        itemcode: '',
        itemdescrip: '',
        supplierprofid: '',
        updatedAt: '',
        editedBy: '',
      },
      inputRules: [
        v => !!v || 'Address ID is required',
        //v => (v && v.length <= 6) || 'Address ID must be 6 characters',
      ],
      search: '',
      headers: [
        {text: 'Description',
        align: 'start',
        value: 'itemdescrip'
        }
      ],
      headerssizepiece: [
        {text: 'Size', align: 'start', value: 'itemsize', width: "50%"},
        {text: 'Pieces', align: 'start', value: 'pieces', width: "30%" },
        {text: 'Actions', align: 'start', value: 'actions', width: "20%"},
      ],
      headersprice: [
        {text: 'Price Code',
        align: 'start',
        value: 'pricecode'
        },
        {text: 'Price',
        align: 'start',
        value: 'price'
        },
      ],
      positions: {
        clientX: undefined,
        clientY: undefined,
        movementX: 0,
        movementY: 0
      }
    }
  },

  methods: {
    ...mapMutations(['incrementCounter','closeProfile', 'mutateZindex']),

	async getSizePiece(){
		try{
            let res = await this.callApi('GET', '/itemsizepieces/'+this.iteminfo._id)
			this.itemsizepiecelocal = res.data;

		}catch(ex){
		console.log(ex)
		}
	},
	async getPrices(){
		try{
            let res = await this.callApi('GET', '/itemprices/'+this.iteminfo._id)
			this.itempricelocal = res.data;

		}catch(ex){
		console.log(ex)
		}
	},

    async saveitem(){
      if(this.creating){
        this.valid = this.$refs.form.validate()

        if(this.valid){
          try{
            let res = await this.callApi('post', '/items', this.iteminfo)
            console.log(res)
            if(res){
              this.snackbar = true
              this.snackbartext = "Item Created!"
              this.tellParentToUpdate()
              this.creating = false
            }
            else{
              this.snackbar = true
              this.snackbartext = "Item Not Created!"
            }
          }catch(ex){
            console.log(ex)
          }
        }
      }
    },

    async changetrigger(event){
      if(!this.creating){
        this.valid = this.$refs.form.validate()
        if(this.valid){
          try{
            let res = await this.callApi('PATCH', '/items/'+this.iteminfo._id, this.iteminfo)
            console.log(res)
            if(res){
              this.tellParentToUpdate()
            }
          }catch(ex){
            console.log(ex)
          }
        }
      }
    },

    async deleteitem(){
      this.showdialog = false
      console.log('deleting item...');
      if(!this.creating) {
        try{
          let res = await this.callApi('DELETE', '/items/'+this.iteminfo._id, {})
          console.log(res)
          if(res.data){
            this.snackbar = true
            this.snackbartext = "Item Deleted!"
            this.tellParentToUpdate()
            this.createnew()
          }
        }catch(ex){
          console.log(ex)
        }
      }
    },

    tellParentToUpdate(){
      this.$emit('reupdateitemlist')
    },

  dollarformat(amt){
    return new Intl.NumberFormat('en', { currency: 'USD', style: 'currency',}).format(amt)
  },

	selectItem (item) {
      this.iteminfo._id= item._id
      this.iteminfo.itemcode = item.itemcode
      this.iteminfo.itemdescrip = item.itemdescrip
      this.iteminfo.supplierprofid = item.supplierprofid
      this.iteminfo.updatedAt = item.updatedAt ? moment(item.updatedAt).format('MMM DD yyyy hh:mm:ss A') : ''
      this.iteminfo.editedBy = item.editedBy

      this.creating = false

	  //get the item size pieces
	  this.getSizePiece();
	  //get the prices
	  this.getPrices();
    },

	selectItemSizePiece(item){
		this.selecteditemsizepiece = item;
		console.log(item);
	},
	selectItemPrice(item){
		this.selecteditemprice = item;
		console.log(item);
	},

    createnew(){
      this.creating = true
      this.cleanform()
      this.$refs.form.reset()
      this.$refs.form.resetValidation()
    },

    cleanform(){
      this.iteminfo.iteminfoid = ''
      this.iteminfo.itemcode = ''
      this.iteminfo.itemdescrip = ''
      this.iteminfo.supplierprofid = ''
      this.iteminfo.editedon = ''
      this.iteminfo.editedby = ''
    },

    incrementZindex(){
      //if form is still shown
      if(this.showflag){
        document.getElementById('draggable-container-item').style.zIndex = this.$store.state.lastzindex + 1
        document.getElementById('draggable-header-item').style.zIndex = this.$store.state.lastzindex + 2
        this.mutateZindex()
      }
    },

    hideform() {
      this.unishowprofile = !this.unishowprofile
    },

    tellParentToHideThis(){
      this.$emit('formclose', false)
    },

    dragMouseDown: function (event) {
      event.preventDefault()
      // get the mouse cursor position at startup:
      this.positions.clientX = event.clientX
      this.positions.clientY = event.clientY
      document.onmousemove = this.elementDrag
      document.onmouseup = this.closeDragElement
    },

    elementDrag: function (event) {
      event.preventDefault()
      this.positions.movementX = this.positions.clientX - event.clientX
      this.positions.movementY = this.positions.clientY - event.clientY
      this.positions.clientX = event.clientX
      this.positions.clientY = event.clientY
      // set the element's new position:
      this.$refs.draggableContainerItem.style.top = (this.$refs.draggableContainerItem.offsetTop - this.positions.movementY) + 'px'
      this.$refs.draggableContainerItem.style.left = (this.$refs.draggableContainerItem.offsetLeft - this.positions.movementX) + 'px'
    },

    closeDragElement () {
      document.onmouseup = null
      document.onmousemove = null
    }
  },
   watch: {

  },
  async created() {

  },
  computed: {

  },

}

</script>

<style>

</style>
