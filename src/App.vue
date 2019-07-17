<template>
  <div id="app">
    <div class="row">
      <div class="col-sm-12 col-md-6">
        <table class="table table-hover">
          <thead class="thead-default">
            <tr>
              <th>Group</th>
              <th>Price</th>
              <th>Add to basket</th>
            </tr>
          </thead>
          <tbody v-for="(item, index) in getNames" :key="index">
            <tr>
              <td>
                <strong>{{ item.G }}</strong>
              </td>
            </tr>
            <tr v-for="option in item.B" :key="option">
              <td>{{ option.N }}"</td>
              <td>${{ option.price }}</td>
              <td>
                <button
                  class="btn btn-sm btn-outline-success"
                  type="button"
                  @click="addToBasket(item, option)"
                >+</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="col-sm-12 col-md-6">
        <table class="table table-hover">
          <thead class="thead-default">
            <tr>
              <th>Group</th>
              <th>Price</th>
              <th>Add to basket</th>
            </tr>
          </thead>
          <tbody v-for="(el, index) in dataGoods" :key="index">
            <tr>
              <td>
                <strong>{{ showGoodsAndNames(index).groupName }}</strong>
              </td>
            </tr>
            <tr>
              <td>{{ showGoodsAndNames(index).goodsTitle }} ({{ showGoodsAndNames(index).quantity }})</td>
              <td>{{ showGoodsAndNames(index).price }}</td>
              <td>
                <button
                  class="btn btn-sm btn-outline-success"
                  type="button"
                  @click="addToBasket(item, option)"
                >+</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div>
      <button type="button" class="btn btn-success" @click="getPosts">Get posts</button>
      <button type="button" class="btn btn-success" @click="getGoods">Get goods</button>
      <button
        type="button"
        class="btn btn-success"
        @click="showGoodsAndNames(0)"
      >Show goods by data.json index</button>
    </div>
    <div v-if="blogs.length > 0">
      <div v-for="blog in blogs" :key="blog">
        <h2>{{ blog.title }}</h2>
      </div>
    </div>
    <div v-else>No posts</div>

    <div v-if="dataGoods.length > 0">
      <div v-for="item in dataGoods" :key="item">
        <h2>{{ item.C }}</h2>
      </div>
    </div>
    <div v-else>No goods</div>

    <div>
      <h2>{{ shop }}</h2>
      <div>
        <p v-for="(it, index) in dataGoods" :key="index">{{showGoodsAndNames(index)}}</p>
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

export default {
  data() {
    return {
      blogs: [],
      dataGoods: [],
      shop: [],
      goodsName: names
    };
  },
  computed: {
    getNames() {
      return this.$store.getters.getNames;
    }
  },
  created() {
    this.getGoods();
    this.showGoodsAndNames();
  },
  methods: {
    getPosts() {
      this.blogs = [{ title: "Hello" }];
      /*axios.get('./posts.json')
          .then(response => (this.blogs = response.data))*/
      /*fetch('./posts.json')
            .then(r => r.json())
            .then(response => {
              this.blogs = response
            })*/
      //this.blogs = posts
    },
    getGoods() {
      this.dataGoods = data.Value.Goods;
    },

    showGoodsAndNames(index) {
      let groupId = this.dataGoods[index].G;
      let goodsId = this.dataGoods[index].T;
      const result = {
        quantity: this.dataGoods[index].P,
        price: this.dataGoods[index].C,
        groupId: this.dataGoods[index].G,
        groupName: this.goodsName[groupId].G,
        goodsId: this.dataGoods[index].T,
        goodsTitle: this.goodsName[groupId].B[goodsId].N
      };

      return (this.shop = result);
    }
  }
};
</script>

<style>
</style>
