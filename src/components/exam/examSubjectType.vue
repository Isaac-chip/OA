<template>
     <div class="bi-main-container">
        <Breadcrumb class="breadcrumb">
            <BreadcrumbItem to="/home">首页</BreadcrumbItem>
            <BreadcrumbItem>学习教育</BreadcrumbItem>
            <BreadcrumbItem>知识竞赛</BreadcrumbItem>
            <BreadcrumbItem>试卷分类</BreadcrumbItem>
        </Breadcrumb>
         <div class="bi-container">
        <Row>
            <Button @click="showTypeModal">新增</Button>
        </Row>
        <div class="examType">
            <Card class="cardview" v-for="item in examTypes" :key="item.id">
                <p slot="title">
                    {{item.subjectTypeName}}
                </p>
                <a href="#" slot="extra" @click.prevent="deleteType(item.id)">
                    删除
                </a>
                <p> {{item.memo}}</p>
                <div class="footer">
                    <div>{{item.createdDate}}</div>
                    <div>
                    </div>
                </div>
            </Card>
        </div>
        <Modal v-model="estFormModal" title="新增试卷分类" :footer-hide="true" :mask-closable="false" class="estFormModal">
             <Form ref="estForm" :model="estForm" :rules="estFormRuleValidate" :label-width="80"  >
                <FormItem label="分类名称" prop="subjectTypeName">
                    <Input v-model="estForm.subjectTypeName" placeholder="请输入试卷分类名称" />
                </FormItem>
                <FormItem label="分类描述" >
                    <Input v-model="estForm.memo" placeholder="请输入试卷分类描述" />
                </FormItem>
                <div style="text-align:center">
                    <Button type="primary" @click="addEst('estForm')">提交</Button>
                    <Button style="margin-left: 8px" @click="hideEstModel('estForm')">关闭</Button>
                </div>
             </Form>
        </Modal>
         </div>
     </div>
</template>
<style >
.examType{
    height: auto;
    overflow-y: scroll;
    display: flex !important;
    box-sizing: border-box;
    margin-top: 10px;
    flex-wrap: wrap;
    padding: 0 0px 40px 0px;
}

.cardview{
    display: block;
    width: 24%;
    margin: 5px;
}

.cardview .footer{
    display: flex;
    padding: 10px 0px;
    justify-content:space-between;
}
</style>
<script>
export default {
    data(){
        return {
            examTypes:[],
            estFormModal:false,
            estForm:{
                subjectTypeName:'',
                memo:''
            },
            estFormRuleValidate:{
                subjectTypeName:[
                     { required: true, message: '试卷分类名称为空', trigger: 'blur' }
                ]
            }
        }
    },
    methods:{
        showTypeModal:function(){
            this.estFormModal = true;
        },
        hideEstModel:function(name){
            this.estFormModal = false;
            this.$refs[name].resetFields();
        },
        loadAllExamType:function(){
            var self = this
            self.$http({
                url: self.$constants.BIURL + '/education/exam/subject/type/list',
                method: 'get',
                params:{
                    current:1,
                    size:100
                }
            }).then(function (response) {
                var data = response.data;
                 self.examTypes = data.data.records;
            }).catch(function (error) {
                self.$Message.error({
                    content: error.message,
                    duration: 2
                })
                console.log(error)
            })
        },
        addEst:function(name){
            var self = this;
            this.$refs[name].validate((valid) => {
                if(valid){
                    var url = self.$constants.BIURL+'/education/exam/subject/type';
                    var method = 'POST';
                    self.$http({
                        url:url,
                        method:method,
                        dataType:'json',
                        data:self.estForm
                    })
                    .then(function (response) {
                        if(response.status ==200){
                            var data = response.data;
                            if(data.code == 1){
                                self.$Message.error({
                                    content: data.data,
                                    duration: 2
                                }); 
                            }else{
                                self.current = 1;
                                self.estFormModal = false;
                                self.$refs[name].resetFields();
                                self.loadAllExamType();
                                self.$Message.success({
                                    content: '数据添加成功!',
                                    duration: 2
                                });
                            }
                        
                        }
                    }) .catch(function (error) {
                        self.$Message.error({
                            content: error.message,
                            duration: 2
                        });
                        console.log(error);
                    });
                }else{
                    this.$Message.error('表单校验失败，请输入必填项!');
                }
            });
        },
        deleteType:function(id){
            var self = this;
            this.$Modal.confirm({
                title:'系统提示',
                content:'确定要删除该记录吗?',
                okText:'确定',
                cancelText:'取消',
                onOk:function(){
                    self.handleDelete(id);
                }
            });
        },
        handleDelete:function(id){
            var self = this;
            self.$http({
                url:self.$constants.BIURL+'/education/exam/subject/type/'+id,
                method:'DELETE'
            })
            .then(function (response) {
                if(response.status ==200){
                    self.$Message.success({
                        content: '数据删除成功!',
                        duration: 2
                    });
                    self.loadAllExamType();
                }
            }) .catch(function (error) {
                    self.$Message.error({
                    content: error.message,
                    duration: 2
                });
            });
        }
    },
    mounted:function(){
        this.loadAllExamType();
    }
}
</script>