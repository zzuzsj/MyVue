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
            <span class="u-toptext-title">视话接诊订单量</span>
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
          <span class="u-bottomtext-title">与上一周相比上升
            <span class="u-bottomtext-count">{{ addCount }}</span> 单</span>
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
  name: "VideoOrder",
  data() {
    return {
      pageIndex: 2,
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
          if (that.$data.orderCount >= 25) {
            clearInterval(tid);
          } else {
            that.$data.orderCount++;
          }
        }, 50);
        var tid2 = setInterval(function() {
          if (that.$data.addCount >= 5) {
            clearInterval(tid2);
          } else {
            that.$data.addCount++;
          }
        }, 100);
      }, 1200);
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
          y1: 50,
          x2: 90 * i + 85,
          y2: 450,
          dash: i % 2 != 0,
          dashes: 15,
          // lineWidth: 1,
          strokeStyle: "#fff",
          opacity: 0.6
        });
        zcanvas.addNode(line);
        zcanvas.renderNode(line);
        if (i % 2 == 0) {
          var text = zcanvas.Text({
            x: 35 + i * 90,
            y: 470,
            fontSize: 18,
            fillStyle: "#fff",
            fill: true,
            opacity: 1,
            text: datearr[i / 2]
          });
          zcanvas.addNode(text);
          zcanvas.renderNode(text);
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
          id: "test" + i,
          class: "123",
          curvePointX: [85 + i * 180, 85 + i * 180 + 90, 85 + (i + 1) * 180],
          curvePointY: [y[i], rdy, y[i + 1]],
          curveQuar: 2,
          lineLaunch: true,
          shadow: true,
          shadowOffsetY: 50,
          strokeStyle: "#00fad0",
          shadowColor: "#fff",
          shadowBlur: 100,
          lineWidth: 8
        });
        zcanvas.addNode(curline);
        if (i === 2) {
          zcanvas.renderNode(
            curline,
            {
              time: 20,
              delay: i * 20 + 80
            },
            {},
            function(curline) {
              curline.lineLaunch = false;
              that.$data.isInit = true;
            }.bind(this, curline)
          );
        } else {
          zcanvas.renderNode(
            curline,
            {
              time: 20,
              delay: i * 20 + 80
            },
            {},
            function(curline) {
              curline.lineLaunch = false;
            }.bind(this, curline)
          );
        }
      }
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
      var that = this;
      var curlines = zcanvas.findNode("curveline");
      zcanvas.deRenderNodes(
        curlines,
        {
          time: 50
        },
        {
          opacity: 0
        },
        function() {
          zcanvas.removeNodes(curlines);
        }
      );
      var lines = zcanvas.findNode("line");
      for (var i = lines.length - 1; i >= 0; i--) {
        var line = lines[i];
        zcanvas.deRenderNode(
          line,
          {
            time: 40,
            delay: 50 + (lines.length - 1 - i) * 10
          },
          {
            y1: -600,
            y2: -200
          },
          function(i, line) {
            zcanvas.removeNode(line);
            if (i == 0) {
              that.$emit("switchpage", index);
              that.$data.isInit = false;
            }
          }.bind(this, i, line)
        );
      }
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
