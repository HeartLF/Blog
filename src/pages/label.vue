<template>
  <div class="main">
    <div class="container" v-for="item in article" :key="item.id">
      <div class="title">
        <h3>{{item.title}}</h3>
        <time>发表于{{item.article_time}}</time>
      </div>
      <div class="content">
        <div class="content_main">
          {{item.article_md}}
        </div>
       
        <p class="content_all"> <router-link :to="{path:`/process/${item.id}`}">阅读全文</router-link></p> 
      </div>
    </div>

    <Paging class="page"></Paging>
  </div>
</template>
<script>
import Paging from "../components/Paging";
export default {
  name: "tag",
  components: {
    Paging
  },
  data() {
    return {
      article: []
    };
  },
  beforeRouteEnter (to, from, next) {
    // ...
    to.meta.keepAlive=false;
    next();
  },
  created() {
    this.axios
      .get("/api/all_article")
      .then(res => {
        this.article=res.data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
<style scoped>
.main {
  position: relative;
  width: 500px;
  /* height: 200px; */
  margin: 10px auto;
}
.container {
  text-align: left;
  margin-top: 10px;
  text-indent: 2ch;
  margin-bottom: 50px;
  position: relative;
}
.container .title {
  text-align: center;
  margin-bottom: 20px;

  /* height: 20px; */
}
.container h3 {
  margin-bottom: 10px;
}
.container time {
  color: #999;
  font-size: 12px;
}
.container .content {
  margin-top: 10px;
  font-size: 15px;
  margin-bottom: 50px;
  position: relative;
  opacity: 0.8;
}
.container .content_main {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  position: relative;
  margin-bottom: 20px;
}
.container .content_all {
  width: 100px;
  margin: 0 auto;
  border: 1px solid #999;
  padding: 5px;
  cursor: pointer;
}
.page {
  /* position: absolute; */
  /* bottom: 0; */
}
</style>


