<template>
  <div class="main">
    <div class="avater">
      <img src="https://heartlf.github.io/images/avatar.jpg" alt>
      <p>lilinfei</p>
    </div>
    <nav>
      <div></div>
    </nav>
  </div>
</template>
<script>
export default {
  name: "SliderAvater"
};
</script>
<style scoped>
.main {
  width: 200px;
  height: 200px;
  position: relative;
  background: white;
  margin-top: 10px;
}
.avater {
  height: 100px;
}
.avater img {
  width: 80px;
  height: 80px;
  margin: 10px auto;
  padding: 2px;
  border-radius: 50%;
}
.avater p {
  font-size: 15px;
  margin-top: 10px;

}
</style>


