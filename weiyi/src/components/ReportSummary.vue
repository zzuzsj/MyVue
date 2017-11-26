<template>
  <div class="app-container" v-if="currentPage==pageIndex" ref="page3">
    <div class="g-top-bar">
      <div class="g-top-bartext">专家问诊周报</div>
      <div class="g-top-back">
        <</div>
      </div>
      <div class="g-body-container">
        <div class="g-toptext-container">
          <div class="g-toptext-title animated" :class="[bodyAnimateClass0,bodyAnimateDur,bodyAnimateDelay0]">
            <span class="u-toptext-title">结语</span>
          </div>
          <div class="g-toptext-count animated" :class="[bodyAnimateClass1,bodyAnimateDur,bodyAnimateDelay1]">
            <span class="u-toptext-text">您付出的是汗水</span>
            <span class="u-toptext-text">患者收获的是健康</span>
            <span class="u-toptext-text">感谢您的付出！</span>
          </div>
        </div>
        <div class="g-bottomtext-container animated" :class="[bodyAnimateClass0,bodyAnimateDur,bodyAnimateDelay2]">
          <span class="u-bottomtext-title">有时治愈，常常帮助，总是安慰</span>
          <span class="u-bottomtext-text">To cure some times, to relieve often and</span>
          <span class="u-bottomtext-text">to comfort always</span>
        </div>
      </div>
      <div class="g-footer-tool" :class="[bodyAnimateClass0,bodyAnimateDur,bodyAnimateDelay2]">
        <div class="u-footer-button">查看我的收入结算</div>
      </div>
    </div>
</template>

<script>
export default {
  name: "ReportSummary",
  data() {
    return {
      pageIndex: 6,
      isInit: false,
      bodyAnimateClass0: "fadeInUp",
      bodyAnimateClass1: "fadeInDown",
      footerAnimateClass: "flash",
      bodyAnimateDur: "s-animate-duration04",
      bodyAnimateDelay0: "s-animate-delay02",
      bodyAnimateDelay1: "s-animate-delay02",
      bodyAnimateDelay2: "s-animate-delay02"
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
      this.isInit = true;
    },
    pageUnInit: function(index) {
      if (!this.$data.isInit) {
        return;
      }
      var that = this;
      this.$data.bodyAnimateDelay1 = "s-animate-delay01";
      this.$data.bodyAnimateDelay2 = "s-animate-delay01";
      this.$data.bodyAnimateDelay3 = "s-animate-delay01";
      this.$data.bodyAnimateClass0 = "fadeOutUp";
      this.$data.bodyAnimateClass1 = "fadeOut";
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
.g-toptext-container {
  margin-top: 1.1rem;
}
.g-toptext-title {
  width: 4.5rem;
  height: 0.8rem;
  margin: 0 auto;
}
.g-toptext-count {
  margin-top: 0.2rem;
  height: 2.4rem;
}
.u-toptext-title {
  font-size: 0.54rem;
  font-family: fantasy;
  font-weight: 900;
  color: #ffffff;
  line-height: 0.8rem;
  text-align: center;
  display: block;
  text-shadow: 4px 8px 14px #3c76fb;
}
.u-toptext-text {
  display: block;
  line-height: 0.7rem;
  text-align: center;
  font-size: 0.32rem;
  color: #fff;
  font-weight: 900;
}
.g-bottomtext-container {
  width: 6rem;
  height: 1.5rem;
  margin: 0 auto;
  margin-top: 3.6rem;
  overflow: hidden;
}
.u-bottomtext-title {
  display: block;
  line-height: 0.68rem;
  color: #ffffff;
  font-size: 0.28rem;
  text-align: center;
}
.u-bottomtext-text {
  display: block;
  line-height: 0.4rem;
  color: #ffffff;
  font-size: 0.24rem;
  letter-spacing: 0.02rem;
  text-align: center;
  font-family: serif;
}
.g-footer-pre {
  width: 0.4rem;
  height: 0.4rem;
  text-align: center;
  margin: 0 auto;
  margin-top: 0.8rem;
}
.u-footer-button {
  width: 3.4rem;
  height: 0.9rem;
  margin: 0 auto;
  line-height: 0.9rem;
  color: #fff;
  background: #fe7dcb;
  border-radius: 0.2rem;
  font-size: 0.3rem;
  text-align: center;
}
</style>

