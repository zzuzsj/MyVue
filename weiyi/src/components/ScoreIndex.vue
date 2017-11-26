<template>
  <div class="app-container" v-if="currentPage==pageIndex" ref="page1">
    <div class="g-top-bar">
      <div class="g-top-bartext">专家问诊周报</div>
      <div class="g-top-back">
        <</div>
      </div>
      <div class="g-body-container">
        <div class="g-headimg-container animated" :class="[bodyAnimateClass,bodyAnimateDur,bodyAnimateDelay0]">
          <div class="g-headimg-out" :class="ringClass"></div>
          <div class="g-headimg-box"></div>
        </div>
        <div class="g-text-container">
          <div class="g-text-title animated" :class="[bodyAnimateClass,bodyAnimateDur,bodyAnimateDelay1]">
            <span class="u-body-title">本周问诊成绩单</span>
          </div>
          <div class="u-text-line animated" :class="[bodyAnimateClass,bodyAnimateDur,bodyAnimateDelay2]"></div>
          <div class="g-text-eng animated" :class="[bodyAnimateClass,bodyAnimateDur,bodyAnimateDelay2]">
            <span class="u-body-eng">Experts diagnose weekly</span>
          </div>
          <div class="g-text-date animated" :class="[bodyAnimateClass,bodyAnimateDur,,bodyAnimateDelay3]">
            <span class="u-body-date">07.08-07.14</span>
          </div>
        </div>
      </div>
      <div class="g-footer-tool">
        <div class="g-footer-pre animated s-animate-1020i" :class="footerAnimateClass" @click="pageUninit(pageIndex+1)">
          <span class="u-footer-pre"></span>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: "ScoreIndex",
  data() {
    return {
      pageIndex: 0,
      isInit: false,
      ringClass: "u-in-ring",
      bodyAnimateClass: "fadeInUp",
      footerAnimateClass: "flash",
      bodyAnimateDur: "s-animate-duration08",
      bodyAnimateDelay0: "s-animate-delay0",
      bodyAnimateDelay1: "s-animate-delay05",
      bodyAnimateDelay2: "s-animate-delay10",
      bodyAnimateDelay3: "s-animate-delay15"
    };
  },
  mounted: function() {
    this.$nextTick(function() {
      var that = this;
      this.pageInit();
    });
  },
  props: ["currentPage"],
  methods: {
    pageInit: function() {
      var that = this;
      setTimeout(function() {
        that.$data.ringClass = "u-out-ring";
        that.$data.isInit = true;
      }, 10);
    },
    pageUninit: function(index) {
      var that = this;
      if(!that.$data.isInit){
        return;
      }
      this.$data.ringClass = "u-in-ring";
      this.$data.bodyAnimateDelay1 = "s-animate-delay01";
      this.$data.bodyAnimateDelay2 = "s-animate-delay01";
      this.$data.bodyAnimateDelay3 = "s-animate-delay01";
      this.$data.bodyAnimateClass = "fadeOutUp";
      this.$data.bodyAnimateDur = "s-animate-duration04";
      setTimeout(function() {
        that.$emit("switchpage", index);
        that.$data.isInit = false;
      }, 500);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.g-top-bartext {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  font-size: 0.38rem;
  color: #ffffff;
  font-weight: 100;
  line-height: 0.64rem;
  text-align: center;
}
.g-top-back {
  position: absolute;
  width: 0.64rem;
  height: 100%;
  left: 0;
  top: 0;
  font-size: 0.38rem;
  color: #ffffff;
  font-family: Georgia, serif;
  line-height: 0.64rem;
  text-align: center;
}
.g-headimg-container {
  width: 3.18rem;
  height: 3.18rem;
  margin: 0 auto;
  margin-top: 2.2rem;
  position: relative;
}
.g-headimg-box {
  width: 1.86rem;
  height: 1.86rem;
  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  border-radius: 50%;
  bottom: 0;
  right: 0;
  border: 0.09rem solid #95c0ff;
  background: url("../../src/assets/head.jpg") no-repeat center;
  background-size: 100% 100%;
  overflow: hidden;
}
.g-headimg-out {
  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  border-radius: 50%;
  bottom: 0;
  right: 0;
  background: #95c0ff;
  overflow: hidden;
  transition: all 1.4s linear 2.4s;
}
.u-in-ring {
  width: 2.04rem;
  height: 2.04rem;
  opacity: 1;
}
.u-out-ring {
  width: 3.18rem;
  height: 3.18rem;
  opacity: 0;
}
.g-text-container {
  width: 4.9rem;
  height: 3rem;
  margin: 0 auto;
}
.g-text-title {
  width: 100%;
  height: 1.4rem;
  margin: 0 auto;
  margin-top: 0.1rem;
}
.u-body-title {
  font-size: 0.7rem;
  font-family: fantasy;
  font-weight: 900;
  color: #ffffff;
  line-height: 1.4rem;
  text-align: center;
  display: block;
  text-shadow: 4px 8px 14px #3c76fb;
}
.u-text-line {
  width: 100%;
  height: 0.01rem;
  background: #cedcfc;
  margin: 0;
}
.g-text-eng {
  width: 100%;
  height: 0.5rem;
  margin: 0 auto;
}
.u-body-eng {
  font-size: 0.24rem;
  color: #ffffff;
  line-height: 0.5rem;
  text-align: center;
  display: block;
  letter-spacing: 0.09rem;
  font-weight: 100;
}
.g-text-date {
  width: 100%;
  height: 0.86rem;
  margin: 0 auto;
}
.u-body-date {
  font-size: 0.3rem;
  color: #ffffff;
  line-height: 0.86rem;
  text-align: center;
  display: block;
  letter-spacing: 0.03rem;
  font-weight: 900;
}
.g-footer-pre {
  width: 1rem;
  height: 1rem;
  text-align: center;
  margin: 0 auto;
}
.u-footer-pre {
  width: 1rem;
  height: 1rem;
  display: block;
  background: url("../assets/up.png") no-repeat center;
  background-size: 100% 100%;
}
</style>
