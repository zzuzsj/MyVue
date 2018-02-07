<template>
    <div class="container">
        <div class="text bounceInDown animated">
            <span>{{ msg1 }}</span>
            <span>{{ msg2 }}</span>

        </div>
        <div class="head bounceInDown animated">
            <img src="../assets/head.jpg" alt="" class="headimg">
        </div>
        <div v-if="headshow" class="cup fadeInDown animated"></div>
        <div class="dog fadeIn" @click="addhead"></div>
    </div>
</template>

<script>
export default {
  name: "Fourth",
  data() {
    return {
      msg1: "智障障",
      msg2: "点击右下角领取你的小礼物噢",
      headshow: false
    };
  },
  methods: {
    addhead: function() {
      this.$data.headshow = true;
      this.$data.msg1= "送你帽子一枚";
      this.$data.msg2= "Merry Chrismas And Birth";
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
  width: 100%;
  height: 1.6rem;
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  bottom: 4rem;
}
.text span {
  width: 100%;
  height: 0.8rem;
  display: block;
  font-size: 0.5rem;
  text-align: center;
  line-height: 0.8rem;
  font-family: cursive;
  color: #fff;
}
.head {
  width: 3.6rem;
  height: 3.6rem;
  position: absolute;
  margin: auto;
  top: 2.5rem;
  right: 0;
  left: 0;
  background: #fff;
  border-radius: 50%;
  overflow: hidden;
  border: solid 0.2rem #97d5da;
}
.headimg {
  width: 2.6rem;
  height: 2.6rem;
  margin: 0.5rem;
  text-align: center;
}
.cup {
  width: 1.6rem;
  height: 1.6rem;
  position: absolute;
  top: 2.6rem;
  left: 2.6rem;
  background: url("../assets/bak2.png") center no-repeat;
  background-size: contain;
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
