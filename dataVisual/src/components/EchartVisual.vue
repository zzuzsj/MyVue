<template>
  <div class="container">
    <div class="top-bar">
      <router-link to="./" class="back"><</router-link>
      <span class="title">{{ title }}</span>
    </div>
    <div class="body-container">
      <div id="main"></div>
      <div class="btn-contaier">
        <div class="btn-box">
          <span class="btn" @click="showData(0)">Profession</span>
        </div>
        <div class="btn-box">
          <span class="btn" @click="showData(1)">Age</span>
        </div>
        <div class="btn-box">
          <span class="btn" @click="showData(2)">Pro-Age</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
export default {
  name: "EchartVisual",
  data() {
    return {
      title: "Echart图表",
      myChart: null,
      prodata: null,
      agedata: null,
      proagedata: null,
      professions: [],
      minage: 0,
      maxage: 0
    };
  },
  methods: {
    dataCal: function(type) {
      switch (type) {
        case 0:
          if (this.$data.prodata) {
            return;
          } else {
            var prodata = {};
            var index = 0;
            for (var i in this.$store.state.personData) {
              var data = this.$store.state.personData[i];
              if (!prodata[data.profession]) {
                prodata[data.profession] = {
                  male: 0,
                  female: 0,
                  total: 0,
                  index: index
                };
                index++;
                this.$data.professions.push(data.profession);
              }
              prodata[data.profession][data.gender] += 1;
              prodata[data.profession]["total"] += 1;
            }
          }
          this.$data.prodata = prodata;
          break;
        case 1:
          if (this.$data.agedata) {
            return;
          } else {
            var agedata = {};
            for (var i in this.$store.state.personData) {
              var data = this.$store.state.personData[i];
              if (!agedata[data.age]) {
                agedata[data.age] = {
                  male: 0,
                  female: 0,
                  total: 0
                };
              }
              if (data.age > this.$data.maxage) {
                this.$data.maxage = data.age;
              }
              if (data.age < this.$data.minage) {
                this.$data.minage = data.age;
              }
              agedata[data.age][data.gender] += 1;
              agedata[data.age]["total"] += 1;
            }
          }
          this.$data.agedata = agedata;
          break;
        case 2:
          if (this.$data.proagedata) {
            return;
          }
          var proagedata = {};
          for (var i in this.$store.state.personData) {
            var data = this.$store.state.personData[i];
            if (!proagedata[data.age]) {
              proagedata[data.age] = {};
            }
            if (
              !proagedata[data.age][this.$data.prodata[data.profession].index]
            ) {
              proagedata[data.age][
                this.$data.prodata[data.profession].index
              ] = {
                male: 0,
                female: 0,
                total: 0
              };
            }
            proagedata[data.age][this.$data.prodata[data.profession].index][
              data.gender
            ] += 1;
            proagedata[data.age][this.$data.prodata[data.profession].index][
              "total"
            ] += 1;
          }
          this.$data.proagedata = proagedata;
          break;
        default:
          break;
      }
    },
    showData: function(type) {
      switch (type) {
        case 0:
          this.dataCal(0);
          var maledata = [];
          var femaledata = [];
          var totaldata = [];
          for (var i in this.$data.prodata) {
            maledata.push(this.$data.prodata[i].male);
            femaledata.push(this.$data.prodata[i].female);
            totaldata.push(this.$data.prodata[i].total);
          }
          var option = {
            title: {
              text: "职业统计图"
            },
            tooltip: {},
            legend: {
              data: ["Male", "Female", "Total"]
            },
            xAxis: {
              data: this.$data.professions,
              axisLabel: {
                interval: 0
              }
            },
            yAxis: {},
            series: [
              {
                name: "Male",
                type: "bar",
                data: maledata
              },
              {
                name: "Female",
                type: "bar",
                data: femaledata
              },
              {
                name: "Total",
                type: "bar",
                data: totaldata
              }
            ]
          };
          break;
        case 1:
          this.dataCal(1);
          var maledata = [];
          var femaledata = [];
          var totaldata = [];
          var xl = [];
          for (var i in this.$data.agedata) {
            xl.push(i);
            maledata.push(this.$data.agedata[i].male);
            femaledata.push(this.$data.agedata[i].female);
            totaldata.push(this.$data.agedata[i].total);
          }
          option = {
            legend: {
              data: ["Male", "Female", "Total"]
            },
            tooltip: {
              trigger: "axis",
              position: function(pt) {
                return [pt[0], "10%"];
              }
            },
            title: {
              text: "年龄统计图"
            },
            xAxis: {
              data: xl,
              axisLabel: { interval: 5 }
            },
            yAxis: {},
            series: [
              {
                name: "Male",
                type: "line",
                data: maledata
              },
              {
                name: "Female",
                type: "line",
                data: femaledata
              },
              {
                name: "Total",
                type: "line",
                data: totaldata
              }
            ]
          };

          break;
        case 2:
          this.dataCal(0);
          this.dataCal(2);
          var xl = [];
          var maledata = [];
          var femaledata = [];
          var totaldata = [];
          var yl = this.$data.professions;
          var data = [];
          for (var i in this.$data.proagedata) {
            xl.push(i);
            var aged = this.$data.proagedata[i];
            for (var m in aged) {
              var ddata = aged[m];
              maledata.push([i*1, m*1, aged[m].male]);
              femaledata.push([i*1, m*1, aged[m].female]);
              totaldata.push([i*1, m*1, aged[m].total]);
            }
          }
          var option = {
            animation: false,
            title: {
              text: "职业-年龄统计图"
            },
            legend: {
              data: ["Male", "Female", "Total"]
            },
            xAxis: {
              data: xl,
              type: "category",
              splitArea: {
                show: true
              },
              axisLabel: { interval: 5 }
            },
            tooltip:'top',
            yAxis: {
              data: yl,
              type: "category",
              splitArea: {
                show: true
              }              
            },
            visualMap: {
              min: 0,
              max: 10,
              calculable: true,
              show:false,
              orient: "horizontal",
              left: "center",
              bottom: "15%"
            },
            series: [
              {
                name: "Male",
                type: "heatmap",
                data: maledata,
                label: {
                  normal: {
                    show: true
                  }
                }
              },
              {
                name: "Female",
                type: "heatmap",
                data: femaledata,
                label: {
                  normal: {
                    show: true
                  }
                },
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowColor: "rgba(0, 0, 0, 0.5)"
                  }
                }
              },
              {
                name: "Total",
                type: "heatmap",
                data: totaldata,
                label: {
                  normal: {
                    show: true
                  }
                }
              }
            ]
          };
          break;
        default:
          break;
      }
      this.showChart(option);
    },
    showChart: function(option) {
      // 基于准备好的dom，初始化echarts实例

      // 使用刚指定的配置项和数据显示图表。
      this.$data.myChart.clear();
      this.$data.myChart.setOption(option);
    }
  },
  mounted: function() {
    this.$data.myChart = echarts.init(document.getElementById("main"));
    console.log(this.$store.state.personData);
    this.showData(0);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  width: 100%;
  height: 100%;
  background: #7fd4cd;
  overflow: hidden;
}
.top-bar {
  width: 100%;
  height: 60px;
  background: #5bacbf;
}
.top-bar .title {
  width: 300px;
  height: 50px;
  color: white;
  font-weight: 900;
  text-align: center;
  line-height: 60px;
  margin: 0 auto;
  display: block;
  font-size: 28px;
}
.top-bar .back{
  width: 50px;
  height: 60px;
  position: absolute;
  top: 0;
  left: 0;
  font-size: 36px;
  line-height: 60px;
  text-align: center;
  font-weight: 900;
  color: white;
  text-decoration: none;
}

.body-container {
  width: 100%;
  height: 620px;
  margin: 0;
  overflow: hidden;
}
#main {
  width: 100%;
  height: 400px;
  margin: 20px auto;
}
.btn-contaier {
  width: 90%;
  height: 60px;
  margin: 0 auto;
  margin-top: 20px;
}
.btn-box {
  width: 33.3%;
  height: 40px;
  float: left;
  margin: 0 auto;
  margin-top: 10px;
}
.btn-box .btn {
  width: 88%;
  height: 40px;
  display: block;
  background: #196e8b;
  color: white;
  font-size: 18px;
  text-align: center;
  line-height: 40px;
  margin: 0 auto;
  text-decoration: none;
}
</style>
