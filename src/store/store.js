import Vue from "vue";
import Vuex, { Store } from "vuex";

import { names } from './names'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    names
  },
  getters: {
    //getNames: state => state.names,
    getNames: state => state.names,
    numberOfOrders: state => state.orders.length
  }
});
