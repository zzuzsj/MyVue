<template>
  <div class="app-container" v-if="currentPage==pageIndex" ref="page2">
    <div class="g-top-bar">
      <div class="g-top-bartext">专家问诊周报</div>
      <div class="g-top-back">
        <</div>
      </div>
      <div class="g-body-container">
        <div class="g-toptext-container">
          <div class="g-toptext-title animated" :class="[bodyAnimateClass0,bodyAnimateDur,bodyAnimateDelay0]">
            <span class="u-toptext-title">图文接诊订单量</span>
          </div>
          <div class="g-toptext-count animated" :class="[bodyAnimateClass1,bodyAnimateDur,bodyAnimateDelay1]">
            <span class="u-toptext-text">
              <span class="u-toptext-count">{{ orderCount }}</span>
              <span class="u-toptext-p">单</span>
            </span>
          </div>
        </div>
        <div class="g-chart-container">
          <canvas class="u-chart-canvas" width="712" height="514" ref="chart"></canvas>
        </div>
        <div class="g-bottomtext-container animated" :class="[bodyAnimateClass0,bodyAnimateDur,bodyAnimateDelay2]">
          <span class="u-bottomtext-title">与上一周相比下降
            <span class="u-bottomtext-count">{{ disCount }}</span> 单</span>
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
  name: "PictureOrder",
  data() {
    return {
      pageIndex: 1,
      isInit: false,
      orderCount: 0,
      disCount: 0,
      bodyAnimateClass0: "fadeInDown",
      bodyAnimateClass1: "fadeIn",
      footerAnimateClass: "flash",
      bodyAnimateDur: "s-animate-duration08",
      bodyAnimateDelay0: "s-animate-delay02",
      bodyAnimateDelay1: "s-animate-delay10",
      bodyAnimateDelay2: "s-animate-delay20",
      zcanvas: null
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
      that.$data.orderCount = 0;
      that.$data.disCount = 0;
      setTimeout(function() {
        var tid = setInterval(function() {
          if (that.$data.orderCount >= 25) {
            clearInterval(tid);
          } else {
            that.$data.orderCount++;
          }
        }, 50);
        var tid2 = setInterval(function() {
          if (that.$data.disCount >= 5) {
            clearInterval(tid2);
          } else {
            that.$data.disCount++;
          }
        }, 100);
      },2000);
      that.$data.zcanvas = new ZCanvas(that.$refs.chart);
      that.chartInit();
    },
    chartInit: function() {
      var that = this;
      var zcanvas = this.$data.zcanvas;
      var datearr = [
        "07.01-07.08",
        "07.09-07.16",
        "07.17-07.24",
        "07.25-08.02"
      ];
      for (var i = 0; i < 7; i++) {
        var line = zcanvas.Line({
          x1: 90 * i + 85,
          y1: -600,
          x2: 90 * i + 85,
          y2: -200,
          dash: i % 2 != 0,
          dashes: 15,
          // lineWidth: 1,
          strokeStyle: "#fff",
          opacity: 0
        });
        zcanvas.addNode(line);
        zcanvas.renderNode(
          line,
          {
            delay: i * 10,
            time: 40
          },
          {
            x1: 90 * i + 85,
            y1: 50,
            x2: 90 * i + 85,
            y2: 450,

            // lineWidth: 1,
            strokeStyle: "#fff",
            opacity: 0.6
          }
        );
        if (i % 2 == 0) {
          var text = zcanvas.Text({
            x: 35 + i * 90,
            y: 470,
            fontSize: 18,
            fillStyle: "#fff",
            fill:true,
            opacity: 0,
            text: datearr[i / 2]
          });
          zcanvas.addNode(text);
          zcanvas.renderNode(
            text,
            {
              time: 50,
              delay: i * 10
            },
            {
              opacity: 1
            }
          );
        }
      }
      var y = [
        Math.random() * 200 + 100,
        Math.random() * 200 + 100,
        Math.random() * 200 + 100,
        Math.random() * 200 + 100
      ];
      var rndy = [Math.random() * 200 + 100];
      for (var i = 0; i < 3; i++) {
        var rdy = 2 * y[i] - rndy[i];
        rndy.push(rdy);
        var curline = zcanvas.CurveLine({
          curvePointX: [85 + i * 180, 85 + i * 180 + 90, 85 + (i + 1) * 180],
          curvePointY: [y[i], rdy, y[i + 1]],
          curveQuar: 2,
          lineLaunch: true,
          shadow: true,
          shadowOffsetY: 50,
          strokeStyle: "#ff6ace",
          shadowColor: "#fff",
          shadowBlur: 100,
          lineWidth: 8
        });
        zcanvas.addNode(curline);
        if(i==2){
           zcanvas.renderNode(curline, {
          time: 20,
          delay: i * 20 + 120
        },{},function(){
          that.$data.isInit = true;
        });
        }else{
          zcanvas.renderNode(curline, {
            time: 20,
            delay: i * 20 + 120
          });
        }
      }
    },
    pageUninit: function(index) {
      if(!this.$data.isInit){
        return;
      }
      this.$data.bodyAnimateDelay0 = "s-animate-delay02";
      this.$data.bodyAnimateDelay1 = "s-animate-delay02";
      this.$data.bodyAnimateDelay2 = "s-animate-delay02";
      this.$data.bodyAnimateClass0 =  "fadeOutUp";
      this.$data.bodyAnimateClass1 =  "fadeOut";
      this.$data.bodyAnimateDur = "s-animate-duration04";
      var that = this;
      setTimeout(function() {
        that.$data.isInit = false;
        that.$emit("switchpage", index);
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
  width: 3.9rem;
  height: 0.8rem;
  margin: 0 auto;
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
.g-toptext-count {
  width: 2rem;
  height: 1.02rem;
  margin: 0 auto;
  margin-top: 0.38rem;
  overflow: hidden;
}
.u-toptext-text {
  display: block;
  line-height: 1.02rem;
  text-align: center;
}
.u-toptext-count {
  font-size: 1rem;
  color: #ffffff;
  font-family: cursive;
  /* display: block; */
  line-height: 1.02rem;
  vertical-align: text-bottom;
  font-weight: 900;
}
.u-toptext-p {
  font-size: 0.4rem;
  color: #ffffff;
  line-height: 0.96rem;
  font-weight: 500;
  vertical-align: unset;
}
.g-chart-container {
  width: 7.12rem;
  height: 5.14rem;
  margin: 0 auto;
  margin-top: 0.5rem;
  overflow: hidden;
}
.u-chart-canvas {
  width: 7.12rem;
  height: 5.14rem;
}
.g-bottomtext-container {
  width: 4.44rem;
  height: 0.68rem;
  margin: 0 auto;
  margin-top: 1.16rem;
  overflow: hidden;
}
.u-bottomtext-title {
  display: block;
  line-height: 0.68rem;
  color: #ffffff;
  font-size: 0.38rem;
  text-align: center;
}
.u-bottomtext-count {
  font-size: 0.58rem;
  font-family: cursive;
  line-height: 0.68rem;
  vertical-align: bottom;
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
