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
              <v-row dense>
                <v-col cols="12" md="4">
                  <v-text-field  v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
                  <v-data-table height="500px" :headers="headers" :items="this.$store.state.profileslistdata" item-key="_id "
					          :items-per-page="15" class="elevation-1 my-0" :search="search">
                    <template v-slot:body="{ items }">
                      <tbody>
                      <tr v-for="item in items" :key="item._id" @click="rowClicked(item)" :class="{'selectedRow': item._id == profileinfo._id}">
                        <td>{{ item.accountname }}</td>

                      </tr>
                      </tbody>
                    </template>
                  </v-data-table>
                </v-col>
                <v-col cols="12" md="8">
                  <v-form v-model="valid" ref="form" lazy-validation >
                    <v-container>
                      <v-row dense>
                        <v-spacer></v-spacer>
                        <v-btn x-small light fab color="primary" @click="createnew" v-if="!creating" depressed class="mr-2">
                          <v-icon>mdi-plus</v-icon>
                        </v-btn>
                         <v-btn color="error" x-small @click="deleteprofile" v-if="!creating" depressed fab>
                          <v-icon small>mdi-minus</v-icon>
                        </v-btn>
                      </v-row>

                      <v-row dense>
                        <v-col cols="9">
                          <v-text-field dense v-model="profileinfo.accountname" :counter="70"
                          label="Full Name" @change="profchange" :rules="nameRules"></v-text-field>
                        </v-col>
                        <v-col cols="3">
                          <v-text-field dense v-model="profileinfo.previd"
                          label="Prev ID" @change="profchange"></v-text-field>
                        </v-col>
                      </v-row>

                      <v-row dense>
                        <v-col cols="4">
                          <v-text-field dense v-model="profileinfo.fname" label="First" @change="profchange" :counter="30"></v-text-field>
                        </v-col>
                        <v-col cols="4">
                          <v-text-field dense v-model="profileinfo.mname" label="Middle" @change="profchange" :counter="30"></v-text-field>
                        </v-col>
                        <v-col cols="4">
                          <v-text-field dense v-model="profileinfo.lname" label="Last" @change="profchange" :counter="30"></v-text-field>
                        </v-col>
                      </v-row>

                      <v-row dense>
                        <v-col cols="12" md="4" >
                          <v-select dense :items="this.$store.state.accountstats" label="Account Status"
                          v-model="profileinfo.acctstat" @change="profchange"  item-value="accountstatid"
                          item-text="accountstatdescrip"></v-select>
                        </v-col>
                        <v-col cols="12" md="4" >
                          <v-select dense :items="this.$store.state.profiletypedata" label="Account Type"
                          v-model="profileinfo.proftype" @change="profchange"  item-value="proftypeid"
                          item-text="proftypedescrip"></v-select>
                        </v-col>
                        <v-col cols="12" md="4" >
                          <v-select dense :items="this.$store.state.profgroups" label="Group"
                          v-model="profileinfo.profgroup" @change="profchange"  item-value="profgroupid"
                          item-text="profgroupdescrip"></v-select>
                        </v-col>
                      </v-row>

                      <v-row dense>
                        <v-col cols="4" >
                          <v-text-field dense v-model="profileinfo.email" label="E-mail" @change="profchange"></v-text-field>
                        </v-col>
                        <v-col cols="4" >
                          <v-text-field dense v-model="profileinfo.phone" label="Phone" @change="profchange"></v-text-field>
                        </v-col>
                        <v-col cols="4" >
                          <v-text-field dense v-model="profileinfo.fax" label="Fax" @change="profchange"></v-text-field>
                        </v-col>
                      </v-row>


                      <v-row dense>
                        <v-col cols="12" md="6" >
                          <v-text-field dense v-model="profileinfo.address" label="Address 1" @change="profchange"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6" >
                          <v-text-field dense v-model="profileinfo.address_2" label="Address 2" @change="profchange"></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row dense>
                        <v-col cols="12" md="3" >
                          <v-text-field dense v-model="profileinfo.city" label="City" @change="profchange"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3" >
                          <v-text-field dense v-model="profileinfo.state" label="State" @change="profchange"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3" >
                          <v-text-field dense v-model="profileinfo.zip" label="Zip" @change="profchange"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3" >
                          <v-text-field dense v-model="profileinfo.country" label="Country" @change="profchange"></v-text-field>
                        </v-col>
                      </v-row>

                      <v-row dense>
                        <v-col cols="12" md="4" >
                          <v-select dense :items="this.$store.state.genders" label="Gender"
                          v-model="profileinfo.gender" @change="profchange" item-value="genderid"
                          item-text="genderdescrip"></v-select>
                        </v-col>
                        <v-col cols="12" md="4" >
                          <v-select dense :items="this.$store.state.genders" label="Gender"
                          v-model="profileinfo.gender" @change="profchange" item-value="genderid"
                          item-text="genderdescrip"></v-select>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col cols="12" md="4" >
                          <v-menu ref="menu" v-model="menu" :close-on-content-click="false" transition="scale-transition"
                            offset-y min-width="auto" >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field v-model="bdaydisplay"
                                label="Date of Birth" prepend-icon="mdi-calendar" readonly v-bind="attrs"
                                v-on="on" ></v-text-field>
                            </template>
                            <v-date-picker dense v-model="bdaydisplay" :active-picker.sync="activePicker"
                              :max="new Date().toISOString().substr(0, 10)" min="1950-01-01" @change="saveDate" ></v-date-picker>
                          </v-menu>
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
import {mapState, mapMutations} from 'vuex';
import moment from 'moment';

export default {
  name: 'ProfileComponent',
  props: ['showprofileflag'],
  data: function () {
    return {
      ...mapState(['counter','profileslistdata','lastzindex','profiletypedata']),

      activePicker: null,
      menu: false,
      bdaydisplay: '',
      search: '',
      valid: false,
      creating: true,
      snackbar: false,
      snackbartext: '',
      profileinfo: {
        _id: '',
        previd: '',
        accountname: '',
        fname:'',
        lname: '',
        mname: '',
        bday: '',
        address: '',
        address_2: '',
        createdBy: '',
        editedBy: '',
        billaddr1: '',
        shipaddr1: '',
        billaddr2: '',
        shipaddr2: '',
        tin: '',
        billcity: '',
        shipcity: '',
        area: '',
        salesperson: '',
        phone: '',
        fax: '',
        email: '',
        remarks: '',
        acctstat: 0,
        gender: 1,
        civilstat: 1,
        proftype: 1,
        profgroup: 1,
        clientgroupid: 1,
        pricecodeid: 1,
        hasbranches: false,
      },
      headers: [
        {
          text: 'Address ID',
          align: 'start',
          value: 'accountname',
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
    },

    bdaydisplay(val){
      console.log(val);
    },

    showprofileflag(){
      //always on top

    },

    menu (val) {
      val && setTimeout(() => (this.activePicker = 'YEAR'))
    },
  },
  async created() {

  },
  computed: {
    profileListWatch () {
      return this.$store.state.profileslistdata
    },

  },
  methods: {
    ...mapMutations(['incrementCounter','closeProfile', 'mutateZindex']),

    saveDate (date) {
      this.$refs.menu.save(date)
    },

    handleInput (e) {
      this.$emit('input', this.content)
    },
    clearprofile() {
      this.profileinfo.id = '';
      this.profileinfo._id = '';
      this.profileinfo.previd = '';
      this.profileinfo.accountname = '';
      this.profileinfo.fname = '';
      this.profileinfo.lname = '';
      this.profileinfo.mname = '';
      this.profileinfo.address = '';
      this.profileinfo.address_2 = '';
      this.profileinfo.createdBy = '';
      this.profileinfo.editedBy = '';
      this.profileinfo.billaddr1 = '';
      this.profileinfo.shipaddr1 = '';
      this.profileinfo.billaddr2 = '';
      this.profileinfo.shipaddr2 = '';
      this.profileinfo.tin = '';
      this.profileinfo.billcity = '';
      this.profileinfo.shipcity = '';
      this.profileinfo.area = '';
      this.profileinfo.salesperson = '';
      this.profileinfo.phone = '';
      this.profileinfo.fax = '';
      this.profileinfo.email = '';
      this.profileinfo.remarks = '';
      this.profileinfo.bday = null;
      this.bdaydisplay = null;
      this.profileinfo.acctstat = null;
      this.profileinfo.gender = null;
      this.profileinfo.civilstat = null;
      this.profileinfo.proftype = null;
      this.profileinfo.profgroup = null;
      this.profileinfo.clientgroupid = null;
      this.profileinfo.pricecodeid = null;
      this.profileinfo.hasbranches = null;
    },
    createnew() {
      this.creating = true;
      this.clearprofile;
      this.setdefaults();
      this.$refs.form.reset();
      this.$refs.form.resetValidation();
    },

    setdefaults() {
      this.profileinfo.acctstat = 1;
      this.profileinfo.gender = 1;
      this.profileinfo.civilstat = 1;
      this.profileinfo.proftype = 1;
      this.profileinfo.profgroup = 1;
      this.profileinfo.clientgroupid = 1;
      this.profileinfo.pricecodeid = 1;
      this.profileinfo.hasbranches = false;
    },

    async profchange(event){
      if(!this.creating){
        this.valid = this.$refs.form.validate()
        if(this.valid){
          try{
            let res = await this.callApi('PATCH', '/profiles/'+this.profileinfo._id, this.profileinfo)
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
            let res = await this.callApi('POST', '/profiles', this.profileinfo)
            console.log(res)
            this.snackbar = true
            if(res.data){
              this.snackbartext = "Profile Created!"
              this.tellParentToUpdate()
              this.creating = false
            }
            else {
              this.snackbartext = "Sorry, Profile Not Created"
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
          let res = await this.callApi('DELETE', '/profiles/' + this.profileinfo._id)
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
      this.mutateZindex();
    }
  },

	rowClicked(value) {
    this.creating = false;
    //specified this one by one so that it will not copy the reactive properties
    //this will throw an error when its - this.profileinfo = value
    this.profileinfo._id = value._id;
    this.profileinfo.previd = value.previd;
    this.profileinfo.accountname = value.accountname;
    this.profileinfo.fname = value.fname;
    this.profileinfo.lname = value.lname;
    this.profileinfo.mname = value.mname;
    this.profileinfo.bday = value.bday;
    this.profileinfo.address = value.address;
    this.profileinfo.address_2 = value.address_2;
    this.profileinfo.createdBy = value.createdBy;
    this.profileinfo.editedBy = value.editedBy;
    this.profileinfo.billaddr1 = value.billaddr1;
    this.profileinfo.shipaddr1 = value.shipaddr1;
    this.profileinfo.billaddr2 = value.billaddr2;
    this.profileinfo.shipaddr2 = value.shipaddr2;
    this.profileinfo.tin = value.tin;
    this.profileinfo.billcity = value.billcity;
    this.profileinfo.shipcity = value.shipcity;
    this.profileinfo.area = value.area;
    this.profileinfo.salesperson = value.salesperson;
    this.profileinfo.phone = value.phone;
    this.profileinfo.fax = value.fax;
    this.profileinfo.email = value.email;
    this.profileinfo.remarks = value.remarks;
    this.profileinfo.acctstat = value.acctstat;
    this.profileinfo.gender = value.gender;
    this.profileinfo.civilstat = value.civilstat;
    this.profileinfo.proftype = value.proftype;
    this.profileinfo.profgroup = value.profgroup;
    this.profileinfo.clientgroupid = value.clientgroupid;
    this.profileinfo.pricecodeid = value.pricecodeid;
    this.profileinfo.hasbranches = value.hasbranches;
    if(this.profileinfo.bday){
      let bday = this.profileinfo.bday;
      this.bdaydisplay = moment(bday.substring(0,10)).format('MMM DD YYYY')
    }
    else{
      this.bdaydisplay = null;
    }
    console.log(this.profileinfo);
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

</style>
