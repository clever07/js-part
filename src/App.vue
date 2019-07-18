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
          <button class="btn btn-success btn-block">Place Order</button>
        </div>
        <div v-else>
          <p>{{ basketText }}</p>
        </div>
      </div>
    </div>

    <div>
      <button type="button" class="btn btn-success" @click="getGoods">Get goods</button>
      <button
        type="button"
        class="btn btn-success"
        @click="showGoodsAndNames(0)"
      >Show goods by data.json index</button>
    </div>

    <div v-if="dataGoods.length > 0">
      <div v-for="item in dataGoods" :key="item">
        <h2>{{ item.C }}</h2>
      </div>
    </div>
    <div v-else>No goods</div>

    <div>
      <h2>{{ getShop }}</h2>
      <div>
        <!--<p v-for="(it, index) in dataGoods" :key="index">{{showGoodsAndNames(index)}}</p>-->
      </div>
      <!--<h2>{{ goodsName }}</h2>-->
    </div>
  </div>
</template>

<script>
import axios from "axios";
import posts from "./posts.json";
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
    ...mapGetters(["getNames", "getShop"]),
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
    this.getGoods();
    this.addGoodsToShop();
    this.pushToShop();
  },
  methods: {
    getGoods() {
      this.dataGoods = data.Value.Goods;
    },

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

      //return (this.shop = result);
      return this.shop.push(result);
    },

    addGoodsToShop() {
      this.showGoodsAndNames(0);
      this.showGoodsAndNames(1);
      this.showGoodsAndNames(2);
      this.showGoodsAndNames(3);
      this.showGoodsAndNames(4);
      this.showGoodsAndNames(5);
      this.showGoodsAndNames(6);
      this.showGoodsAndNames(7);
      this.showGoodsAndNames(8);
      this.showGoodsAndNames(9);
      this.showGoodsAndNames(10);
      this.showGoodsAndNames(11);
    },
    pushToShop() {
      //this.$store.commit('addGoodsToShop', this.shop)
      store.dispatch("setShop", this.shop);
    },

    //Basket
    addToBasket(el) {
      this.basket.push({
        goodsTitle: el.goodsTitle,
        price: el.price,
        groupName: el.groupName,
        quantity: 1,
        maxQuantity: el.quantity
      });
    },
    removeFromBasket(el) {
      this.basket.splice(this.basket.indexOf(el), 1);
    },
    decreaseQuantity(el) {
      el.quantity--;

      if (el.quantity === 0) {
        this.removeFromBasket(el);
      }
    },
    increaseQuantity(el) {
      if (el.quantity < el.maxQuantity) {
        el.quantity++;
      } else {
        alert("Количество ограничено");
      }
    }
  }
};
</script>

<style>
</style>
