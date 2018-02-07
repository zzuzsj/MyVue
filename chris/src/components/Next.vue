<template>
  <div class="container">
      <div class="bak fadeIn animated" v-if="bakshow"></div>
    <div class="text fadeInDown animated" v-if="textshow" @click="msgchange">{{ msg }}</div>
    <!-- <div class="dog"></div> -->
  </div>
</template>

<script>
export default {
  name: "Next",
  data() {
    return {
    textshow:true,
    bakshow:false,
      msg: "点我点我(｡・`ω´･)"
    };
  },
  methods:{
    msgchange:function(){
      this.$data.textshow = false;
      this.$data.bakshow = true; 
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  width: 100%;
  height: 100%;
  position: relative;
  background: #e77171;
}
.bak {
  width:100%;
  height: 100%;
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
   background: url("../assets/bak1.png") center no-repeat;
  background-size: 100% 90%;
  color: #fff;
}
.text {
  width: 6rem;
  height: 0.8rem;
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  font-size: 0.54rem;
  text-align: center;
  line-height: 0.8rem;
  font-family: cursive;
  color: #fff;
}
.dog {
  width: 3rem;
  height: 3rem;
  position: absolute;
  bottom: 0;
  right: 0;
  background: url("../assets/bak6.png") 0 -0.03rem no-repeat;
  background-size: contain;
}
</style>
