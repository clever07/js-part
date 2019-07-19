<template>
  <div id="app">
    <div class="row">
      <div class="col-sm-12 col-md-6">
        <table class="table table-hover" v-if="shop.length > 0">
          <thead class="thead-default">
            <tr>
              <th>Категория</th>
              <th>Цена</th>
              <th></th>
            </tr>
          </thead>
          <tbody v-for="(el, index) in shop" :key="index">
            <tr>
              <td>
                <strong>{{ el.groupName }}</strong>
              </td>
            </tr>
            <tr>
              <td>{{ el.goodsTitle }} ({{ el.quantity }})</td>
              <td>{{ el.price | currency }} руб</td>
              <td>
                <button
                  class="btn btn-sm btn-outline-success"
                  type="button"
                  @click="addToBasket(el)"
                >+</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!--Shoping basket-->
      <div class="col-sm-12 col-md-6">
        <div v-if="basket.length > 0">
          <table class="table">
            <thead class="thead-default">
              <tr>
                <th>Наименование товара и описание</th>
                <th>Количество</th>
                <th>Цена</th>
                <th></th>
              </tr>
            </thead>
            <tbody v-for="item in basket" :key="item">
              <tr>
                <td>{{ item.groupName }}. {{ item.goodsTitle }}</td>
                <td>
                  <button class="btn btn-sm" type="button" @click="decreaseQuantity(item)">-</button>
                  <span>{{ item.quantity }}</span>
                  <button class="btn btn-sm" type="button" @click="increaseQuantity(item)">+</button>
                </td>
                <td>{{ item.price * item.quantity | currency }} руб</td>
                <td>
                  <button
                    class="btn btn-sm btn-danger"
                    type="button"
                    @click="removeFromBasket(item)"
                  >Удалить</button>
                </td>
              </tr>
            </tbody>
          </table>
          <p>Общая стоимость: {{ total | currency}} руб</p>
          <button class="btn btn-success btn-block" @click="addNewOrder">Оформить заказ</button>
        </div>
        <div v-else>
          <p>{{ basketText }} {{ numberOfOrders }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import data from "./data.json";
import { names } from "./store/names";
import { store } from "./store/store.js";

import { mapGetters } from "vuex";

export default {
  data() {
    return {
      dataGoods: [],
      shop: [],
      goodsName: names,
      basket: [],
      basketText: "Ваша корзина пуста!",
      currencyRUB: 63
    };
  },
  computed: {
    ...mapGetters(["getNames", "getShop", "getOrders", "numberOfOrders"]),
    total() {
      var totalCoast = 0;
      for (var items in this.basket) {
        var individualItem = this.basket[items];
        totalCoast += individualItem.quantity * individualItem.price;
      }
      return totalCoast;
    }
  },
  created() {
    //get data from data.json
    this.getGoods();

    //combine data.json and name.js
    this.addGoodsToShop();

    //push goods to store.js into shop array using vuex
    this.pushToShop();
  },
  methods: {
    //fetching all objects from data.Value.Goods chain
    getGoods() {
      this.dataGoods = data.Value.Goods;
    },

    //Combine data.json and names.js and find goods by index
    showGoodsAndNames(index) {
      let groupId = this.dataGoods[index].G;
      let goodsId = this.dataGoods[index].T;
      const result = {
        quantity: this.dataGoods[index].P,
        price: this.dataGoods[index].C * this.currencyRUB,
        groupId: this.dataGoods[index].G,
        groupName: this.goodsName[groupId].G,
        goodsId: this.dataGoods[index].T,
        goodsTitle: this.goodsName[groupId].B[goodsId].N
      };

      return this.shop.push(result);
    },

    //Find all goods from data.json by index
    addGoodsToShop() {
      for (var item in this.dataGoods) {
        this.showGoodsAndNames(item);
      }
    },
    //Push founded goods into shop array, located in store.js using vuex
    pushToShop() {
      //this.$store.commit('addGoodsToShop', this.shop)
      store.dispatch("setShop", this.shop);
    },

    //Basket
    //Add goods to basket
    addToBasket(el) {
      this.basket.push({
        goodsTitle: el.goodsTitle,
        price: el.price,
        groupName: el.groupName,
        quantity: 1,
        maxQuantity: el.quantity
      });
    },
    //Remove goods from basket
    removeFromBasket(el) {
      this.basket.splice(this.basket.indexOf(el), 1);
    },
    //Decrease quantity of goods
    decreaseQuantity(el) {
      el.quantity--;

      if (el.quantity === 0) {
        this.removeFromBasket(el);
      }
    },
    //Increase quantity of goods
    increaseQuantity(el) {
      if (el.quantity < el.maxQuantity) {
        el.quantity++;
      } else {
        alert("Количество ограничено");
      }
    },
    //Add a new order
    addNewOrder() {
      store.dispatch('setOrders', this.basket)
      this.basket = []
      this.basketText = 'Спасибо, Ваш заказ принят!'
    }
  }
};
</script>
<style>
</style>
