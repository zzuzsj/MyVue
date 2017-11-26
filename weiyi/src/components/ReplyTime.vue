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
            <span class="u-toptext-title">图文问诊回复速度</span>
          </div>
          <div class="g-toptext-count animated" :class="[bodyAnimateClass1,bodyAnimateDur,bodyAnimateDelay1]">
            <span class="u-toptext-text">
              <span class="u-toptext-count">{{ replayTime }}</span>
            </span>
          </div>
        </div>
        <div class="g-chart-container">
          <canvas class="u-chart-canvas" width="712" height="514" ref="chart"></canvas>
        </div>
        <div class="g-bottomtext-container animated" :class="[bodyAnimateClass0,bodyAnimateDur,bodyAnimateDelay2]">
          <span class="u-bottomtext-title">您击败了
            <span class="u-bottomtext-count">{{ addCount }}%</span> 的微医生用户</span>
          <span class="u-bottomtext-text">本周回复速度有所下降，下周请继续加油吧</span>
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
  name: "ReplyTime",
  data() {
    return {
      pageIndex: 4,
      isInit: false,
      replayTime: "01:22:34",
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
      console.log(this, "in");
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
          if (that.$data.addCount >= 27) {
            clearInterval(tid2);
          } else {
            that.$data.addCount++;
          }
        }, 50);
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
        strokeWidth: 4,
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
        },
        function() {
          var perR = Math.PI * 2 / 48;
          for (var i = 0; i < 48; i++) {
            if (i % 4 == 0) {
              var but = zcanvas.Rect({
                orignX: -160,
                orignY: 1,
                width: 30,
                height: 2,
                rotate: i * perR,
                x: 356,
                y: 257,
                fill: true,
                fillStyle: "#fff",
                opacity: 0.7,
                class: "circle_lrect"
              });
              zcanvas.addNode(but);
              zcanvas.renderNode(but);
            } else if (i % 2 == 0) {
              var but = zcanvas.Rect({
                orignX: -170,
                orignY: 1,
                width: 20,
                height: 2,
                rotate: i * perR,
                x: 356,
                y: 257,
                fill: true,
                fillStyle: "#fff",
                opacity: 0.6,
                class: "circle_mrect"
              });
              zcanvas.addNode(but);
              zcanvas.renderNode(but);
            } else {
              var but = zcanvas.Rect({
                orignX: -170,
                orignY: 0.5,
                width: 20,
                height: 1,
                rotate: i * perR,
                x: 356,
                y: 257,
                fill: true,
                fillStyle: "#fff",
                opacity: 0.6,
                class: "circle_srect"
              });
              zcanvas.addNode(but);
              zcanvas.renderNode(but);
            }
          }
        }
      );
      var arcshape = zcanvas.ArcShape({
        x: 356,
        y: 257,
        radius: 100,
        startAngle: -Math.PI / 2,
        endAngle: -Math.PI / 2,
        fill: true,
        fillStyle: "#42a0fe",
        arcLine: false,
        class: "d_out"
      });
      zcanvas.addNode(arcshape);
      zcanvas.renderNode(
        arcshape,
        {
          time: 30
        },
        {
          endAngle: Math.PI * 3 / 2
        }
      );
      var pointline = zcanvas.Rect({
        x: 356,
        y: 257,
        width: 0,
        height: 2,
        rotate: Math.PI / 2,
        fill: true,
        fillStyle: "#b9f9bc",
        class: "d_out"
      });
      zcanvas.addNode(pointline);
      zcanvas.renderNode(
        pointline,
        {
          time: 30,
          delay: 30
        },
        {
          width: 220
        },
        function() {
          var arcline = zcanvas.ArcShape({
            arcLine: true,
            stroke: true,
            lineWidth: 6,
            lineCap: "round",
            strokeStyle: "#0be5fd",
            class: "arc_line",
            x: 356,
            y: 257,
            radius: 220,
            startAngle: Math.PI / 2,
            endAngle: Math.PI / 2
          });
          zcanvas.addNode(arcline);
          zcanvas.renderNode(
            arcline,
            {
              time: 100
            },
            {
              endAngle: Math.PI / 2 * 3.5
            }
          );
          pointline.animate(
            {
              time: 100
            },
            {
              rotate: Math.PI / 2 * 3.5
            }
          );
        }
      );
      var circle_in = zcanvas.Circle({
        x: 356,
        y: 257,
        radius: 0,
        fill: true,
        fillStyle: "#7ebcff",
        class: "circle_in"
      });
      zcanvas.addNode(circle_in);
      zcanvas.renderNode(
        circle_in,
        {
          time: 20,
          delay: 10
        },
        {
          radius: 70
        },
        function() {
          var text = zcanvas.Text({
            x: 356 - 50,
            y: 257,
            fontSize: 50,
            fill: true,
            fillStyle: "#fff",
            text: "及时"
          });
          zcanvas.addNode(text);
          zcanvas.renderNode(
            text,
            {
              time: 10
            },
            {},
            function() {
              that.$data.isInit = true;
            }
          );
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
      var dout = zcanvas.findClass("d_out");
      zcanvas.deRenderNodes(dout);
      zcanvas.removeNodes(dout);
      var arcline = zcanvas.findClass("arc_line");
      zcanvas.deRenderNodes(
        arcline,
        {
          time: 30
        },
        {
          opacity: 0
        },
        function() {
          zcanvas.removeNodes(arcline);
        }
      );
      var text = zcanvas.findNode("text");
      zcanvas.deRenderNodes(
        text,
        {
          time: 30
        },
        {
          fontSize: 0,
          opacity: 0,
          x: 356,
          y: 257
        },
        function() {
          zcanvas.removeNodes(text);
        }
      );
      var circlein = zcanvas.findClass("circle_in");
      zcanvas.deRenderNodes(
        circlein,
        {
          time: 30
        },
        {
          radius: 0
        },
        function() {
          zcanvas.removeNodes(circlein);
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
  width: 5rem;
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
  font-size: 0.8rem;
  color: #ffffff;
  font-family: cursive;
  /* display: block; */
  line-height: 1.02rem;
  vertical-align: text-bottom;
  font-weight: 500;
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

