<template>
  <el-dialog
    :visible.sync="importModalShow"
    title="导入规则"
    :close-on-click-modal="false"
    width="50%"
    @close="cancel"
  >
    <!-- <upload-excel-component
    v-if="!tableData.length"
    :on-success="handleSuccess"  />
    <Button v-if="tableData.length" @click="uploadExcel" class="mt-1">确认上传</Button>
    <el-table
     v-if="tableData.length"
     :data="tableData" border highlight-current-row style="width: 100%;margin-top:20px;">
      <el-table-column v-for="item of tableHeader" :key="item" :prop="item" :label="item" />
    </el-table>-->
    <el-upload
    :headers="headers"
    drag
  action="http://120.24.51.37:9010/admin/political/score/rule/excel/import"  />
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
      importModalShow: false
    };
  },
  computed:{
    headers(){
      return {
        Authorization: 'bearer '+JSON.parse(window.localStorage.getItem('userInfo')).access_token
      }
    }
  },
  methods: {
    init() {
      this.importModalShow = true;
    },
    cancel() {
      (this.tableData = []),
        (this.tableHeader = []),
        (this.importModalShow = false);
      this.$emit("importModalCancel");
    },

    handleSuccess({ results, header }) {
      this.tableData = results;
      this.tableHeader = header;
      // console.log(this.tableData);
      // console.log(this.tableHeader);
    },
    uploadExcel() {
      //  this.tableData = results;
      this.$http({
        url: this.$constants.BIURL + "/political/score/rule/excel/import",
        method: "POST",
        //二进制流
        header: "multipart/form-data",
        // responseType: "blob"
        dataType: "multipart/form-data",
        data: {
          file: this.tableData
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
/deep/ .drop {
  width: 100% !important;
}
</style>
