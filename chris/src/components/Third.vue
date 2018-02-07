<template>
    <div class="container">
        <div class="ani shake animated"></div>
        <div class="bak fadeIn animated"></div>
        <div class="text bounceInUp animated">
            <span>不知不觉智障障这么大了</span>
            <span>真是有点鸡儿可怕</span>
            <span>好好长大哟</span>
            <span>蛋蛋后</span>
            <span>最后面那页是你的小礼物</span>
        </div>
        <!-- <div class="dog"></div> -->
    </div>
</template>

<script>
export default {
  name: "Third",
  data() {
    return {
      textshow: true,
      bakshow: false
    };
  },
  methods: {
    msgchange: function() {
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
  width: 100%;
  height: 100%;
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  opacity: 0.4;
  background: url("../assets/bak3.png") 0 1.2rem repeat-y;
  background-size: 100% 45.3%;
  color: #fff;
}
.ani {
  width: 100%;
  height: 6rem;
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("../assets/bak5.png") center no-repeat;
  background-size: contain;
  color: #fff;
}
.text {
  width: 6rem;
  height: 4rem;
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  top: 1.7rem;
}
.text span {
  width: 100%;
  height: 0.8rem;
  display: block;
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
