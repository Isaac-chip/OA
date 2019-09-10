<template>
  <el-dialog
    :visible.sync="ruleEditModalShow"
    :title="model.id?'修改':'添加'"
    :close-on-click-modal="false"
    width="50%"
    @close="cancel"
  >
    <Form
    v-loading="loading"
     ref="formValidate" :rules="ruleValidate" :model="model" :label-width="100">
      <FormItem label="栏目名称" prop="catalogName">
        <Input v-model="model.catalogName" placeholder />
      </FormItem>
      <FormItem label="最低分" prop="minScore">
        <Input type="number" v-model="model.minScore" placeholder />
      </FormItem>
      <FormItem label="最高分" prop="maxScore">
        <Input type="number" v-model="model.maxScore" placeholder />
      </FormItem>
      <FormItem label="积分规则名称" prop="ruleName">
        <Input v-model="model.ruleName" placeholder />
      </FormItem>

      <FormItem>
        <Button type="primary" @click="handleSubmit()">提交</Button>
        <Button @click="handleReset()" style="margin-left: 8px">重置</Button>
      </FormItem>
    </Form>
  </el-dialog>
</template>

<script>
export default {
  name: "RuleModal",
  data() {
    return {
      ruleEditModalShow: false,
      ruleValidate: {
        catalogName: [
          {
            required: true,
            message: "The catalogName cannot be empty",
            trigger: "blur"
          }
        ],
        ruleName: [
          {
            required: true,
            message: "The ruleName cannot be empty",
            trigger: "blur"
          }
        ]
      },
      model: {
        catalogId: 0,
        catalogName: "",
        createTime: 0,
        creator: 0,
        creatorName: "",
        defScore: 0,
        deleted: false,
        disabled: false,
        id: 0,
        maxScore: 0,
        minScore: 0,
        modifier: "",
        modifyTime: 0,
        ruleName: "",
        tenantId: ""
      },
      loading: false
    };
  },
  methods: {
    init(row) {
      this.ruleEditModalShow = true;
      this.model = { ...row };
    },
    asyncOK() {},
    cancel() {
      this.ruleEditModalShow = false;
      this.$emit("ruleEditModalCancel");
    },
    handleSubmit() {

      this.$refs["formValidate"].validate(valid => {
        if (valid) {
          this.loading = true
          const method = this.model.id==0?'POST':'PUT'
          this.$http({
            url: this.$constants.BIURL + "/political/score/rule",
            method: method,
            dataType: "json",
            data: this.model
          })
            .then(res => {
              this.loading = false
              this.handleReset();
              this.cancel();
              if (res.data.code == 0) {
                this.$Message.success(res.data.msg || "修改成功");
                this.$emit("ruleEditModalSuccess");
              } else {
                this.$Message.error(res.data.msg || "修改失败");
              }
            })
            .catch(err => {
              this.loading = false
              this.handleReset();
              this.cancel();
              console.log(err, "ruleerr");
            });
        }else {

        }
      });
      // console.log("handleSubmit");
    },
    handleReset() {
      this.$refs["formValidate"].resetFields();
    }
  }
};
</script>
