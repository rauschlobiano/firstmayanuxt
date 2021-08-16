<template>
  <v-app>
    <div ref="draggableContainerAccount" id="draggable-container-account" class="pa-0" @click="incrementZindex">
      <v-card elevation="2" min-width="800" height="600" v-if="showflag">
        <div id="draggable-header-account" @mousedown="dragMouseDown">
          <v-row>
            <v-col cols="2">
              <span style="color: white; font-size: 12px"> Account Details </span>
            </v-col>
            <v-spacer> </v-spacer>
            <v-col cols="1" class="text-right">
              <v-btn x-small icon dark @click="tellParentToHideThis" class="mr-1">
                <v-icon>mdi-power</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </div>
        <v-container style="max-height: 670px" class="overflow-y-auto">
          <v-row>
            <v-col>
              User Details
            </v-col>
          </v-row>
          <v-row class="mt-4">
            <v-col cols="6">
              <v-text-field class="caption" dense v-model="userinfo.username" label="Username" :rules="requireUsername"> </v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field class="caption" dense v-model="userinfo.fullname" label="Name"> </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              Permissions
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3">
              <v-card>
                <v-row class="text-center">
                  <v-col class="text-h6" cols="6">
                    Profiles
                  </v-col>
                </v-row>
                <v-container>
                  <v-checkbox v-model="userinfo.permissions.profiles.canViewAll" dense label="View All"></v-checkbox>
                  <v-checkbox v-model="userinfo.permissions.profiles.canViewOne" dense label="View One"></v-checkbox>
                  <v-checkbox v-model="userinfo.permissions.profiles.canCreate" dense label="Create"></v-checkbox>
                  <v-checkbox v-model="userinfo.permissions.profiles.canEdit" dense label="Edit"></v-checkbox>
                  <v-checkbox v-model="userinfo.permissions.profiles.canDelete" dense label="Delete"></v-checkbox>
                </v-container>
              </v-card>
            </v-col>
            <v-col cols="3">
              <v-card>
                <v-row class="text-center">
                  <v-col class="text-h6" cols="6">
                    Items
                  </v-col>
                </v-row>
                <v-container>
                  <v-checkbox v-model="userinfo.permissions.items.canViewAll" dense label="View All"></v-checkbox>
                  <v-checkbox v-model="userinfo.permissions.items.canViewOne" dense label="View One"></v-checkbox>
                  <v-checkbox v-model="userinfo.permissions.items.canCreate" dense label="Create"></v-checkbox>
                  <v-checkbox v-model="userinfo.permissions.items.canEdit" dense label="Edit"></v-checkbox>
                  <v-checkbox v-model="userinfo.permissions.items.canDelete" dense label="Delete"></v-checkbox>
                </v-container>
              </v-card>
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
  name: "AccountComponent",
  props: ["showflag"],

  data: function() {
    return {
      snackbar: false,
      snackbartext: "",
      userinfo: {
        username: "",
        fullname: "",
        permissions: {
          profiles: {
            canViewAll: true,
            canViewOne: false,
            canEdit: false,
            canCreate: false,
            canDelete: true
          },
          items: {
            canView: false,
            canViewOne: true,
            canEdit: true,
            canCreate: false,
            canDelete: false
          }
        }
      },
      positions: {
        clientX: undefined,
        clientY: undefined,
        movementX: 0,
        movementY: 0
      },
      requireUsername: [v => !!v || "Username is required"]
    };
  },
  methods: {
    ...mapMutations(["mutateZindex"]),
    tellParentToHideThis() {
      this.$emit("formclose", false);
    },
    incrementZindex() {
      //if form is still shown
      if (this.showflag) {
        document.getElementById("draggable-container-account").style.zIndex = this.$store.state.lastzindex + 1;
        document.getElementById("draggable-header-account").style.zIndex = this.$store.state.lastzindex + 2;
        this.mutateZindex();
      }
    },
    dragMouseDown: function(event) {
      event.preventDefault();
      // get the mouse cursor position at startup:
      this.positions.clientX = event.clientX;
      this.positions.clientY = event.clientY;
      document.onmousemove = this.elementDrag;
      document.onmouseup = this.closeDragElement;
    },
    elementDrag: function(event) {
      event.preventDefault();
      this.positions.movementX = this.positions.clientX - event.clientX;
      this.positions.movementY = this.positions.clientY - event.clientY;
      this.positions.clientX = event.clientX;
      this.positions.clientY = event.clientY;
      // set the element's new position:
      this.$refs.draggableContainerAccount.style.top = this.$refs.draggableContainerAccount.offsetTop - this.positions.movementY + "px";
      this.$refs.draggableContainerAccount.style.left = this.$refs.draggableContainerAccount.offsetLeft - this.positions.movementX + "px";
    },
    closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    },
    currencyformat(amt) {
      return new Intl.NumberFormat("en", {
        currency: "Php",
        style: "currency"
      }).format(amt);
    },
    commaSeparate(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  },
  created() {}
};
</script>

<style scoped></style>
