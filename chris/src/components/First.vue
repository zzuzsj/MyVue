<template>
  <div class="container">
    <div class="text fadeInDown animated">{{ msg }}</div>
    <div class="dog fadeIn animated" @click="msgchange"></div>
  </div>
</template>

<script>
export default {
  name: "First",
  data() {
    return {
      msg: "清绛智障障，生日快乐"
    };
  },
  methods:{
    msgchange:function(){
      this.$data.msg = '天天开心哟~'; 
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
.text {
  width: 7rem;
  height: 8.4rem;
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  top: 1.3rem;
  background: url("../assets/bak4.png") center no-repeat;
  background-size: contain;
  font-size: 0.54rem;
  text-align: center;
  line-height: 8.1rem;
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
