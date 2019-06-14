<template>
  <div class="main">
    <el-input v-model="input" placeholder="请输入题目"></el-input>
    <div class="edit_container">
      <quill-editor
        v-model="content"
        ref="myQuillEditor"
        :options="editorOption"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @change="onEditorChange($event)"
      ></quill-editor>
    </div>
    <el-button @click="submit">提交</el-button>
  </div>
</template>
<script>
import { quillEditor } from "vue-quill-editor"; //调用编辑器
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
export default {
  name: "editor",
  components: {
    quillEditor
  },
  data() {
    return {
      content: "",
      editorOption: {},
      paramId: this.$route.params.id,
      date:'',
      input:''
    };
  },
  created() {
    this.getDate();
    let that=this;
    this.axios
      .get(`/api/selectHtml?id=${this.paramId}`)
      .then(res => {
        console.log(res)
        that.content=res.data[0].article_html;
        that.input=res.data[0].title;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    onEditorReady(editor) {
      // 准备编辑器
    },
    onEditorBlur() {}, // 失去焦点事件
    onEditorFocus() {}, // 获得焦点事件
    // 内容改变事件
    onEditorChange() {
    },
    getDate(){
      let year=new Date().getFullYear();
      let month=new Date().getMonth();
      let day=new Date().getDate();
      this.date=year+'-'+month+'-'+day;
    },
    submit() {
      let that=this;
      if(this.input==''||this.input==null){
          this.$message('题目必填');
          return;
      }
      if (!this.paramId) {
        this.axios
          .post("/api/insert_article", {
            article_html: this.content,
            article_md: this.deleteLabel(this.content),
            article_time:this.date,
            title:this.input
          })
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
      }else{
        this.axios
          .post("/api/updateHtml", {
            article_html: this.content,
            article_md: this.deleteLabel(this.content),
            id:this.paramId,
            article_time:this.date,
            title:this.input
          })
          .then(res => {
            if(res.data.status==200){
              alert(res.data.message)
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    deleteLabel(html) {
      let regEx_script = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/g; // 定义script的正则表达式
      let regEx_style = /<stype\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/stype>/g; // 定义style的正则表达式
      let regEx_html = /<(?:.|\s)*?>/g; // 定义HTML标签的正则表达式
      html = html.replace(regEx_script, "");
      html = html.replace(regEx_style, "");
      html = html.replace(regEx_html, "");
      html = html
        .replace("((\r\n)|\n)[\\s\t ]*(\\1)+", "$1")
        .replace("^((\r\n)|\n)", ""); //去除空白行
      html = html.replace("    +| +|　+", ""); //去除空白
      return html.trim();
    }
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
  mounted() {
    // console.log("this is current quill instance object", this.editor);
    // console.log(this.deleteLabel(this.content));
  }
};
</script>
<style scoped>
.main {
  height: 800px;
  width: 100%;
  /* overflow: hidden; */
}
</style>


    