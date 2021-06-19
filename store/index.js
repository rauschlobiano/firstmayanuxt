//state
export const state = () => ({
  stateshowprofile: false,
  counter: 123,
  profileslistdata: [],
  profilesarray: [],

  genders: [],
  civilstats: [],
  accountstats: [],
  profgroups: [],
  clientgroups: [],
  pricecodes: [],

  itemslistdata: [],
  itemsarray: [],
  itemsizes: [],
  itemsizepieces: [],
  itemprices: [],
  itempricing: [],
  itemselltrans: [],
  vendorslistdata: [],
  profiletypedata: [],
  sellitemssumdata: [],
  lastzindex: 11,
})

//mutations
export const mutations = {
  mutationShowHideProfile(state){
    state.stateshowprofile = !state.stateshowprofile
  },
  directmodify(state){
    state.stateshowprofile = !state.stateshowprofile
  },
  incrementCounter(state){
    state.counter++
  },
  closeProfile(state){
    state.stateshowprofile = false
  },
  //profiles
  updateProfileList(state, newlist){
    state.profileslistdata = newlist
  },
  updateProfileArray(state, newlist){
    state.profilesarray = newlist
  },


  //items
  updateItemList(state, newlist){
    state.itemslistdata = newlist
  },
  updateItemArray(state, newlist){
    state.itemsarray = newlist
  },
  updateItemSize(state, newlist){
    state.itemsizes = newlist
  },
  updateItemSizePiece(state, newlist){
    state.itemsizepieces = newlist
  },
  updateItemPrice(state, newlist){
    state.itemprices = newlist
  },
  updateItemSellTrans(state, newlist){
    state.itemselltrans = newlist
  },

  //vendors
  updateVendorList(state, newlist){
    state.vendorslistdata = newlist
  },

  //taggings
  updateProfileTypeList(state, newlist){
    state.profiletypedata = newlist
  },
  updateGenderList(state, newlist){
    state.genders = newlist
  },
  updateAccountStatsList(state, newlist){
    state.accountstats = newlist
  },
  updateProfGroupList(state, newlist){
    state.profgroups = newlist
  },
  updatePriceCode(state, newlist){
    state.pricecodes = newlist
  },



  mutateZindex(state){
    state.lastzindex++
  }

}