<template>
  <div class="rule-wrap h-100 d-flex flex-column">
    <div class="bread pl-20 d-flex mt-10">
       <Breadcrumb class="breadcrumb">
        <BreadcrumbItem to="/home">首页</BreadcrumbItem>
        <BreadcrumbItem>积分管理</BreadcrumbItem>
        <BreadcrumbItem>党员积分管理</BreadcrumbItem>
      </Breadcrumb>
    </div>

    <div class="p-15">
      <Row type="flex" justify="end">
        <Col :span="2">
          <Button @click="addRule()" class="mt-1">添加</Button>
        </Col>
        <Col :span="6">
          <Input
            width="400px"
            v-model="queryStr"
            search
            enter-button
            @on-search="onSeach"
            placeholder="输入规则名称查找"
          />
        </Col>
        <Col :span="10"  :offset="6">
          <Button @click="downloadTemplate()" class="mt-1">下载规则模板</Button>
          <Button @click="ruleExcelExport()" class="mt-1">导出积分规则</Button>
          <Button @click="ruleExcelImport()" class="mt-1">导入积分规则</Button>


        </Col>
      </Row>

      <div class="table-wrap mt-10">
        <rule-table
          @ruleEditModalSuccess="ruleEditModalSuccess"
          @editRule="editRule"
          :records="records"
          :pages="pages"
          :ruleLoading="ruleLoading"
        ></rule-table>
      </div>
      <div class="mt-10 d-flex jc-end page-wrap">
        <Page
          @on-page-size-change="changeSize"
          @on-change="changePage"
          show-sizer
          show-total
          :total="pages.total"
          :current="pages.current"
          :page-size="pages.size"
        />
      </div>
    </div>
    <rule-edit-modal
      @ruleEditModalSuccess="ruleEditModalSuccess"
      @ruleEditModalCancel="ruleEditModalCancel"
      ref="ruleEditModal"
      v-if="ruleEditModalShow"
    ></rule-edit-modal>
    <import-modal
    ref="importModal"
    @importModalCancel="importModalCancel"
     v-if="importModalShow"></import-modal>
  </div>
</template>

<script>
import ImportModal from './ImportModal'
import RuleTable from "./RuleTable";
import RuleEditModal from "./RuleEditModal";
export default {
  name: "Rule",
  components: {
    RuleTable,
    RuleEditModal,
    ImportModal
  },
  data() {
    return {
      queryStr: "",
      records: [],
      pages: {
        current: 1,
        pages: 1,
        total: 0,
        size: 10
      },
      ruleLoading: false,
      ruleEditModalShow: false,
      importModalShow:false
    };
  },
  methods: {
    fetchRuleList() {
      this.ruleLoading = true;
      this.$http({
        url: this.$constants.BIURL + "/political/score/rule/list",
        method: "GET",
        dataType: "json",
        params: {
          current: this.pages.current,
          size: this.pages.size,
          query: this.queryStr
        }
      })
        .then(res => {
          this.ruleLoading = false;
          if (res.data.code == 0) {
            const { records, current, pages, total, size } = res.data.data;
            this.records = records;
            this.pages = {
              current,
              pages,
              total,
              size
            };
          } else {
            this.$Message.error(res.data.msg || "请求规则列表错误");
          }
        })
        .catch(err => {
          // console.log(err);
        });
    },
    ruleEditModalSuccess() {
      // this.ruleEditModalShow = false
      this.fetchRuleList();
    },
    editRule(row) {
      this.ruleEditModalShow = true;
      this.$nextTick(() => {
        this.$refs.ruleEditModal.init(row);
      });

      // console.log(row)
    },
    addRule() {
      this.ruleEditModalShow = true;
      this.$nextTick(() => {
        this.$refs.ruleEditModal.init({
          id: 0,
          catalogName: "",

          deleted: false,
          disabled: false,

          ruleName: ""
        });
      });
    },
    ruleEditModalCancel() {
      this.ruleEditModalShow = false;
    },
    // 关键词查询
    onSeach() {
      this.pages.current = 1;
      this.fetchRuleList();
    },
    changePage(current) {
      this.pages.current = current;
      this.fetchRuleList();
    },
    changeSize(size) {
      this.pages.size = size;
      this.fetchRuleList();
    },
    /**下载规则模板 */
    downloadTemplate() {
      this.$http({
        url: this.$constants.BIURL + "/political/score/rule/excel/template",
        method: "GET",
        //二进制流
        responseType: "blob"
        // dataType: "json",
        // params: {
        //   current: this.pages.current,
        //   size: this.pages.size,
        //   query: this.queryStr
        // }
      }).then(res => {

        let blob = new Blob([res.data], {type: 'application/vnd.ms-excel;charset=utf-8'})
            let url = window.URL.createObjectURL(blob);
            let aLink = document.createElement("a");
            aLink.style.display = "none";
            aLink.href = url;

            aLink.setAttribute("download", `积分模板${new Date().getTime()}.xls`);
            document.body.appendChild(aLink);
            aLink.click();
            document.body.removeChild(aLink);
            window.URL.revokeObjectURL(url);
            // console.log(aLink)
      });
    },
    ruleExcelExport(){
        this.$http({
        url: this.$constants.BIURL + "/political/score/rule/excel/export",
        method: "GET",
        //二进制流
        responseType: "blob",
        // dataType: "json",
        params: {
         
          query: this.queryStr
        }
      }).then(res => {

        let blob = new Blob([res.data], {type: 'application/vnd.ms-excel;charset=utf-8'})
            let url = window.URL.createObjectURL(blob);
            let aLink = document.createElement("a");
            aLink.style.display = "none";
            aLink.href = url;

            aLink.setAttribute("download", `excel${new Date().getTime()}.xls`);
            document.body.appendChild(aLink);
            aLink.click();
            document.body.removeChild(aLink);
            window.URL.revokeObjectURL(url);
            // console.log(aLink)
      });
    },
    ruleExcelImport(){
        this.importModalShow = true

        this.$nextTick(() => {
this.$refs.importModal.init()
      });


    },
    importModalCancel(){
      this.fetchRuleList()
      this.importModalShow = false
    }
  },
  created() {
    this.fetchRuleList(1);
  }
};
</script>
<style>
.ivu-breadcrumb {
    position: fixed;
    top: 60px!important;
    z-index: 100;
    background: #fff;
    padding-top: 10px;
        left: 14%;
}
.p-15 {
  margin-top: 20px;
}


</style>

<style lang="less" scoped>
.rule-wrap {
  // min-height: 800px;
  height: 100%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  position: relative;
  .table-wrap {
    min-height: 500px;
  }
  .page-wrap {
    min-height: 50px;
  }
  .bread {
    height: 40px;
  }
}
</style>
