<template>
  <div id="app" @switchpage="switchPage(index)" ref="ComponentsContainer">
    <ScoreIndex v-if="currentPage === 0" ref="page1" :current-page="currentPage" @switchpage="switchPage" />
    <PictureOrder v-if="currentPage === 1" ref="page2" :current-page="currentPage" @switchpage="switchPage" />
    <VideoOrder v-if="currentPage === 2" ref="page3" :current-page="currentPage" @switchpage="switchPage" />
    <OverOrder v-if="currentPage === 3" ref="page4" :current-page="currentPage" @switchpage="switchPage" />
    <ReplyTime v-if="currentPage === 4" ref="page5" :current-page="currentPage" @switchpage="switchPage" />
    <CommentState v-if="currentPage === 5" ref="page6" :current-page="currentPage" @switchpage="switchPage" />
    <ReportSummary v-if="currentPage === 6" ref="page7" :current-page="currentPage" @switchpage="switchPage" />
  </div>
</template>

<script>
import ScoreIndex from "./components/ScoreIndex";
import PictureOrder from "./components/PictureOrder";
import VideoOrder from "./components/VideoOrder";
import OverOrder from "./components/OverOrder";
import ReplyTime from "./components/ReplyTime";
import CommentState from "./components/CommentState";
import ReportSummary from "./components/ReportSummary";
import "./vendor/hammer.min";

export default {
  name: "app",
  components: {
    ScoreIndex,
    PictureOrder,
    VideoOrder,
    OverOrder,
    ReplyTime,
    CommentState,
    ReportSummary
  },
  data: function() {
    var that = this;
    return {
      currentPage: 0
    };
  },
  methods: {
    switchPage: function(index) {
      this.$data.currentPage = index;
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
      if(that.$data.currentPage>=6){
        return;
      };
      that.switchPage(that.$data.currentPage+1);
    });
    mc.on("pandown", function(ev) {
      if(that.$data.currentPage<=0){
        return;
      };
      that.switchPage(that.$data.currentPage-1);
    });
  }
};
</script>

<style>

</style>
