<template>
  <div id="home" >
    <layout class="layout-view">
      <!-- 头部布局 -->
      <Header  class="wrapper-header">
        <div class="wrapper-header-nav-logo">
          <!-- <img src="./assets/logo.png"> -->
          <span>合浦党建E网通</span>

        </div>
        <div class="apps">
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
        </div>
        <div class="wrapper-header-nav-search">
          <Input suffix="ios-search" placeholder="输入内容查找" style="width: auto;border:none" class="mysearch" />
        </div>
        <div class="wrapper-header-nav-list ">
          <div class="info-menu-sign-in"><span class="ivu-avatar ivu-avatar-circle ivu-avatar-default ivu-avatar-icon"><i class="ivu-icon ivu-icon-ios-person"></i></span> <button type="button" class="ivu-btn ivu-btn-text ivu-btn-large"><!----> <!----> <span>登录</span></button></div>
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
            <router-view/>
          </Content>
        </Layout>
      </Layout>
    </layout>

  </div>
</template>

<script>
import DashBorad from "@/components/home/dashboard";
  export default {
    name:"home",
    components:{
      DashBorad
    },
    data(){
      return {
        menuHtml:'',
        menuList:[]
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
              if(response.status ==200){
                  var data = response.data;
                  self.menuList = data.data;
<<<<<<< HEAD
                  console.log(self.menuList)
=======
>>>>>>> 577c7218d7429de0221ce89404b2a069c24c880c
              }
          })
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
