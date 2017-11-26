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
            <span class="u-toptext-title">问诊好评率</span>
          </div>
          <div class="g-toptext-count animated" :class="[bodyAnimateClass1,bodyAnimateDur,bodyAnimateDelay1]">
            <span class="u-toptext-text">
              <span class="u-toptext-count">{{ goodCount }}</span>%
            </span>
          </div>
        </div>
        <div class="g-chart-container">
          <canvas class="u-chart-canvas" width="712" height="514" ref="chart"></canvas>
        </div>
        <div class="g-bottomtext-container animated" :class="[bodyAnimateClass0,bodyAnimateDur,bodyAnimateDelay2]">
          <span class="u-bottomtext-title">患者十分肯定您的付出，下周请继续保持哦！</span>
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
  name: "CommentState",
  data() {
    return {
      pageIndex: 5,
      isInit: false,
      goodCount: 0,
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
      that.$data.goodCount = 0;
      setTimeout(function() {
        var tid = setInterval(function() {
          if (that.$data.goodCount >= 87) {
            clearInterval(tid);
          } else {
            that.$data.goodCount++;
          }
        }, 12);
      }, 500);
      that.$data.zcanvas = new ZCanvas(that.$refs.chart);
      that.chartInit();
    },
    chartInit: function() {
      var that = this;
      var zcanvas = this.$data.zcanvas;
      var circle = zcanvas.Circle({
        x: 356,
        y: 257,
        radius: 200,
        strokeWidth: 4,
        strokeStyle: "#e6f4ff",
        stroke: true,
        class: "d_out"
      });
      zcanvas.addNode(circle);
      zcanvas.renderNode(circle);
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
            class: "d_out"
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
            class: "d_out"
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
            class: "d_out"
          });
          zcanvas.addNode(but);
          zcanvas.renderNode(but);
        }
      }
      var circlein = zcanvas.ArcShape({
        x: 356,
        y: 257,
        radius: 0,
        arcLine: false,
        fillStyle: "#4dbcff",
        fill: true,
        class: "circle_in",
        startAngle: -Math.PI / 2,
        endAngle: Math.PI / 2 * 3 + 0.01,
        stroke: false
      });
      zcanvas.addNode(circlein);
      zcanvas.renderNode(
        circlein,
        {
          time: 30
        },
        {
          radius: 198
        }
      );
      var arcring = zcanvas.ArcShape({
        arcLine: true,
        stroke: true,
        counterClockWise: true,
        lineWidth: 24,
        // lineCap: ,
        strokeStyle: "#2a93fd",
        class: "arc_line",
        x: 356,
        y: 257,
        radius: 186,
        startAngle: Math.PI / 2 * 3,
        endAngle: Math.PI / 2 * 3
      });
      zcanvas.addNode(arcring);
      zcanvas.renderNode(
        arcring,
        {
          time: 30
        },
        {
          endAngle: -Math.PI / 2
        }
      );
      var arcring = zcanvas.ArcShape({
        arcLine: true,
        stroke: true,
        lineWidth: 14,
        strokeStyle: "#01f5f0",
        class: "fade_out",
        x: 356,
        y: 257,
        radius: 181,
        startAngle: -Math.PI / 2,
        endAngle: -Math.PI / 2
      });
      zcanvas.addNode(arcring);
      zcanvas.renderNode(
        arcring,
        {
          time: 40,
          delay: 30
        },
        {
          endAngle: Math.PI / 6 * 7
        }
      );
      var goodcircle = zcanvas.Circle({
        x: 356 - 80,
        y: 257 - 80,
        radius: 12,
        fill: true,
        fillStyle: "#01f5f0",
        opacity: 0,
        class: "fade_out"
      });
      zcanvas.addNode(goodcircle);
      zcanvas.renderNode(
        goodcircle,
        {
          time: 40,
          delay: 30
        },
        {
          opacity: 1,
          y: 257 - 30
        }
      );
      var goodtext = zcanvas.Text({
        x: 356 - 50,
        y: 257 - 80,
        fontSize: 32,
        fill: true,
        fillStyle: "#fff",
        text: "好评53条",
        opacity: 0,
        class: "fade_out"
      });
      zcanvas.addNode(goodtext);
      zcanvas.renderNode(
        goodtext,
        {
          time: 40,
          delay: 30
        },
        {
          opacity: 1,
          y: 257 - 40
        }
      );
      var badcircle = zcanvas.Circle({
        x: 356 - 80,
        y: 257 - 20,
        radius: 12,
        fill: true,
        fillStyle: "#f583e4",
        opacity: 0,
        class: "fade_out"
      });
      zcanvas.addNode(badcircle);
      zcanvas.renderNode(
        badcircle,
        {
          time: 15,
          delay: 70
        },
        {
          opacity: 1,
          y: 257 + 30
        }
      );
      var goodtext = zcanvas.Text({
        x: 356 - 50,
        y: 257 - 30,
        fontSize: 32,
        fill: true,
        fillStyle: "#fff",
        text: "差评09条",
        opacity: 0,
        class: "fade_out"
      });
      zcanvas.addNode(goodtext);
      zcanvas.renderNode(
        goodtext,
        {
          time: 15,
          delay: 70
        },
        {
          opacity: 1,
          y: 257 + 20
        }
      );
      var arcring = zcanvas.ArcShape({
        arcLine: true,
        stroke: true,
        lineWidth: 14,
        strokeStyle: "#f583e4",
        class: "fade_out",
        x: 356,
        y: 257,
        radius: 181,
        startAngle: Math.PI / 6 * 7,
        endAngle: Math.PI / 6 * 7
      });
      zcanvas.addNode(arcring);
      zcanvas.renderNode(
        arcring,
        {
          time: 15,
          delay: 70
        },
        {
          endAngle: Math.PI / 2 * 3
        },
        function() {
          that.$data.isInit = true;
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
      var fadeout = zcanvas.findClass("fade_out");
      zcanvas.deRenderNodes(
        fadeout,
        {
          time: 40
        },
        {
          opacity: 0
        },
        function() {
          zcanvas.removeNodes(fadeout);
        }
      );
      var circlein = zcanvas.findClass("circle_in");
      zcanvas.deRenderNodes(
        circlein,
        {
          time: 40
        },
        {
          opacity: 0,
          startAngle: Math.PI / 2,
          endAngle: Math.PI / 2
        },
        function() {
          zcanvas.removeNodes(circlein);
        }
      );
      var arcline = zcanvas.findClass("arc_line");
      zcanvas.deRenderNodes(
        arcline,
        {
          time: 40
        },
        {
          opacity: 0,
          endAngle: Math.PI / 2 * 3
        },
        function() {
          zcanvas.removeNodes(arcline);
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
  font-size: 0.8rem;
  color: #ffffff;
  font-family: cursive;
  /* display: block; */
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
  width: 6rem;
  height: 1.5rem;
  margin: 0 auto;
  margin-top: 0.5rem;
  overflow: hidden;
}
.u-bottomtext-title {
  display: block;
  line-height: 0.68rem;
  color: #ffffff;
  font-size: 0.3rem;
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

