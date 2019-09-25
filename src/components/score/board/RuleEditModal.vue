<template>
  <el-dialog
    :visible.sync="ruleEditModalShow"
    :title="model.id?'修改':'添加'"
    :close-on-click-modal="false"
    width="50%"
    @close="cancel"
  >
    <Form v-loading="loading" ref="formValidate" :model="model" :label-width="100" :rules="RuleValidate">
      <FormItem label="所属组织" prop="deptId">
        <treeselect
          v-model="model.deptId"
          :options="departments"
          :max-height="200"
          @select="orgSelect"
          noResultsText="没有找到匹配结果"
          placeholder="请选择所属组织..."
        />
      </FormItem>

      <FormItem label="星级" prop="starLevel">
        <Rate  v-model="model.starLevel"   />
      </FormItem>

      <FormItem label="用户名称" prop="userName">
        <Input v-model="model.userName" placeholder />
      </FormItem>
      <FormItem label="活跃度" prop="liveness">
        <Input v-model="model.liveness" placeholder />
      </FormItem>

      <!-- <FormItem label="个人积分排名" prop="scoreRank">
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
      </FormItem> -->
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
import Treeselect from '@riophae/vue-treeselect';
import '@riophae/vue-treeselect/dist/vue-treeselect.css';
export default {
  name: "BoardModal",
  components:{Treeselect},
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
        deptId: {
          type:Number
        },
        deptName: "",
        disabled: false,
        id: 0,
        liveness: 0,
        memo: "",
        modifier: "",
        modifyTime: 0,
        // scoreRank: 0,
        starLevel: 0,
        // studyScore: 0,
        // totalScore: 0,
        userId: 0,
        // userName: "",
        // volServiceScore: 0
      },
            RuleValidate: {
        deptId: [
          {
            required: true,
            message: "所属组织不能为空",
            trigger: "blur"
          }
        ],
        userName: [
          {
            required: true,
            message: "用户名称不能为空",
            trigger: "blur"
          }
        ],

      
      },
      loading: false,
      departments:[],
    };
  },
  methods: {
    init(row) {
        this.ruleEditModalShow = true;
      this.loadDepartment()
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
              // console.log(err, "ruleerr");
            });
        } else {
        }
      });
      // console.log("handleSubmit");
    },
    handleReset() {
      this.$refs["formValidate"].resetFields();
    },
     loadDepartment(){
            var self = this;
            self.loading = true
            self.$http({
                url:self.$constants.BIURL+'/political/department/list',
                method:'GET',
                params:{
                    // query:self.deptQueryStr
                }
            })
            .then(response=> {
               self.loading = false
                if(response.status ==200){
                    const data = response.data;
                    const arrChange = arr => arr.map(item => {
                        const res = {};
                        if(item.children && item.children.length == 0){
                           delete item.children ;
                        }else{
                            arrChange(item.children);
                        }
                    });
                    arrChange(data);
                    self.departments = data;

                }
            }).catch(function (error) {
                    self.$Message.error({
                    content: error.message,
                    duration: 2
                });
                // console.log(error);
            });
        },

         orgSelect(node){
            this.model.deptId = node.did;
            this.mdoel.deptName = node.title;
        },
  }
};
</script>
