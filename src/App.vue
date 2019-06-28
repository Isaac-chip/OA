<template>
  <div id="app" >
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
                <Menu active-name="home" theme="primary" width="auto" :open-names="['1']">
                  <MenuItem name="home">
                    <Icon type="md-chatbubbles" />
                    首页
                 </MenuItem>
                    <Submenu name="1">
                        <template slot="title">
                            <Icon type="ios-navigate"></Icon>
                            党务信息
                        </template>
                        <MenuItem name="1-1" to="/system/dept">党组织管理</MenuItem>
                        <MenuItem name="1-2">党员管理</MenuItem>
                    </Submenu>
                    <Submenu name="2">
                        <template slot="title">
                            <Icon type="ios-keypad"></Icon>
                            党建业务
                        </template>
                        <MenuItem name="2-1" >
                          <Icon type="ios-apps"></Icon>
                          党员发展
                        </MenuItem>
                        <MenuItem name="2-2">党委(支部)栏目</MenuItem>
                        <MenuItem name="2-2">党委(支部)信息</MenuItem>
                        <Submenu name="2-3">
                              <template slot="title">
                                  <Icon type="ios-bookmark"></Icon>
                                  阵地建设
                              </template>
                             <MenuItem name="2-3-1">村(社区)</MenuItem>
                             <MenuItem name="2-3-2">机关</MenuItem>
                             <MenuItem name="2-3-3">国企</MenuItem>
                        </Submenu>
                        <Submenu name="2-4">
                            <template slot="title">
                                <Icon type="ios-bookmark"></Icon>
                                党务公开
                            </template>
                            <MenuItem name="2-4-1">村(社区)</MenuItem>
                            <MenuItem name="2-4-2">机关(国企)</MenuItem>
                        </Submenu>
                    </Submenu>
                     <Submenu name="3">
                            <template slot="title">
                              <Icon type="ios-star-outline"></Icon>
                              积分管理
                            </template>
                            <MenuItem name="4-10-1">积分规则</MenuItem>
                            <MenuItem name="4-10-1">党组织积分管理</MenuItem>
                            <MenuItem name="4-10-1">党员积分管理</MenuItem>
                    </Submenu>
                    <Submenu name="4">
                        <template slot="title">
                            <Icon type="ios-bookmark"></Icon>
                            党讯管理
                        </template>
                        <MenuItem name="3-1">栏目管理</MenuItem>
                        <MenuItem name="3-2">内容发布</MenuItem>
                    </Submenu>

                    <Submenu name="5">
                        <template slot="title">
                            <Icon type="ios-analytics"></Icon>
                            党群服务
                        </template>
                        <MenuItem name="5-1">志愿服务</MenuItem>
                        <MenuItem name="5-2">党费缴纳</MenuItem>
                        <MenuItem name="5-3">互动交流</MenuItem>
                        <MenuItem name="5-4">党群心声</MenuItem>
                        <MenuItem name="5-5">办事指南</MenuItem>
                        <MenuItem name="5-6">日常生活指南</MenuItem>
                    </Submenu>

                    <Submenu name="study">
                      <template slot="title">
                            <Icon type="ios-analytics"></Icon>
                            学习教育
                        </template>
                      <MenuItem name="study-1">专题学习</MenuItem>
                      <MenuItem name="study-2">每日一学</MenuItem>
                      <Submenu name="study-3">
                            <template slot="title">
                                <Icon type="ios-podium"></Icon>
                                知识竞赛
                            </template>
                            <MenuItem name="study-3-1">试卷管理</MenuItem>
                            <MenuItem name="study-3-2">试题管理</MenuItem>
                            <MenuItem name="study-3-2">考试统计</MenuItem>
                        </Submenu>
                    </Submenu>

                    <Submenu name="6">
                        <template slot="title">
                            <Icon type="ios-podium"></Icon>
                            党建考核
                        </template>
                        <MenuItem name="6-1" to="/partyAm/partyAm">专项考核项</MenuItem>
                        <MenuItem name="6-2" to="/partyAm/partyAmList">考核清单明细</MenuItem>
                        <MenuItem name="6-3" to="/partyAm/partySpecialResult">专项考核</MenuItem>
                        <MenuItem name="6-4">三会一课考核</MenuItem>
                        <MenuItem name="6-5">一把手考核</MenuItem>
                    </Submenu>
                    <Submenu name="7">
                        <template slot="title">
                            <Icon type="ios-podium"></Icon>
                            村社区管理
                        </template>
                        <MenuItem name="7-1">村社区基本信息</MenuItem>
                        <Submenu name="7-2">
                            <template slot="title">
                                <Icon type="ios-podium"></Icon>
                                驻村队员
                            </template>
                            <MenuItem name="7-2-1">基本信息</MenuItem>
                            <MenuItem name="7-2-2">工作队员日志</MenuItem>
                        </Submenu>
                        <Submenu name="7-3">
                            <template slot="title">
                                <Icon type="ios-podium"></Icon>
                                第一书记
                            </template>
                            <MenuItem name="7-3-1">基本信息</MenuItem>
                            <MenuItem name="7-3-2">双签到</MenuItem>
                            <MenuItem name="7-3-3">微动态</MenuItem>
                        </Submenu>
                        <Submenu name="7-4">
                            <template slot="title">
                                <Icon type="ios-podium"></Icon>
                                驻村干部
                            </template>
                            <MenuItem name="7-4-1">村干部信息</MenuItem>
                            <MenuItem name="7-4-2">工作日志</MenuItem>
                        </Submenu>
                        <MenuItem name="7-5">四议两公开管理</MenuItem>
                        <MenuItem name="7-6">“三员九有”管理</MenuItem>
                        <MenuItem name="7-6">服务群众专项经费审批</MenuItem>
                    </Submenu>
                    <Submenu name="8">
                        <template slot="title">
                            <Icon type="ios-podium"></Icon>
                            日常工作
                        </template>
                        <MenuItem name="8-1">日志管理</MenuItem>
                        <MenuItem name="8-2">考勤管理</MenuItem>
                        <MenuItem name="8-3">会议通知</MenuItem>
                    </Submenu>
                    <Submenu name="9">
                        <template slot="title">
                            <Icon type="ios-podium"></Icon>
                            乡村振兴
                        </template>
                        <MenuItem name="9-1">村集体经济地图</MenuItem>
                        <MenuItem name="9-2">村集体项目</MenuItem>
                    </Submenu>
                    <Submenu name="10">
                        <template slot="title">
                            <Icon type="ios-podium"></Icon>
                            党建资料库
                        </template>
                        <MenuItem name="10-1">资料库管理</MenuItem>
                    </Submenu>
                    <Submenu name="11">
                        <template slot="title">
                            <Icon type="ios-podium"></Icon>
                           标准化台账
                        </template>
                        <MenuItem name="11-1">党建阵地</MenuItem>
                        <MenuItem name="11-2">发展党员</MenuItem>
                        <MenuItem name="11-3">三会一课</MenuItem>
                        <MenuItem name="11-4">四议两公开</MenuItem>
                        <MenuItem name="11-5">党务公开</MenuItem>
                        <MenuItem name="11-6">三员九有</MenuItem>
                        <MenuItem name="11-7">党群服务专项经费</MenuItem>
                        <MenuItem name="11-8">村(社区)干部</MenuItem>
                        <MenuItem name="11-9">驻村干部</MenuItem>
                        <MenuItem name="11-10">党组织及党员积分</MenuItem>
                    </Submenu>
                    <Submenu name="12">
                        <template slot="title">
                            <Icon type="ios-settings"></Icon>
                            系统管理
                        </template>
                        <MenuItem name="12-1">数据字段</MenuItem>
                        <MenuItem name="12-2" to="/system/menu">菜单管理</MenuItem>
                        <MenuItem name="12-3" to="/system/role">角色管理</MenuItem>
                        <MenuItem name="12-4" to="/system/user">账号管理</MenuItem>
                        <MenuItem name="12-5">系统日志</MenuItem>
                        <MenuItem name="12-5">邮箱管理</MenuItem>
                        <MenuItem name="12-5">app版本管理</MenuItem>
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
export default {
    name:"app",
    data(){
      return {

      }
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
  overflow: hidden;
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
