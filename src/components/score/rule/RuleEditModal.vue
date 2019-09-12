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
       <FormItem label="积分规则名称" prop="ruleName">
        <Input v-model="model.ruleName" placeholder />
      </FormItem>

      <FormItem label="选择栏目" prop="catalogId">
        <treeselect
          v-model="model.catalogId"
          :options="departments"
          :max-height="200"
          @select="orgSelect"
          noResultsText="没有找到匹配结果"
          placeholder="请选择所属栏目..."
        />
      </FormItem>

       <FormItem label="默认分值" prop="defScore">
        <Input type="number" v-model="model.defScore" placeholder />
      </FormItem>
      <FormItem label="最低分" prop="minScore">
        <Input type="number" v-model="model.minScore" placeholder />
      </FormItem>
      <FormItem label="最高分" prop="maxScore">
        <Input type="number" v-model="model.maxScore" placeholder />
      </FormItem>
      <FormItem label="是否禁用" prop="disabled">
        <i-switch v-model="model.disabled"  />
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
        catalogId: {
          type:Number
        },
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
      loading: false,
      departments:[]
    };
  },
  methods: {
    init(row) {
      this.ruleEditModalShow = true;

      this.model = { ...row };
      this.loadDepartment()
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
              // console.log(err, "ruleerr");
            });
        }else {

        }
      });
      // console.log("handleSubmit");
    },
    handleReset() {
      this.$refs["formValidate"].resetFields();
    },

    /**栏目 */
    loadDepartment(){

            this.loading = true
            this.$http({
                url:this.$constants.BIURL+'/political/catalog/findAll',
                method:'GET',
                params:{
                    queryStr:""
                }
            })
            .then(response=> {
               this.loading = false
                if(response.data.code ==0){
                    const {data} = response.data;
                    const arrChange = arr => arr.map(item => {
                        const res = {};
                        if(item.children && item.children.length == 0){
                           delete item.children ;
                        }else{
                            arrChange(item.children);
                        }
                    });
                    arrChange(data);
                    this.departments = data;

                }else {
                  this.$Message.error(response.data.msg||"请求栏目列表错误")
                }
            }).catch(function (error) {
                    this.$Message.error({
                    content: error.message,
                    duration: 2
                });
                // console.log(error);
            });
        },

         orgSelect(node){
          //  console.log(node)
            this.model.catalogId = node.id;
            this.$set(this.model,'catalogName',node.title)
        },
  }
};
</script>
