<template>
  <div class="main">
    <div class="container">
      <div class="container_left">
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
      <div class="container_right">
        <slider-bar></slider-bar>
        <slider-avater></slider-avater>
      </div>
    </div>
  </div>
</template>

<script>
import { SliderAvater, SliderBar } from "../components/slider";

export default {
  name: "slider",
  components: {
    SliderAvater,
    SliderBar
  }
};
</script>
<style scoped>
.main {
  width: 1200px;
  margin: 0 auto;
  /* background: #cccccc; */
}
.container {
  position: relative;
  overflow: hidden;
}
.container_left {
  width: 800px;
  /* height: 1200px; */
  overflow-y: auto;
  background: white;
  margin-right: 10px;
  float: left;
  position: relative;
  margin-bottom: 20px;
}
.container_right {
  float: right;
}
@media screen and (max-width: 480px) {
}
</style>



