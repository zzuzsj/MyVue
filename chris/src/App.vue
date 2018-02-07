<template>
  <div id="app" ref="ComponentsContainer">
    <First v-if="curpage == 0" />
    <Next v-if="curpage == 1" />
    <Third v-if="curpage == 2" />
    <Fourth v-if="curpage == 3" />
  </div>
</template>

<script>
import First from "./components/First";
import Next from "./components/Next";
import Third from "./components/Third";
import Fourth from "./components/Fourth";
import "../static/hammer.min.js";

export default {
  name: "app",
  data: function() {
    return {
      curpage: 0
    };
  },
  components: {
    First,
    Next,
    Third,
    Fourth
  },
  methods: {
    change: function(i) {
      this.$data.curpage = i;
    }
  },
  mounted: function() {
    var that = this;
    var mc = new Hammer(this.$refs.ComponentsContainer);
    // let the pan gesture support all directions.
    // this will block the vertical scrolling on a touch-device while on the element
    mc.get("pan").set({ direction: Hammer.DIRECTION_ALL });
    // listen to events...
    mc.on("panup", function(ev) {
      if (that.$data.curpage >= 3) {
        return;
      }
      that.change(that.$data.curpage + 1);
    });
    mc.on("pandown", function(ev) {
      if (that.$data.curpage <= 0) {
        return;
      }
      that.change(that.$data.curpage - 1);
    });
  }
};
</script>

<style>
#app {
  width: 7.5rem;
  height: 13.37rem;
}
</style>
