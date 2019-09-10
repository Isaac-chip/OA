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
      ref="formValidate"
   
      :model="model"
      :label-width="100"
    >
    
       <FormItem label="部门id" prop="deptId">
        <Input type="number" v-model="model.deptId" placeholder />
      </FormItem>

     <FormItem label="星级" prop="starLevel">
        <Input v-model="model.starLevel" placeholder />
      </FormItem>
      <FormItem label="租户id" prop="tenantId">
        <Input v-model="model.tenantId" placeholder />
      </FormItem>
     <FormItem label="用户名称" prop="userName">
        <Input v-model="model.userName" placeholder />
      </FormItem>
      <FormItem label="活跃度" prop="liveness">
        <Input v-model="model.liveness" placeholder />
      </FormItem>

      <FormItem label="个人积分排名" prop="scoreRank">
        <Input type="number" v-model="model.scoreRank" placeholder />
      </FormItem>
      <FormItem label="个人学习积分" prop="studyScore">
        <Input type="number" v-model="model.studyScore" placeholder />
      </FormItem>

      <FormItem label="个人志愿服务积分" prop="volServiceScore">
        <Input type="number" v-model="model.volServiceScore" placeholder />
      </FormItem>
      <FormItem label="总评分" prop="totalScore">
        <Input type="number" v-model="model.totalScore" placeholder />
      </FormItem>
      <FormItem label="备注" prop="memo">
        <Input v-model="model.memo" placeholder />
      </FormItem>
      <FormItem label="是否禁用" prop="disabled">
        <i-switch v-model="model.disabled" />
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
      // ruleValidate: {
      //   catalogName: [
      //     {
      //       required: true,
      //       message: "The catalogName cannot be empty",
      //       trigger: "blur"
      //     }
      //   ],
      //   ruleName: [
      //     {
      //       required: true,
      //       message: "The ruleName cannot be empty",
      //       trigger: "blur"
      //     }
      //   ]
      // },
      model: {
        createTime: 0,
        deleted: false,
        deptId: 0,
        deptName: "",
        disabled: false,
        id: 0,
        liveness: 0,
        memo: "",
        modifier: "",
        modifyTime: 0,
        scoreRank: 0,
        starLevel: "",
        studyScore: 0,
        tenantId: "",
        totalScore: 0,
        userId: 0,
        userName: "",
        volServiceScore: 0
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
       this.handleReset();
      this.ruleEditModalShow = false;
      this.$emit("ruleEditModalCancel");
    },
    handleSubmit() {
      this.$refs["formValidate"].validate(valid => {
        if (valid) {
          this.loading = true;
          const method = this.model.id == 0 ? "POST" : "PUT";
          this.$http({
            url: this.$constants.BIURL + "/political/score/board",
            method: method,
            dataType: "json",
            data: this.model
          })
            .then(res => {
              this.loading = false;
             
              this.cancel();
              if (res.data.code == 0) {
                this.$Message.success(res.data.msg || "操作成功");
                this.$emit("ruleEditModalSuccess");
              } else {
                this.$Message.error(res.data.msg || "操作失败");
              }
            })
            .catch(err => {
              this.loading = false;
              this.handleReset();
              this.cancel();
              console.log(err, "ruleerr");
            });
        } else {
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
