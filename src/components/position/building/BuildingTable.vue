<template>
  <div>
    {{records}}
    <Table border :columns="columns" :loading="ruleLoading" :data="records">
     
      <template slot-scope="{ row }" slot="createdDate">{{ row.createdDate | modifyTimeFilter }}</template>
      <template slot-scope="{ row }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="editRule(row)">修改</Button>

       

        <Button
          type="error"
          size="small"
          @click="selectedRule('delete',`/political/position/building/${row.id}`)"
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
         
          key: "index",
          width: 80
        },

      
        {
          title: "考核对象类型",
            
          key: "type",
          width: 120
        },
        {
          title: "村、机关、国企名称",
          key: "villageName",
        
          width: 160
        },
        {
          title: "资源名称",
          key: "positionName",
         
          width: 120
        },
         {
          title: "建设数量",
          key: "cnt",
         
          width: 120
        },
        {
          title: "单位",
          key: "unit",
         
          width: 120
        },
        {
          title: "备注",
          key: "memo",
        
          width: 140
        },

        {
          title: "创建时间",
          slot: "createdDate",
   
          width: 160
        },


        {
          title: "操作",
          slot: "action",
          fixed: "right",
          width: 150
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
      return dayjs(value).format("YYYY-MM-DD HH:mm");
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
      this.$confirm(`是否继续此操作?`, "提示", {
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
