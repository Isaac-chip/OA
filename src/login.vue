<template>
  <div id="login" class="login-container">
    <div class="login-weaper  animated bounceInDown">
      <div class="login-left">
      </div>
      <div class="login-border">
        <div class="login-main">
          <p>用户登录</p>
            <Form ref="loginForm" :model="loginForm" class="login-form" :rules="loginFormValidate">
                <FormItem prop="username">
                    <Input v-model="loginForm.username" class="el-input" prefix="ios-contact" placeholder="输入用户名" />
                </FormItem>
                 <FormItem prop="password">
                    <Input type="password" v-model="loginForm.password" class="el-input" prefix="ios-lock" placeholder="输入密码" />
                </FormItem>
                <Row>
                    <Col span="10">
                      <FormItem prop="code">
                        <Input class="login-code " @on-enter="doLogin" v-model="loginForm.code" prefix="ios-key" placeholder="输入密码" />
                      </FormItem>
                   </Col>
                   <Col span="11">
                    <div class="login-code">
                      <img :src="codeUrl"
                          class="login-code-img"
                          @click="refreshCode"/>
                    </div>
                  </Col>
                </Row>
                <FormItem >
                    <Button type="primary" size="small" class="login-submit" @click="doLogin">登录</Button>
                </FormItem>
            </Form>
        </div>
      </div>
    </div>
    <div class="copyRight">
        <div>中共合浦县委组织部</div>
        <div style="font-size:14px;font-weight:300;color:#FFF;">技术支持 : 广州毕思达信息科技有限公司</div>
    </div>
    <router-view/>
  </div>
</template>


<style>

input:-webkit-autofill {
 -webkit-box-shadow: 0 0 0px 1000px white inset !important;
}

.ivu-form-item-error .ivu-input {
    border-bottom-color: #ed4014 !important;
}

.login-main input{
  outline: none !important;
}

.login-main .ivu-input:focus{
  outline: none !important;
  box-shadow: none !important;
}

</style>

<script>
export const randomLenNum = (len, date) => {
  let random = ''
  random = Math.ceil(Math.random() * 100000000000000).toString().substr(0, len || 4)
  if (date) random = random + Date.now()
  return random
}
import Utils from "./utils";
import Base64  from "js-base64/base64.js";
import CryptoJS from "crypto-js/crypto-js.js";
  export default {
    name: "login",
    data() {
      return {
        activeName: "user",
        loginFormValidate:{
           username:[
                {required: true, message: '用户名不能为空', trigger: 'blur' }
            ],
            password:[
                {required: true, message: '登录密码不能为空', trigger: 'blur' },
                { min: 6, message: "密码长度最少为6位", trigger: "blur" }
            ],
            code:[
                {required: true, message: '验证码不能为空', trigger: 'blur' },
                { min: 4, max: 4, message: "验证码长度为4位", trigger: "blur" }
            ]
        },
        code: {
          src: "/code",
          value: "",
          len: 4,
          type: "image"
        },
        codeUrl:'',
        loginForm:{
          username:'',
          password:'',
          randomStr:'',
          code:''
        }
      };
    },
    watch: {},
    created() {
      this.loginForm.randomStr = randomLenNum(this.code.len, true)
       this.codeUrl = this.$constants.BASEPATH + "/code?randomStr="+this.loginForm.randomStr;
    },
    mounted() {
    },
    props: [],
    methods: {
      refreshCode:function() {
        this.loginForm.code = ''
        this.loginForm.randomStr = randomLenNum(this.code.len, true)
        this.codeUrl = this.$constants.BASEPATH + "/code?randomStr="+this.loginForm.randomStr;
      },
      getAesString:function(word,_key){//加密
        var key = CryptoJS.enc.Utf8.parse(_key);  //十六位十六进制数作为密钥
        var iv = CryptoJS.enc.Utf8.parse(_key); 
        let srcs = CryptoJS.enc.Utf8.parse(word);
        let encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.ZeroPadding });
        return encrypted.toString();//返回的是base64格式的密文
      },
      makeBasicAuth : function(client_id,client_secret) {
        var tok = client_id + ':' + client_secret;
        var hash = Base64.Base64.encode(tok,false);
        return "Basic " + hash;
      },
      doLogin:function(){
        var self = this;
        this.$refs.loginForm.validate(valid => {
        if (valid) {
          self.loginForm.scope = self.$constants.scope;
          var auth = self.makeBasicAuth(self.$constants.client_id,self.$constants.client_secret);
          self.loginForm.grant_type = self.$constants.grant_type;
          self.loginForm.password = this.getAesString(self.loginForm.password,self.$constants.decryptAESCode);
          this.$http({
             url:self.$constants.BASEPATH+'/auth/oauth/token',
              method:'POST',
              dataType:'json',
              headers:{
                Authorization : auth
              },
              params:self.loginForm
          })
          .then(function (response) {
                if(response.status ==200){
                    var data = response.data;
                    if(data){
                        self.$constants.userInfo.userId = data.userId;
                        self.$constants.userInfo.username = data.userName;
                        self.$constants.userInfo.deptId = data.deptId;
                        self.$constants.userInfo.deptCode = data.deptCode;
                        self.$constants.userInfo.roleId = data.roleId;
                        self.$constants.userInfo.avatar = data.avatar;
                        self.$constants.userInfo.name = data.nickName;
                        self.$constants.userInfo.userType = data.userType;
                        self.$constants.access_token = data.access_token;
                        self.$router.push({path: '/home'});
                        window.localStorage.setItem('userInfo', JSON.stringify(data));
                    }else{
                       self.$Message.error({
                          content: data.msg,
                          duration: 2
                      });
                    }
                }
                self.loginForm.password = '';
                self.refreshCode();
            }) .catch(function (error ,config, code, request, response) {
                self.refreshCode();
                self.loginForm.password = '';
                self.$Message.error({
                    content: '用户名或密码错误，请重新输入！',
                    duration: 3
                });
            });
          }
        });
      }
    }
  };
</script>

