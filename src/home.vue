<template>
  <div id="home" >
    <layout class="layout-view">
      <!-- 头部布局 -->
      <Header  class="wrapper-header">
        <div class="wrapper-header-nav-logo">
          <!-- <img src="./assets/logo.png"> -->
          <span>合浦党建E网通</span>

        </div>
        <!-- <div class="apps">
          <Dropdown  trigger="click" >
            <a href="javascript:void(0)">
              <img src="https://file.iviewui.com/icon/application.png" class="apps-menu">
              <i class="apps-arrow ivu-icon ivu-icon-ios-arrow-down"></i>
            </a>
            <DropdownMenu slot="list">
              <div class="quickAccess">
                <div class="headerTitle">快捷入口</div>
                <div class="content">
                  <div class="item">
                    <a href="#">
                      <i class="party-info"></i>
                      <div class="title">党务信息</div>
                    </a>
                  </div>
                  <div class="item">aaa</div>
                  <div class="item">aaa</div>
                  <div class="item">aaa</div>
                  <div class="item">aaa</div>
                  <div class="item">aaa</div>
                  <div class="item">aaa</div>
                  <div class="item">aaa</div>
                  <div class="item">aaa</div>
                  <div class="item">aaa</div>
                  <div class="item">aaa</div>
                  <div class="item">aaa</div>
                </div>
              </div>
            </DropdownMenu>
          </Dropdown>
        </div> -->
       <div class="wrapper-header-nav-search">
           <Select
                prefix="ios-search"
                filterable
                remote
                clearable
                :remote-method="seachMenuByQuery"
                @on-change="menuChange"
                placeholder="输入菜单名称查找">
                <Option v-for="(item, index) in searchList" :disabled="item.menuUrl == '#'" :value="item.menuUrl" :key="index">{{item.menuName}}</Option>
            </Select>
        </div>
        <div class="wrapper-header-nav-list ">
          <div class="info-menu-sign-in">
            <span class="ivu-avatar ivu-avatar-circle ivu-avatar-default ivu-avatar-icon">
              <i class="ivu-icon ivu-icon-ios-person"></i>
            </span> 
            <Dropdown @on-click="logout">
                <a href="javascript:void(0)" >
                  {{nickName}}
                </a>
                <DropdownMenu slot="list">
                    <DropdownItem>退出登录</DropdownItem>
                </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </Header>
      <Layout class="wrapper-container">
        <Sider hide-trigger :style="{background: '#fff',height:'100%'}">
          <Menu active-name="home" theme="primary" width="auto" ref="homeMenu">
            <MenuItem name="home" to="/home">
              <Icon type="md-chatbubbles" />
              首页
            </MenuItem>
            <Submenu v-for="menu in menuList" :key="menu.menuName" :name="menu.menuName">
                  <template slot="title">
                    <Icon v-if="menu.menuIcon != null || menu.menuIcon !='' " :type="menu.menuIcon"></Icon>
                    {{menu.menuName}}
                  </template>

                      <div v-for="subItem in menu.children" :key="subItem.menuName">
                          <Submenu v-if="subItem.children.length > 0" :key="subItem.menuName" :name="subItem.menuName" :to="subItem.menuUrl">
                              <template slot="title">
                              <Icon v-if="subItem.menuIcon != null || subItem.menuIcon !='' " :type="subItem.menuIcon"></Icon>
                              {{subItem.menuName}}
                              </template>
                              <MenuItem v-for="item in subItem.children" :key="item.menuName" :name="item.menuName" :to="item.menuUrl">
                              <Icon v-if="item.menuIcon != null || item.menuIcon !='' " :type="item.menuIcon"></Icon>
                              {{item.menuName}}
                            </MenuItem>
                          </Submenu>
                           <MenuItem v-else :key="subItem.menuName" :name="subItem.menuName" :to="subItem.menuUrl">
                            <Icon v-if="subItem.menuIcon != null || subItem.menuIcon !='' " :type="subItem.menuIcon"></Icon>
                            {{subItem.menuName}}
                        </MenuItem>
                      </div>
            </Submenu>
          </Menu>
        </Sider>
        <Layout >
          <Content class="router-view-content">
            <router-view />
          </Content>
        </Layout>
      </Layout>
    </layout>

  </div>
</template>

<script>
  export default {
    name:"home",
    data(){
      return {
        menuHtml:'',
        nickName:'',
        searchList:[],
        menuList:[]
      }
    },
    created:function(){
        this.nickName = this.$constants.userInfo.name;
    },
    watch: {
      $route: {
        handler: function(val, oldVal){
          
        },
        // 深度观察监听
        deep: true
      }
    },
    created:function(){
       var userInfo =window.localStorage.getItem('userInfo');
        if(userInfo !=null && userInfo!=''){
          this.$constants.userInfo = JSON.parse(userInfo);
          this.$constants.access_token = JSON.parse(userInfo).access_token;
        }
    },
    methods:{
      loadMenus:function(){
          var self = this;
          self.$http({
              url:self.$constants.BIURL+'/menu/byUserMenuList',
              method:'GET',
              dataType:'json',
              params:{
                  userId:self.$constants.userInfo.userId
              }
          })
          .then(function (response) {
              if(response.data.code == 0){
                  var data = response.data;
                  self.menuList = data.data;
              }
          })
      },
      seachMenuByQuery:function(value){
        var self = this;
          self.$http({
              url:self.$constants.BIURL+'/menu/byUserMenuList',
              method:'GET',
              dataType:'json',
              params:{
                  query:value,
                  userId:self.$constants.userInfo.userId
              }
          })
          .then(function (response) {
              if(response.data.code == 0){
                  var data = response.data;
                  self.searchList = data.data;
                  console.log(data);
              }
          })
      },
      menuChange:function(value){
        if(value !='' && value !=null){
           this.$router.push({
            'path': value
          })
        }
      },
      logout:function(){
        const self = this;
         this.$Modal.confirm({
              title:'系统提示',
              content:'确定退出当前登录吗?',
              okText:'确定',
              cancelText:'取消',
              onOk:function(){
                //清空token
                  window.localStorage.setItem('userInfo', {});
                  self.$constants.access_token = '';
                  self.$router.push({
                    path:'/'
                  });
                  //self.handleLogOut();
              }
          });
      },
      handleLogOut:function(){
        var self = this;
        this.$http({
          url:self.$constants.BASEPATH+'/auth/logout',
          method:'DElETE',
        }).then(function(response){
            var data = response.data;
            if(data.code == 0){
                self.$router.push({
                  path:'/'
                });
            }else{
              self.$message.error(data.msg);
            }
        });
      }
    },
    mounted:function(){
      this.loadMenus();
    }
  }
</script>

<style>
  #home {
    width: 100%;
    height: 100%;
    overflow: auto;
  }

  .quickAccess{
    width: 630px;
    height: 300px;
    max-width: 630px;
    max-height: 395px;
  }

  .quickAccess .headerTitle{
    width: 100%;
    height: 44px;
    line-height: 44px;
    text-align: left;
    margin-left: 20px;
    font-weight: 700;
  }
  .quickAccess .headerTitle:after{
    content: "";
    display: block;
    width: 4px;
    height: 24px;
    background: #2d8cf0;
    position: absolute;
    top: 16px;
    left: 0;
    margin-left: 8px;
    z-index: 111111;
  }

  .quickAccess .content{
    position: relative;
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
  }

  .quickAccess .content .item{
    position: relative;
    width: 12.5%;
    text-align: center;
  }

  .quickAccess .content .item a{
    width: 100%;
    text-align: center;
    margin: 0 auto;
  }

  .quickAccess .content .item a .title{
    color: #666;
  }
</style>