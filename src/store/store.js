import Vue from "vue";
import Vuex, { Store } from "vuex";

import { names } from './names'

import * as actions from './actions'
import * as getters from './getters'
import * as mutations from './mutations'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    names,
    shop: [],
    orders: []
  },
  getters,
  mutations,
  actions
});
