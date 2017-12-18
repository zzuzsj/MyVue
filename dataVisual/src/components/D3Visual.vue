<template>
    <div class="container">
        <div class="top-bar">
            <router-link to="./" class="back">
                <</router-link>
                    <span class="title">{{ title }}</span>
        </div>
        <div class="body-container" ref="bodyContainer">
            <svg width="0" height="400" id="main" ref="svgdom"></svg>
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
import * as d3 from "d3";
export default {
  name: "D3Visual",
  data() {
    return {
      title: "D3图表",
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
    clear:function(){
        // d3.select('svg').remove();   //删除整个SVG
        d3.select('svg')
        .selectAll('*')
        .remove();  
    },
    showData: function(type) {
      var that = this;
      this.clear();
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
          var n = 3, // The number of series.
            m = this.$data.professions.length; // The number of values per series.
          var xz = d3.range(m),
            yz=[maledata,femaledata,totaldata],
            y01z = d3.stack().keys(d3.range(n))(d3.transpose(yz)),
            yMax = d3.max(yz, function(y) {
              return d3.max(y);
            }),
            y1Max = d3.max(y01z, function(y) {
              return d3.max(y, function(d) {
                return d[1];
              });
            });

          var svg = d3.select("svg"),
            margin = { top: 40, right: 10, bottom: 20, left: 10 },
            width = +svg.attr("width") - margin.left - margin.right,
            height = +svg.attr("height") - margin.top - margin.bottom,
            g = svg
              .append("g")
              .attr(
                "transform",
                "translate(" + margin.left + "," + margin.top + ")"
              );

          var x = d3
            .scaleBand()
            .domain(xz)
            .rangeRound([0, width])
            .padding(0.08);

          var y = d3
            .scaleLinear()
            .domain([0, y1Max])
            .range([height, 0]);

          var color = d3
            .scaleOrdinal()
            .domain(d3.range(n))
            .range(d3.schemeCategory20c);

          var series = g
            .selectAll(".series")
            .data(y01z)
            .enter()
            .append("g")
            .attr("fill", function(d, i) {
              return color(i);
            });

          var rect = series
            .selectAll("rect")
            .data(function(d) {
              return d;
            })
            .enter()
            .append("rect")
            .attr("x", function(d, i) {
              return x(i);
            })
            .attr("y", height)
            .attr("width", x.bandwidth())
            .attr("height", 0);

          rect
            .transition()
            .delay(function(d, i) {
              return i * 10;
            })
            .attr("y", function(d) {
              return y(d[1]);
            })
            .attr("height", function(d) {
              return y(d[0]) - y(d[1]);
            });

          g
            .append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(
              d3
                .axisBottom(x)
                .tickSize(0)
                .tickPadding(6)
            );

            // svg.update();
          function transitionGrouped() {
            y.domain([0, yMax]);

            rect
              .transition()
              .duration(500)
              .delay(function(d, i) {
                return i * 10;
              })
              .attr("x", function(d, i) {
                return x(i) + x.bandwidth() / n * this.parentNode.__data__.key;
              })
              .attr("width", x.bandwidth() / n)
              .transition()
              .attr("y", function(d) {
                return y(d[1] - d[0]);
              })
              .attr("height", function(d) {
                return y(0) - y(d[1] - d[0]);
              });
          }

          function transitionStacked() {
            y.domain([0, y1Max]);

            rect
              .transition()
              .duration(500)
              .delay(function(d, i) {
                return i * 10;
              })
              .attr("y", function(d) {
                return y(d[1]);
              })
              .attr("height", function(d) {
                return y(d[0]) - y(d[1]);
              })
              .transition()
              .attr("x", function(d, i) {
                return x(i);
              })
              .attr("width", x.bandwidth());
          }
          break;
        case 1:
          this.dataCal(1);
          var maledata = [];
          var femaledata = [];
          var totaldata = [];
          for (var i in this.$data.agedata) {
            maledata.push(this.$data.agedata[i].male);
            femaledata.push(this.$data.agedata[i].female);
            totaldata.push(this.$data.agedata[i].total);
          }
          var n = 3, // The number of series.
            m = totaldata.length; // The number of values per series.
          var xz = d3.range(m),
            yz=[maledata,femaledata,totaldata],
            y01z = d3.stack().keys(d3.range(n))(d3.transpose(yz)),
            yMax = d3.max(yz, function(y) {
              return d3.max(y);
            }),
            y1Max = d3.max(y01z, function(y) {
              return d3.max(y, function(d) {
                return d[1];
              });
            });

          var svg = d3.select("svg"),
            margin = { top: 40, right: 10, bottom: 20, left: 10 },
            width = +svg.attr("width") - margin.left - margin.right,
            height = +svg.attr("height") - margin.top - margin.bottom,
            g = svg
              .append("g")
              .attr(
                "transform",
                "translate(" + margin.left + "," + margin.top + ")"
              );

          var x = d3
            .scaleBand()
            .domain(xz)
            .rangeRound([0, width])
            .padding(0.08);

          var y = d3
            .scaleLinear()
            .domain([0, y1Max])
            .range([height, 0]);

          var color = d3
            .scaleOrdinal()
            .domain(d3.range(n))
            .range(d3.schemeCategory20c);

          var series = g
            .selectAll(".series")
            .data(y01z)
            .enter()
            .append("g")
            .attr("fill", function(d, i) {
              return color(i);
            });

          var rect = series
            .selectAll("rect")
            .data(function(d) {
              return d;
            })
            .enter()
            .append("rect")
            .attr("x", function(d, i) {
              return x(i);
            })
            .attr("y", height)
            .attr("width", x.bandwidth())
            .attr("height", 0);

          rect
            .transition()
            .delay(function(d, i) {
              return i * 10;
            })
            .attr("y", function(d) {
              return y(d[1]);
            })
            .attr("height", function(d) {
              return y(d[0]) - y(d[1]);
            });

          g
            .append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(
              d3
                .axisBottom(x)
                .tickSize(0)
                .tickPadding(6)
            );
            // svg.update();
          function transitionGrouped() {
            y.domain([0, yMax]);

            rect
              .transition()
              .duration(500)
              .delay(function(d, i) {
                return i * 10;
              })
              .attr("x", function(d, i) {
                return x(i) + x.bandwidth() / n * this.parentNode.__data__.key;
              })
              .attr("width", x.bandwidth() / n)
              .transition()
              .attr("y", function(d) {
                return y(d[1] - d[0]);
              })
              .attr("height", function(d) {
                return y(0) - y(d[1] - d[0]);
              });
          }

          function transitionStacked() {
            y.domain([0, y1Max]);

            rect
              .transition()
              .duration(500)
              .delay(function(d, i) {
                return i * 10;
              })
              .attr("y", function(d) {
                return y(d[1]);
              })
              .attr("height", function(d) {
                return y(d[0]) - y(d[1]);
              })
              .transition()
              .attr("x", function(d, i) {
                return x(i);
              })
              .attr("width", x.bandwidth());
          }
          break;
        case 2:
          break;
        default:
          break;
      }
    //   this.showChart(type);
    },
    showChart: function(type) {
      switch (type) {
        case 0:
          break;
        case 1:
          break;
        case 2:
          break;
        default:
          break;
      }
    }
  },
  mounted: function() {
    var width = Math.floor(this.$refs.bodyContainer.offsetWidth);
    this.$refs.svgdom.setAttribute("width", width);
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
.top-bar .back {
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
