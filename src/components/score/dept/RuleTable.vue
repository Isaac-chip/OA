<template>
  <div>
    <Table border :columns="columns" :loading="ruleLoading" :data="records">


      <template slot-scope="{ row }" slot="disabled">{{ row.disabled | disabledFilter }}</template>
      <template slot-scope="{ row }" slot="starLevel">

         <Rate  v-model="row.starLevel"  disabled />
      </template>

      <template slot-scope="{ row }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="editRule(row)">修改</Button>

        <Button
          type="error"
          size="small"
          @click="selectedRule('delete',`/political/score/board/${row.id}`)"
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

      /**
       * createTime: null
deleted: false
disabled: false
id: null
memo: null
modifier: null
modifyTime: null
scoreRank: 0
starLevel: null
studyScore: 34
tenantId: null
totalScore: 12234
userId: null
userName: null
volServiceScore: 23
       */
      columns: [
        {
          title: "序号",
          // key: "deptId",
          maxWidth: 70,
          type:"index"
        },

        {
          title: "部门名称",
          key: "deptName",
          minWidth: 100
        },

         {
          title: "活跃度",
          key: "liveness",
          maxWidth: 110
        },


        {
          title: "个人积分排名",
          key: "scoreRank",

        },
        {
          title: "星级",
          slot: "starLevel",
          minWidth:100

        },

        {
          title: "个人学习积分",
          key: "studyScore",

        },

        {
          title: "总评分",
          key: "totalScore",

        },

        {
          title: "个人志愿服务积分",
          key: "volServiceScore",

        },

        {
          title: "状态",
          slot: "disabled",

        },
         {
          title: "备注",
          key: "memo",

        },

        // {
        //   title: "操作",
        //   slot: "action",
        //   fixed: "right",
        //   minWidth: 80,

        // }
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
