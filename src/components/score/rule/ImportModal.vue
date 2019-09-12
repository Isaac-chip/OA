<template>
  <el-dialog
    :visible.sync="importModalShow"
    title="导入规则"
    :close-on-click-modal="false"
    width="40%"
    @close="cancel"
  >
    <Upload
      :show-upload-list="false"
      :default-file-list="defaultList"
      :on-error="onError"
      :on-success="handleSuccess"
      :headers="headers"
      type="drag"
      :action="this.$constants.BIURL +'/political/score/rule/excel/import'"
    >
      <div style="padding: 20px 0">
        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
        <p>点击选择规则文件</p>
      </div>
    </Upload>
    <ul>
      <li v-for="(i,index) in defaultList" :key="index" class="file-list">
          <span >文件名:{{i.name}}</span>
          <span>--状态:{{i.msg}}</span>
           <span>--说明:{{i.data}}</span>
      </li>
    </ul>
  </el-dialog>
</template>

<script>
import UploadExcelComponent from "@/components/UploadExcel/index";
export default {
  name: "UploadExcel",
  components: {
    UploadExcelComponent
  },

  data() {
    return {
      tableData: [],
      tableHeader: [],
      importModalShow: false,
      defaultList: []
    };
  },
  computed: {
    headers() {
      return {
        Authorization:
          "bearer " +
          JSON.parse(window.localStorage.getItem("userInfo")).access_token
      };
    }
  },
  methods: {
    init() {
      this.importModalShow = true;
    },
    cancel() {
     
        this.importModalShow = false;
      this.$emit("importModalCancel")
    },
    handleSuccess(res, file) {
      this.defaultList.push({ name: file.name, msg: file.response.msg, data:file.response.data });
    },
    
    onError(res, file){
      this.defaultList.push({ name: file.name, msg: file.response.msg,data:file.response.data });
    }
  }
};
</script>

<style lang="less" scoped>
/deep/ .drop {
  width: 100% !important;
}

ul {
  .file-list{
    list-style: none;
    border-bottom: 1px dashed #ccc;
  }
}
</style>
