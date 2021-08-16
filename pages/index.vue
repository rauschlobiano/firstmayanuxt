<template>
  <v-app>
    <div data-app>

      <v-app-bar app color="deep-purple" dense dark fixed>
        <v-toolbar-title>Valhalla Online Services</v-toolbar-title>
        <h1 class="mx-4" style="color: gray">|</h1>
			<v-spacer></v-spacer>
			<div v-if="loggedin">
				<v-tooltip bottom style="z-index: 1000;">
					<template v-slot:activator="{ on, attrs }">
					<v-btn @click="logout" icon v-bind="attrs"  v-on="on">
						<v-icon>mdi-power</v-icon>
					</v-btn>
					</template>
					<span>Logout</span>
				</v-tooltip>

			</div>

      </v-app-bar>

      <v-row class="mt-6">
          <v-spacer></v-spacer>
          <v-col>
            <v-card elevation="5" style="z-index: 10" max-width="500" min-width="300" height="400" v-if="!loggedin">
              <v-row class="mx-auto">
                <v-col>
                <p class="text-h4 text--primary mt-4">
                  Please Login
                </p>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="mx-4">
                   <v-text-field  v-model="uname"   label="Username" required></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col  class="mx-4">
                   <v-text-field
                    v-model="passw"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.min]"
                    :type="show1 ? 'text' : 'password'"
                    name="input-10-1"
                    label="Password"
                    counter
                    @click:append="show1 = !show1"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="mx-auto">
                  <div class="orange darken-2 text-center">
                    <span class="white--text">{{message}}</span>
                  </div>
                </v-col>
              </v-row>

              <v-card-actions>
                <v-row>
                  <v-col class="text-right mx-auto">
                    <v-btn depressed  color="primary" class="mr-3 mt-4" @click="login">
                      Login
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-actions>

            </v-card>

          </v-col>
		  <v-spacer></v-spacer>
      </v-row>
	  <v-row>
		  <v-col cols="6" class="mx-auto">
			  <v-card v-if="loggedin" height="400">
				  <v-card-title>Welcome, {{this.$store.state.userinfo.fullname}}!</v-card-title>
				  <v-card-actions>
					<v-btn color="orange" text to="/yourstore">
						Go To Store
					</v-btn>

					<v-btn color="red" text @click="logout">
						Logout
					</v-btn>
				</v-card-actions>
			  </v-card>
		  </v-col>
	  </v-row>
    </div>
  </v-app>
</template>

<script>
import Vue from 'vue'
import { mapState, mapMutations } from "vuex";

export default {
  data: function() {
    return {
      ...mapState(["userinfo", "legituser"]),
      uname: '',
      passw: '',
      show1: false,
	  fullname: '',
      message: '',
      loggedin: false,

      rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 3 || 'Min 3 characters',
          emailMatch: () => (`The email and password you entered don't match`),
        },
    }
  },
  methods: {
    ...mapMutations(["updateUserInfo", "updateLegitUser", "updateUserId", "updateUserToken"]),
    //this displays on the server side
    asyncData({ isDev, route, store, env,params,query,req, res,redirect,error}) {
      console.log("done loading");
    },

    async login() {
      console.log('Logging in....');
      let res = await this.callApi("POST", "/userinfo/login", {uname: this.uname, passw: this.passw});
        console.log(res.data);
        this.message = res.data.message;
        if(res.data.status == "ok"){
			let dt = res.data.userData;
			//set the store userInfo and legitUser
			this.loggedin = true;
			// this.fullname = dt.fullname;
			this.updateLegitUser(true);
			this.updateUserInfo(dt);
			this.updateUserId(dt.id);
			this.updateUserToken(dt.relax);
			// this.$router.push('/mainpage')
        //   localStorage.setItem('suntoken', dt.relax);
        //   localStorage.setItem('sunuserid', dt.id);

          //set header
          // if( dt.relax ){
          //     window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + dt.relax;
          // }

          console.log(this.$store.state.userinfo);

        }
    },

    logout(){
     	this.loggedin = false;
     	this.updateLegitUser(false);
     	this.updateUserInfo({});
	  	this.updateUserId('');
		this.updateUserToken('');
      	this.message = '';
    }
  },
  created(){
	  console.log('created');
    //check if user is present
    if(this.$store.state.legituser){
      this.loggedin = true;
      console.log('user logged in');
    } else {
      this.loggedin = false;
    }

  }


}
</script>

<style>

</style>
