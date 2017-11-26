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
            <span class="u-toptext-title">超时未接诊订单量</span>
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
          <span class="u-bottomtext-title">本周您错过了
            <span class="u-bottomtext-count">{{ addCount }}%</span> 的订单</span>
          <span class="u-bottomtext-text">您的5位患者只能求助于其他医生</span>
          <span class="u-bottomtext-text">请您下周记得及时接诊回复哦！</span>
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
  name: "OverOrder",
  data() {
    return {
      pageIndex: 3,
      isInit: false,
      orderCount: 0,
      addCount: 0,
      bodyAnimateClass0: "fadeInDown",
      bodyAnimateClass1: "fadeIn",
      footerAnimateClass: "flash",
      bodyAnimateDur: "s-animate-duration04",
      bodyAnimateDelay0: "s-animate-delay02",
      bodyAnimateDelay1: "s-animate-delay02",
      bodyAnimateDelay2: "s-animate-delay02",
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
      that.$data.addCount = 0;
      setTimeout(function() {
        var tid = setInterval(function() {
          if (that.$data.orderCount >= 5) {
            clearInterval(tid);
          } else {
            that.$data.orderCount++;
          }
        }, 100);
        var tid2 = setInterval(function() {
          if (that.$data.addCount >= 30) {
            clearInterval(tid2);
          } else {
            that.$data.addCount++;
          }
        }, 50);
        that.$data.isInit = true;
      }, 1500);
      that.$data.zcanvas = new ZCanvas(that.$refs.chart);
      that.chartInit();
    },
    chartInit: function() {
      var that = this;
      var zcanvas = this.$data.zcanvas;
      var circle = zcanvas.Circle({
        x: 356,
        y: 257,
        radius: 0,
        strokeWidth: 8,
        strokeStyle: "#e6f4ff",
        stroke: true,
        class: "circle_round"
      });
      zcanvas.addNode(circle);
      zcanvas.renderNode(
        circle,
        {
          time: 30
        },
        {
          radius: 200
        }
      );
      var startR = Math.PI * 2 / 3;
      var perR = Math.PI * 5 / 3 / 30;
      for (var i = 0; i <= 30; i++) {
        if (i == 0 || i == 15 || i == 30) {
          var but = zcanvas.Rect({
            orignX: 0,
            orignY: 0,
            width: 0,
            height: 0,
            rotate: startR + i * perR,
            x: 356,
            y: 257,
            fill: true,
            fillStyle: "#fff",
            class: "circle_rect"
          });
          zcanvas.addNode(but);
          zcanvas.renderNode(
            but,
            {
              time: 30
            },
            {
              orignX: -170,
              orignY: 5,
              width: 30,
              height: 5
            }
          );
          var px = (160 * Math.cos(startR + i * perR)).toFixed(2) * 1;
          var py = (160 * Math.sin(startR + i * perR)).toFixed(2) * 1;
          var butext = zcanvas.Text({
            x: 356 + px - 20,
            y: 257 + py - 13,
            fontSize: 20,
            text: i / 30 * 100 + "%",
            fill: true,
            fillStyle: "#fff",
            opacity: 0
          });
          zcanvas.addNode(butext);
          zcanvas.renderNode(
            butext,
            {
              time: 30
            },
            {
              opacity: 1
            }
          );
        } else {
          var dot = zcanvas.Dot({
            radius: 2,
            dotType: "round",
            cent: true,
            fill: true,
            fillStyle: "#e6f4ff",
            centX: 356,
            centY: 257,
            centRadius: 0,
            centRotate: startR + i * perR,
            class: "circle_dot"
          });
          zcanvas.addNode(dot);
          zcanvas.renderNode(
            dot,
            {
              time: 30
            },
            {
              centRadius: 185
            }
          );
        }
      }
      var arcshape = zcanvas.ArcShape({
        x: 356,
        y: 257,
        radius: 220,
        lineCap: "round",
        startAngle: startR,
        endAngle: startR,
        lineWidth: 12,
        strokeStyle: "#52cbff",
        stroke: true,
        arcLine: true,
        class: "arc_round"
      });
      zcanvas.addNode(arcshape);
      zcanvas.renderNode(
        arcshape,
        {
          time: 50,
          delay: 30
        },
        {
          startAngle: startR,
          endAngle: startR + perR * 30
        }
      );
      var arcline = zcanvas.ArcShape({
        x: 356,
        y: 257,
        radius: 220,
        lineCap: "round",
        startAngle: startR,
        endAngle: startR,
        lineWidth: 6,
        strokeStyle: "#fff",
        stroke: true,
        arcLine: true,
        class: "arc_line"
      });
      zcanvas.addNode(arcline);
      zcanvas.renderNode(
        arcline,
        {
          time: 30,
          delay: 80
        },
        {
          startAngle: startR,
          endAngle: startR + perR * 10
        }
      );
      var arcpie = zcanvas.ArcShape({
        x: 356,
        y: 257,
        radius: 200,
        lineCap: "round",
        startAngle: startR,
        endAngle: startR,
        lineWidth: 6,
        fillStyle: "#2fbbf0",
        stroke: false,
        arcLine: false,
        fill: true,
        class: "arc_pie"
      });
      zcanvas.addNode(arcpie);
      zcanvas.renderNode(
        arcpie,
        {
          time: 30,
          delay: 80
        },
        {
          startAngle: startR,
          endAngle: startR + perR * 10
        }
      );
      var arcdot = zcanvas.Dot({
        radius: 16,
        dotType: "round",
        cent: true,
        fill: true,
        stroke: true,
        strokeWidth: 3,
        strokeStyle: "#fff",
        fillStyle: "#42daff",
        centX: 356,
        centY: 257,
        centRadius: 220,
        centRotate: startR,
        class: "arc_dot"
      });
      zcanvas.addNode(arcdot);
      zcanvas.renderNode(
        arcdot,
        {
          time: 30,
          delay: 80
        },
        {
          centRotate: startR + 10 * perR
        }
      );
    },
    pageUninit: function(index) {
      if (!this.$data.isInit) {
        return;
      }
      var zcanvas = this.$data.zcanvas;
      var that = this;
      this.$data.bodyAnimateDelay0 = "s-animate-delay02";
      this.$data.bodyAnimateDelay1 = "s-animate-delay02";
      this.$data.bodyAnimateDelay2 = "s-animate-delay02";
      this.$data.bodyAnimateClass0 = "fadeOutUp";
      this.$data.bodyAnimateClass1 = "fadeOut";
      this.$data.bodyAnimateDur = "s-animate-duration04";
      var startR = Math.PI * 2 / 3;
      var perR = Math.PI * 5 / 3 / 30;
      var that = this;
      var text = zcanvas.findNode("text");
      zcanvas.deRenderNodes(text);
      zcanvas.removeNodes(text);
      var arcdot = zcanvas.findClass("arc_dot");
      zcanvas.deRenderNodes(arcdot);
      zcanvas.removeNodes(arcdot);
      var arcline = zcanvas.findClass("arc_line");
      zcanvas.deRenderNodes(arcline);
      zcanvas.removeNodes(arcline);
      var arcpie = zcanvas.findClass("arc_pie");
      zcanvas.deRenderNodes(arcpie);
      zcanvas.removeNodes(arcpie);
      var circledot = zcanvas.findClass("circle_dot");
      zcanvas.deRenderNodes(
        circledot,
        {
          time: 30
        },
        {
          centRadius: 0
        },
        function() {
          zcanvas.removeNodes(circledot);
        }
      );
      var circleround = zcanvas.findClass("circle_round");
      zcanvas.deRenderNodes(
        circleround,
        {
          time: 30
        },
        {
          radius: 0
        },
        function() {
          zcanvas.removeNodes(circleround);
        }
      );
      var arcround = zcanvas.findClass("arc_round");
      zcanvas.deRenderNodes(
        arcround,
        {
          time: 30
        },
        {
          startAngle: startR + 15 * perR,
          endAngle: startR + 15 * perR
        },
        function() {
          zcanvas.removeNodes(arcround);
          // var pageindex = that.pageIndex + 1;
          // that.$emit("switchpage", pageindex);
        }
      );
      var circlerect = zcanvas.findClass("circle_rect");
      zcanvas.deRenderNodes(
        circlerect,
        {
          time: 30
        },
        {
          orignX: 0,
          orignY: 0,
          width: 0,
          height: 0
        },
        function() {
          zcanvas.removeNodes(circlerect);
          that.$emit("switchpage", index);
          that.$data.isInit = false;
        }
      );
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
  width: 5rem;
  height: 1.5rem;
  margin: 0 auto;
  margin-top: 0.5rem;
  overflow: hidden;
}
.u-bottomtext-title {
  display: block;
  line-height: 0.68rem;
  color: #ffffff;
  font-size: 0.38rem;
  text-align: center;
}
.u-bottomtext-text {
  display: block;
  line-height: 0.3rem;
  color: #ffffff;
  font-size: 0.22rem;
  letter-spacing: 0.02rem;
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

