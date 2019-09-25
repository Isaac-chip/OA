<template>
  <el-dialog
    :visible.sync="ruleEditModalShow"
    :title="model.id?'修改':'添加'"
    :close-on-click-modal="false"
    width="50%"
    @close="cancel"
  >
    <el-form
      label-width="120px"
      v-loading="loading"
      ref="formValidate11"
      :rules="ruleValidate"
      :model="model"
      @submit.native.prevent="handleSubmit"
    >
      <el-form-item label="积分规则名称" prop="ruleName">
        <el-input v-model="model.ruleName" placeholder />
      </el-form-item>
      
       <el-form-item label="创建人名称" prop="creatorName">
        <el-input v-model="model.creatorName" placeholder />
      </el-form-item>

      <el-form-item size="mini" label="选择栏目" prop="catalogId">
        <treeselect
          v-model="model.catalogId"
          :options="departments"
          :max-height="200"
          @select="orgSelect"
          noResultsText="没有找到匹配结果"
          placeholder="请选择所属栏目..."
        />
      </el-form-item>

     

 <Row  type="flex" >
     <Col :span="8" >
            <el-form-item label="默认分值" prop="defScore">
        <!-- <el-input type="number" v-model="model.defScore" placeholder /> -->
         <InputNumber  :min="1" v-model="model.defScore" placeholder="请输入数字"></InputNumber>
      </el-form-item>
        </Col>
        <Col :span="8" >
            <el-form-item label="最低分" prop="minScore">
        <!-- <el-input type="number" v-model="model.minScore" placeholder /> -->
         <InputNumber  :min="1" v-model="model.minScore"  placeholder="请输入数字"></InputNumber>
      </el-form-item>
        </Col>
      
        <Col :span="8" >
          <el-form-item label="最高分" prop="maxScore">
        <!-- <el-input type="number" v-model="model.maxScore" placeholder /> -->
          <InputNumber  :min="1" v-model="model.maxScore"  placeholder="请输入数字"></InputNumber>
      </el-form-item>
        </Col>
      </Row>

    
     
      <el-form-item label="是否禁用" prop="disabled">
        <i-switch v-model="model.disabled" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" native-type="submit">提交</el-button>
        <!-- <Button @click="handleReset()" style="margin-left: 8px">重置</Button> -->
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
export default {
  name: "RuleModal",
  components: { Treeselect },
  data() {
   var validmin = (rule, value, callback) => {
        if (value == '') {
          callback(new Error('请输入最低分'));
        } else {
          if (this.model.maxScore != '') {
            this.$refs.formValidate11.validateField('maxScore');
          }
          callback();
        }
      };

       var validmax = (rule, value, callback) => {
        if (value == '') {
          callback(new Error('请输入最高分'));
        } else if (value <= this.model.minScore) {
          callback(new Error('最高分不得低于最低分'));
        } else {
          callback();
        }
      };
      

    return {
      ruleEditModalShow: false,
      ruleValidate: {
        maxScore: [{ validator: validmax, trigger: "blur" }],
        minScore: [{ validator: validmin, trigger: "blur" }],
        ruleName: [
          {
            required: true,
            message: "积分规则名称不能为空",
            trigger: "blur"
          }
        ]
      },

      model: {
        catalogId: {
          type: Number
        },
        catalogName: "",
        createTime: 0,
        creator: 0,
        creatorName: "",
        defScore: '',
        deleted: false,
        disabled: false,
        id: 0,
        maxScore: {
          type:Number
        },
        minScore:  {
          type:Number
        },
        modifier: "",
        modifyTime: {
          type: Number
        },
        ruleName: "",
        tenantId: ""
      },
      loading: false,
      departments: []
    };
  },
  methods: {
    init(row) {
      this.ruleEditModalShow = true;

      this.model = { ...row };
      this.loadDepartment();
    },
    asyncOK() {},
    cancel() {
      this.ruleEditModalShow = false;
      this.$emit("ruleEditModalCancel");
    },
    handleSubmit() {
      this.$refs["formValidate11"].validate((valid) => {
        if (valid) {
          //合格
          this.loading = true;
          const method = this.model.id == 0 ? "POST" : "PUT";
          this.$http({
            url: this.$constants.BIURL + "/political/score/rule",
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
        }
      });
      // console.log("handleSubmit");
    },
    handleReset() {
      this.$refs["formValidate11"].resetFields();
    },

    /**栏目 */
    loadDepartment() {
      this.loading = true;
      this.$http({
        url: this.$constants.BIURL + "/political/catalog/findAll",
        method: "GET",
        params: {
          queryStr: ""
        }
      })
        .then(response => {
          this.loading = false;
          if (response.data.code == 0) {
            const { data } = response.data;
            const arrChange = arr =>
              arr.map(item => {
                const res = {};
                if (item.children && item.children.length == 0) {
                  delete item.children;
                } else {
                  arrChange(item.children);
                }
              });
            arrChange(data);
            this.departments = data;
          } else {
            this.$Message.error(response.data.msg || "请求栏目列表错误");
          }
        })
        .catch(function(error) {
          this.$Message.error({
            content: error.message,
            duration: 2
          });
          // console.log(error);
        });
    },

    orgSelect(node) {
      //  console.log(node)
      this.model.catalogId = node.id;
      this.$set(this.model, "catalogName", node.title);
    }
  }
};
</script>

<style lang="less" scoped>
/deep/.ivu-input-number {
  width: 150px;
}
</style>
