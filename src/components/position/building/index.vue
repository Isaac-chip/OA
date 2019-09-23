<template>
  <div class="rule-wrap h-100 d-flex flex-column">
    <div class="bread pl-20 d-flex mt-10">
       <Breadcrumb class="breadcrumb">
        <BreadcrumbItem to="/">首页</BreadcrumbItem>
        <BreadcrumbItem>标准化台账</BreadcrumbItem>
        <BreadcrumbItem>党建阵地</BreadcrumbItem>
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
      
      </Row>

      <div class="table-wrap mt-10">
        <building-table
          @ruleEditModalSuccess="ruleEditModalSuccess"
          @editRule="editRule"
          :records="records"
          :pages="pages"
          :ruleLoading="ruleLoading"
        ></building-table>
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
    <edit-modal
      @ruleEditModalSuccess="ruleEditModalSuccess"
      @ruleEditModalCancel="ruleEditModalCancel"
      ref="ruleEditModal"
      v-if="ruleEditModalShow"
    ></edit-modal>
    <import-modal
    ref="importModal"
    @importModalCancel="importModalCancel"
     v-if="importModalShow"></import-modal>
  </div>
</template>

<script>

import BuildingTable from "./BuildingTable";
import EditModal from "./EditModal";
export default {
  name: "Rule",
  components: {
    BuildingTable,
    EditModal,
  },
  data() {
    return {
      queryStr: "",
      records: [],
      pages: {
        pageNo: 1,
        pages: 1,
        total: 0,
        pageSize: 10
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
        url: this.$constants.BIURL + "/political/position/building/list",
        method: "GET",
        dataType: "json",
        params: {
          pageNo: this.pages.pageNo,
          pageSize: this.pages.pageSize,
          query: this.queryStr.trim()
        }
      })
        .then(res => {
          this.ruleLoading = false;
          if (res.data.code == 0) {
            const { records, current, pages, total, size } = res.data.data;
            console.log(res.data)
            records.forEach((item,index)=>{
              item["index"]=index + (current -1)*  size +1
            })
            // console.log(records)
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
          id:'',
        cnt:'',
        memo:'',
        positionName:'',
        villageId:'',
        unit:'',
        type:'',
        villageName:''
        

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
