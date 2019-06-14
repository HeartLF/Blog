<template>
    <div ref="main" class="main" v-html="content">
    </div>
</template>
<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
export default {
    name:'process',
    data(){
        return{
            content:'',
            id:this.$route.params.id
        }
    },
    created() {
      
        let that=this;
        this.axios.get(`/api/selectHtml?id=${this.id}`).then(res=>{
           this.content=res.data[0].article_html

        //    console.log(this.content)
        }).catch(err=>{
            console.log(err);
        })
    }
}
</script>
<style scoped>
.main{
    /* width: 100%; */
    /* height: 500px; */
    /* border: 1px solid red; */
    text-align: left;
}
</style>


