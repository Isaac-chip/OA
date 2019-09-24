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
      :rules="ruleValidate"
      :model="model"
      :label-width="100"
    >
      <FormItem label="建设数量" prop="cnt">
        <Input v-model="model.cnt" placeholder />
      </FormItem>

      <FormItem label="备注" prop="memo">
        <Input v-model="model.memo" placeholder />
      </FormItem>

      <FormItem label="资源名称" prop="positionName">
        <Input v-model="model.positionName" placeholder />
      </FormItem>

      <!-- <FormItem label="村、机关、国企id" prop="villageId">
        <Input  v-model="model.villageId" placeholder />
      </FormItem>

       <FormItem label="村、机关、国企名称" prop="villageName">
        <Input  v-model="model.villageName" placeholder />
      </FormItem>-->

      <FormItem label="村、机关、国企名称" prop="deptId">
        <treeselect
          v-model="model.villageId"
          :options="departments"
          :max-height="200"
          @select="orgSelect"
          noResultsText="没有找到匹配结果"
          placeholder="请选择所属组织..."
        />
      </FormItem>

      <FormItem label="单位" prop="unit">
        <Input v-model="model.unit" placeholder />
      </FormItem>

      <FormItem label="考核对象类型" prop="type">
        <Input v-model="model.type" placeholder />
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
  name: "RuleModal",
  components:{Treeselect},
  data() {
    return {
      ruleEditModalShow: false,
      ruleValidate: {
        ruleName: [
          {
            required: true,
            message: "The ruleName cannot be empty",
            trigger: "blur"
          }
        ]
      },
      model: {
        id: "",
        cnt: "",
        memo: "",
        positionName: "",
        villageId: "",
        unit: "",
        type: "",
        villageName: ""
      },
      loading: false,
      //树
      departments: []
    };
  },
  methods: {
    init(row) {
      this.ruleEditModalShow = true;
    this.loadDepartment()
      this.model = { ...row };
    },

    cancel() {
      this.ruleEditModalShow = false;
      this.$emit("ruleEditModalCancel");
    },
    handleSubmit() {
      this.$refs["formValidate"].validate(valid => {
        if (valid) {
          this.loading = true;
          const method = this.model.id ? "PUT" : "POST";
          this.$http({
            url: this.$constants.BIURL + "/political/position/building",
            method: method,
            dataType: "json",
            data: this.model
          })
            .then(res => {
              this.loading = false;
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
    //获取村子列表
        loadDepartment(){
            var self = this;
            self.loading = true
            self.$http({
                url:self.$constants.BIURL+'/political/village/list',
                method:'GET',
                params:{
                    // query:self.deptQueryStr
                }
            })
            .then(response=> {
               self.loading = false
                if(response.status ==200){
                    const {data} = response.data;
                    // console.log(data)
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
           console.log(this.model)
            // this.model.villageId = node.id;
            this.$set(this.model,'villageName',node.villageName)
            this.$set(this.model,'villageId',node.id)
            
        },
 
  }
};
</script>
