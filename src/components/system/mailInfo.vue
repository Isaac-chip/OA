<template>
    <div class="bi-main-container">
         <Breadcrumb class="breadcrumb">
            <BreadcrumbItem to="/">首页</BreadcrumbItem>
            <BreadcrumbItem>系统管理</BreadcrumbItem>
            <BreadcrumbItem>邮箱设置</BreadcrumbItem>
        </Breadcrumb>
        <div style="text-align:center;width:80%;margin-top:30px;">
            <div style="color:red;margin-bottom:10px;">提示:(SMTP服务器地址设置如:smtp.163.com/163邮箱 smtp.qq.com/QQ邮箱 smtp.sina.com/新浪邮箱)</div>
            <Form ref="mailInfoForm" :model="mailInfoForm" :rules="mailInfoFormRuleValidate" :label-width="220">
                 <FormItem label="SMTP发送服务器的地址:" prop="smtpHost">
                    <Input v-model="mailInfoForm.smtpHost"  placeholder="输入服务器的地址" />
                </FormItem>
                <FormItem label="发送邮箱地址:"  prop="fromMail">
                    <Input v-model="mailInfoForm.fromMail"   placeholder="输入发送邮箱地址" />
                </FormItem>
                <FormItem label="用户名:" prop="userName">
                    <Input v-model="mailInfoForm.userName"   placeholder="输入用户名" />
                </FormItem>
                <FormItem label="密码:" prop="passWord">
                    <Input type="password" v-model="mailInfoForm.passWord" placeholder="输入密码" />
                </FormItem>
                <FormItem label="领导邮箱:">
                    <Input v-model="mailInfoForm.toMail"  placeholder="输入领导邮箱" />
                </FormItem>
               <Row>
                    <Button type="primary" @click="handleSubmit('mailInfoForm')">保存设置</Button>
               </Row>
            </Form>
        </div>
    </div>
</template>
<script>
export default {
    data (){
        return {
            mailInfoForm:{
                smtpHost:'',
                userName:'',
                passWord:'',
                fromMail:'',
                toMail:''
            },
            mailInfoFormRuleValidate:{
                smtpHost:[
                    {required: true, message: '服务器地址不能为空', trigger: 'blur'}
                ],
                userName:[
                    {required: true, message: '用户名不能为空', trigger: 'blur'}
                ],
                fromMail:[
                    {required: true, message: '发送邮箱地址不能为空', trigger: 'blur'}
                ],
                passWord:[
                    {required: true, message: '密码不能为空', trigger: 'blur'}
                ]
            
            }
        }
    },
    methods:{
        handleSubmit:function(name){
            var self = this;
            var url = self.$constants.BIURL+'/mail';
            var method = 'POST';
            self.mailInfoForm.tenantId = self.$constants.userInfo.tenantId;
            self.$http({
                url:url,
                method:method,
                dataType:'json',
                data:self.mailInfoForm
            })
            .then(function (response) {
                if(response.status ==200){
                    var data = response.data;
                    console.log(data);
                    if(data.code == 1){
                        self.$Message.error({
                            content: data.data,
                            duration: 2
                        }); 
                    }else{
                        self.mailInfoForm = data.data;
                        self.$Message.success({
                            content: '数据保存成功!',
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
        },
        loadMailInfo:function(){
            var self = this
            self.$http({
                url: self.$constants.BIURL + '/mail/getOne',
                method: 'get'
            }).then(function (response) {
                var data = response.data;
                 self.mailInfoForm = data.data;
            }).catch(function (error) {
                self.$Message.error({
                    content: error.message,
                    duration: 2
                })
                console.log(error)
            })
        }
    },
    mounted:function(){
        this.loadMailInfo();
    }
}
</script>