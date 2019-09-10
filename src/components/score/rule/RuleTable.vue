<template>
  <div>
    <Table 
    border 
    :columns="columns" :loading="ruleLoading" :data="records">
      <template slot-scope="{ row }" slot="deleted">{{ row.deleted | deletedFilter }}</template>

      <template slot-scope="{ row }" slot="disabled">{{ row.disabled | disabledFilter }}</template>

      <template slot-scope="{ row }" slot="modifyTime">{{ row.modifyTime | modifyTimeFilter }}</template>

      <template slot-scope="{ row }" slot="createTime">{{ row.createTime | modifyTimeFilter }}</template>
      <template slot-scope="{ row }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="editRule(row)">修改</Button>

         <Button
          :type="row.disabled?'primary':'error'"
          size="small"
          @click="selectedRule('disabled',`/political/score/rule/disabled/${row.id}`)"
        >{{row.disabled?'开启':'禁用'}}</Button>

        <Button
          type="error"
          size="small"
          @click="selectedRule('delete',`/political/score/rule/${row.id}`)"
        >删除</Button>

      </template>
    </Table>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  props: {
    ruleLoading: {
      type: Boolean,
      default: false
    },
    pages: {
      type: Object
    },
    records: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      selectedType: "",
      selectedUrl: "",
      modalShow: false,
      columns: [
        {
          title: "序号",
          key: "id",
          maxWidth:80
        },
       
        {
          title: "栏目名称",
          key: "catalogName"
        },
          {
          title: "规则名称",
          key: "ruleName"
        },  {
          title: "默认分值",
          key: "defScore",
          maxWidth:90
        },
         {
          title: "最低分",
          key: "minScore",
          maxWidth:80
        },
          {
          title: "最高分",
          key: "maxScore",
          maxWidth:80
        },
       

        {
          title: "创建人名称",
          key: "creatorName",
          maxWidth:120
        },
      
       
        {
          title: "状态",
          slot: "disabled",
           maxWidth:80
        },
        
      
       
        {
          title: "操作",
          slot: "action",
          fixed: "right",
          minWidth:80,
           maxWidth:190,

        }
      ]
    };
  },
  filters: {
    deletedFilter(value) {
      switch (value) {
        case false:
          return "否";
        case true:
          return "是";
      }
    },
    disabledFilter(value) {
      switch (value) {
        case false:
          return "有效";
        case true:
          return "禁用";
      }
    },
    modifyTimeFilter(value) {
      return dayjs(value).format("YYYY-MM-DD");
    }
  },

  methods: {
    selectedRule(type, url) {
      this.selectedType = type;
      this.selectedUrl = url;
      this.deleteHandle();
    },
    deleteHandle() {
      // 此操作将${this.selectedType=='disabled'?'禁用':'删除'},
      this.$confirm(  `是否继续此操作?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http({
            url: this.$constants.BIURL + this.selectedUrl,
            method: "DELETE"
          }).then(res => {
            this.$emit("ruleEditModalSuccess");
            this.$Message.success(res.data.msg || "操作成功");
          });
        })
        .catch(() => {
          this.$Message.info("已取消删除");
        });
    },

    editRule(row) {
      this.$emit("editRule", row);
    }
  }
};
</script>
