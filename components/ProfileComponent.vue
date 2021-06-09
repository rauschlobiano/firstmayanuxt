<template>
<v-app>
  <div ref="draggableContainerProfile" id="draggable-container-profile" @click="incrementZindex">
      <v-card elevation="2"  v-if="showprofileflag">
            <div id="draggable-header-profile" @mousedown="dragMouseDown">
              <v-row>
                <v-col>
                  <span style="color: white; font-size: 12px">
                    Profiles
                  </span>
                </v-col>
                <v-col>
                  <v-btn x-small icon color="white" @click="tellParentToHideThis" right absolute>
                    <v-icon>mdi-power</v-icon>
                  </v-btn>
                </v-col>



              </v-row>
            </div>

              <v-container>
              <v-row>
                <v-col cols="12" md="3">
                  <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
                  <v-data-table :headers="headers" :items="this.$store.state.profileslistdata" item-key="address_id "
					          :items-per-page="12" class="elevation-1 my-0" :search="search"
                  >
          <template v-slot:body="{ items }">
						<tbody>
						<tr v-for="item in items" :key="item.address_id" @click="rowClicked(item)" :class="{'selectedRow': item.address_id == profileinfo.address_id}">
							<td>{{ item.address_id }}</td>

						</tr>
						</tbody>
					</template>
            </v-data-table>
                </v-col>
                <v-col cols="12" md="9">
                  <v-form v-model="valid" ref="form" lazy-validation >
                    <v-container>
                      <v-row>
                        <v-spacer></v-spacer>
                        <v-btn x-small light fab color="primary" @click="createnew" depressed class="mr-2">
                          <v-icon>mdi-plus</v-icon>
                        </v-btn>
                         <v-btn color="error" x-small @click="deleteprofile" v-if="!creating" depressed fab>
                          <v-icon small>mdi-minus</v-icon>
                        </v-btn>
                      </v-row>
                      <v-row>
                        <v-col cols="12" md="3" >
                          <v-text-field v-model="profileinfo.address_id" :rules="addressIDRules"
                          :counter="6" label="Address ID" @change="profchange"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="9">
                          <v-text-field v-model="profileinfo.name" :counter="50"
                          label="Full Name" @change="profchange" :rules="nameRules"></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" md="3" >
                          <v-select :items="this.$store.state.profiletypedata" label="Type"
                          v-model="profileinfo.type" @change="profchange"></v-select>
                        </v-col>
                        <v-col cols="12" md="9" >
                          <v-text-field v-model="profileinfo.email" label="E-mail" @change="profchange"></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" md="6" >
                          <v-text-field v-model="profileinfo.phone" label="Phone" @change="profchange"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6" >
                          <v-text-field v-model="profileinfo.fax" label="Fax" @change="profchange"></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" md="6" >
                          <v-text-field v-model="profileinfo.address" label="Address 1" @change="profchange"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6" >
                          <v-text-field v-model="profileinfo.address_2" label="Address 2" @change="profchange"></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" md="3" >
                          <v-text-field v-model="profileinfo.city" label="City" @change="profchange"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3" >
                          <v-text-field v-model="profileinfo.state" label="State" @change="profchange"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3" >
                          <v-text-field v-model="profileinfo.zip" label="Zip" @change="profchange"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3" >
                          <v-text-field v-model="profileinfo.country" label="Country" @change="profchange"></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row class="my-3">
                        <v-col>
                          <v-textarea solo v-model="profileinfo.notes" name="input-7-4" label="Notes" @change="profchange"></v-textarea>
                        </v-col>
                      </v-row>

                      <v-btn color="success" small @click="saveprofile" v-if="creating && valid" depressed bottom right absolute>
                        <v-icon small>mdi-content-save-all</v-icon> Save
                      </v-btn>

                    </v-container>
                  </v-form>
                </v-col>
              </v-row>
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

export default {
  name: 'ProfileComponent',
  props: ['showprofileflag'],
  data: function () {
    return {
      ...mapState(['counter','profileslistdata','lastzindex','profiletypedata']),
      search: '',
      valid: false,
      sampletype: ['test1','test2'],
      creating: true,
      snackbar: false,
      snackbartext: '',
      profileinfo: {
        id: '',
        address_id: '',
        name: '',
        address: '',
        address_2: '',
        type: '',
        city: '',
        phone: '',
        fax: '',
        email: '',
        notes: ''
      },
      headers: [
        {
          text: 'Address ID',
          align: 'start',
          value: 'address_id',
        },
      ],
      addressIDRules: [
        v => !!v || 'Address ID is required',
        v => (v && v.length <= 6) || 'Address ID must be 6 characters',
      ],
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 50) || 'Name must be less than 50 characters',
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],

      positions: {
        clientX: undefined,
        clientY: undefined,
        movementX: 0,
        movementY: 0
      }
    }
  },
  watch: {
    profileListWatch(newval, oldval) {
      console.log('list updated');
    }
  },
  async created() {
    console.log('Profiles Component Created')

  },
  computed: {
    profileListWatch () {
      return this.$store.state.profileslistdata
    },

  },
  methods: {
    ...mapMutations(['incrementCounter','closeProfile', 'mutateZindex']),
    handleInput (e) {
      this.$emit('input', this.content)
    },
    clearprofile() {
      this.profileinfo.id = ''
      this.profileinfo.address_id = ''
      this.profileinfo.name = ''
      this.profileinfo.address = ''
      this.profileinfo.address_2 = ''
      this.profileinfo.type = ''
      this.profileinfo.city = ''
      this.profileinfo.phone = ''
      this.profileinfo.fax = ''
      this.profileinfo.email = ''
      this.profileinfo.notes = ''
    },
    createnew() {
      this.creating = true;
      this.clearprofile
      this.$refs.form.reset()
      this.$refs.form.resetValidation()
    },

    async profchange(event){
      if(!this.creating){
        this.valid = this.$refs.form.validate()
        if(this.valid){
          try{
            let res = await this.callApi('post', '/updateprofile', this.profileinfo)
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

    async saveprofile(){
      if(this.creating){
        this.valid = this.$refs.form.validate()

        if(this.valid){
          try{
            let res = await this.callApi('post', '/createprofile', this.profileinfo)
            console.log(res)
            this.snackbar = true
            if(res.data.created){
              this.snackbartext = "Profile Created!"
              this.tellParentToUpdate()
              this.creating = false
            }
            else {
              this.snackbartext = "Sorry, Profile Not Created (Address ID is taken)"
            }
          }catch(ex){
            console.log(ex)
          }
        }
      }
    },
    async deleteprofile(){
      if(!this.creating) {
        try{
          let res = await this.callApi('post', '/deleteprofile', this.profileinfo)
          console.log(res)
          if(res){
            this.snackbar = true
            this.snackbartext = "Profile Deleted!"
            this.tellParentToUpdate()
            this.createnew()
          }
        }catch(ex){
          console.log(ex)
        }
      }
    },

  incrementZindex(){
    if(this.showprofileflag){
      document.getElementById('draggable-container-profile').style.zIndex = this.$store.state.lastzindex + 1;
      document.getElementById('draggable-header-profile').style.zIndex = this.$store.state.lastzindex + 2;
      this.mutateZindex()
      console.log(this.$store.state.lastzindex);

    }
  },

	rowClicked(value) {
    this.creating = false;
    //specified this one by one so that it will not copy the reactive properties
    //this will throw an error when its - this.profileinfo = value
		this.profileinfo.id = value.id
		this.profileinfo.address_id = value.address_id
		this.profileinfo.name = value.name
		this.profileinfo.address = value.address
		this.profileinfo.address_2 = value.address_2
		this.profileinfo.type = value.type
		this.profileinfo.city = value.city
		this.profileinfo.phone = value.phone
		this.profileinfo.fax = value.fax
		this.profileinfo.email = value.email
    this.profileinfo.notes = value.notes
    // console.log(this.profileinfo);
	},
  leftinput(e){
    console.log(e);
  },
    getProfilesList() {
      console.log(this.$store.state.profileslistdata);
    },
    hideform() {
      this.unishowprofile = !this.unishowprofile
    },
    tellParentToHideThis(){
      this.$emit('profileformclose', false)
    },
    tellParentToUpdate(){
      this.$emit('reupdateproflist')
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
      this.$refs.draggableContainerProfile.style.top = (this.$refs.draggableContainerProfile.offsetTop - this.positions.movementY) + 'px'
      this.$refs.draggableContainerProfile.style.left = (this.$refs.draggableContainerProfile.offsetLeft - this.positions.movementX) + 'px'
    },
    closeDragElement () {
      document.onmouseup = null
      document.onmousemove = null
    }
  }
}
</script>

<style>

.compact-form {
    transform: scale(0.875);
    transform-origin: left;
}

.smallers{
  font-size: 14px;
}
.custom-highlight-row{
  background-color: pink
}
#draggable-container-profile {
  position: absolute;
  z-index: 9;
  width: 900px;
}
#draggable-header-profile {
  z-index: 10;
  padding-left: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  background-color: #39465e;
}
</style>
