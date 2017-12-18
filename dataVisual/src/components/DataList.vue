<template>
  <div class="container">
    <div class="top-bar">
      <span class="title">{{ title }}</span>
    </div>
    <div class="body-container">
      <div class="data-title">虚拟人物数据展示</div>
      <div class="data-container">
        <ul v-if="showData" class="data-list">
          <li>
            <span>Name</span>
            <span>Age</span>
            <span>Gender</span>
            <span>Profession</span>
          </li>
          <li v-for="pdata in personData">
            <span>{{ pdata.name }}</span>
            <span>{{ pdata.age }}</span>
            <span>{{ pdata.gender }}</span>
            <span>{{ pdata.profession }}</span>
          </li>
        </ul>
      </div>
      <div class="btn-contaier">
        <div class="btn-box">
          <router-link to="/echart" class="btn">Echart图表</router-link>
        </div>
        <div class="btn-box">
          <router-link to="/d3" class="btn">D3图表</router-link>
        </div>
        <div class="btn-box">
          <span class="btn" @click="getData">重新生成</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  name: "DataList",
  data() {
    return {
      title: "虚拟职业人数统计",
      personData: {},
      showData: false
    };
  },
  methods: {
    getData: function() {
      this.$http
        .get("/dataApi/data")
        .then(res => {
          this.$store.state.personData = res.data;
          this.$data.personData = res.data;
          this.$data.showData = true;
          console.log("success");
        })
        .catch(res => {
          console.log(res, "error");
        });
    }
  },
  mounted: function() {
    this.getData();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  width: 100%;
  height: 100%;
  background: #7fd4cd;
  overflow: hidden;
}
.top-bar {
  width: 100%;
  height: 60px;
  background: #5bacbf;
  position: relative;
}
.top-bar .title {
  width: 300px;
  height: 50px;
  color: white;
  font-weight: 900;
  text-align: center;
  line-height: 60px;
  margin: 0 auto;
  display: block;
  font-size: 28px;
}

.body-container {
  widows: 100%;
  height: 620px;
  margin: 0;
  overflow: hidden;
}
.data-title{
  width: 100%;
  height: 30px;
  line-height: 30px;
  margin: 20px auto;
  color: #fefefe;
  font-size: 22px;
  text-align: center;
}
.data-container {
  width: 88%;
  height: 420px;
  margin: 0 auto;
  overflow-x: hidden;
  overflow-y: scroll;
  background: #d4e8e6;
}
.data-container li {
  width: 100%;
  height: 20px;
  color: #333;
  line-height: 20px;
  font-size: 16px;
}
.data-container li span{
  display: block;
  width: 25%;
  height: 20px;
  float: left;
  text-align: center;
}
.btn-contaier{
  width: 90%;
  height: 60px;
  margin: 0 auto;
  margin-top: 20px;
}
.btn-box{
  width: 33.3%;
  height: 40px;
  float: left;
  margin: 0 auto;
  margin-top: 10px;
}
.btn-box .btn{
  width: 88%;
  height: 40px;
  display: block;
  background: #196e8b;
  color: white;
  font-size: 18px;
  text-align: center;
  line-height: 40px;
  margin: 0 auto;
  text-decoration: none;
}
</style>
