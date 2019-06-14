<template>
  <div class="main">
    <div class="container">
      <div class="title">lilinfei</div>
    </div>
    <nav>
      <ul>
        <router-link :to="{name:'home'}" class>
          <li>
            <img class="icon" src="../../assets/首页.png" alt>
            首页
          </li>
        </router-link>

        <router-link :to="{name:'tag'}">
          <li>
            <img class="icon" src="../../assets/标签.png" alt>
            标签
          </li>
        </router-link>

        <li>
          <img class="icon" src="../../assets/归档.png" alt>
          归档
        </li>
        <router-link :to="{name:'editor'}">
          <li>
            <img class="icon" src="../../assets/编辑.png" alt>
            编辑
          </li>
        </router-link>
      </ul>
    </nav>
  </div>
</template>
<script>
export default {
  name: "SliderBar",
  data() {
    return {};
  },
  methods: {}
};
</script>
<style scoped>
.main {
  /* height: 100px; */
  width: 200px;
  height: 260px;
  background: white;
  margin-bottom: 10px;
}
.container {
  height: 100px;
  background: black;
}
.container .title {
  color: white;
  line-height: 100px;
  text-align: center;
  font-size: 24px;
  font-weight: normal;
  font-family: "Lobster Two", "Monda", "PingFang SC", "Microsoft YaHei",
    sans-serif;
}
nav {
  position: relative;
}
nav ul {
  list-style: none;
  text-align: left;
  padding-left: 0px;
  cursor: pointer;
}
ul a {
  text-decoration: none;
}
a::after {
  content: " ";
  width: 5px;
  height: 5px;
  background: #cccccc;
  border-radius: 50%;
  /* display: block; */
  position: absolute;
  right: 15px;
  top: 10px;
}
nav ul li {
  font-size: 16px;
  height: 20px;
  line-height: 20px;
  color: #555;
  margin-bottom: 5px;
  padding: 5px 20px;
  position: relative;
}
.icon {
  width: 10px;
  height: 10px;
  padding-right: 10px;
}
</style>



