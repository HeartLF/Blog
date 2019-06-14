<template>
  <div>
    <vue-markdown v-highlight :source="content"></vue-markdown>
    <el-upload
      class="upload-demo"
      ref="upload"
      accept="file"
      action=""
      :http-request="upload"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :auto-upload="false"
    >
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="upload">上传到服务器</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </div>
</template>
<script>
import VueMarkdown from "vue-markdown";
import formData from 'form-data'
export default {
  name: "messaage",
  data() {
    return {
      content:
        "## 不定宽高的水平垂直居中- flex布局： ```css display: flex;justify-content: center; align-items: center;```",
    };
  },
  components: {
    VueMarkdown
  },
  methods: {
    submitUpload() {
      // this.$refs.upload.submit();
      // this.uploadFileMethod(file);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
  //   uploadFileMethod(params){
  //     let fileObject=params.file;
  //     let formData=new formData();
  //     formData.append("file",formData);
  //     this.axios.post('/api/upload',formData,{headers:{'Content-Type:':'multipart/form-data'}}).
  //     then(res=>{
  //       console.log(res);
  //     }).catch(err=>{
  //       console.log(err);
  //     })
  //   }
  upload(){
        const formData = new FormData();
        const file = this.$refs.upload.uploadFiles[0];
        const headerConfig = { headers: { 'Content-Type': 'multipart/form-data' } };
        if (!file) { // 若未选择文件
          alert('请选择文件');
          return;
        }
        formData.append('file', file.raw);
        this.axios.post('/api/upload', formData, headerConfig).then(res => {
              if(res.data.affectedRows==1){
              // localStorage.setItem('ID',res.data.insertId)
                this.$router.push({path:`/editor/${res.data.insertId}`})
              }
        }).catch(err=>{
          console.log(err)
        })
  }
  }
};
</script>
<style>
</style>
