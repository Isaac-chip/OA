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
                <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']">
                  <MenuItem name="home">
                    <Icon type="md-chatbubbles" />
                    首页
                 </MenuItem>
                    <Submenu name="1">
                        <template slot="title">
                            <Icon type="ios-navigate"></Icon>
                            党务信息
                        </template>
                        <MenuItem name="1-1">党组织管理</MenuItem>
                        <MenuItem name="1-2">党员管理</MenuItem>
                    </Submenu>
                    <Submenu name="2">
                        <template slot="title">
                            <Icon type="ios-keypad"></Icon>
                            党讯管理
                        </template>
                        <MenuItem name="2-1" >党讯栏目</MenuItem>
                        <MenuItem name="2-2">内容发布</MenuItem>
                        <MenuItem name="2-3">会议通知</MenuItem>
                        <MenuItem name="2-4">志愿服务</MenuItem>
                        <MenuItem name="2-5">党建论坛</MenuItem>
                    </Submenu>
                    <Submenu name="3">
                        <template slot="title">
                            <Icon type="ios-bookmark"></Icon>
                            考核管理
                        </template>
                        <MenuItem name="3-1">专项考核项</MenuItem>
                        <MenuItem name="3-2">专项考核清单</MenuItem>
                        <MenuItem name="3-3">专项考核明细</MenuItem>
                        <MenuItem name="3-4">专项考核统计</MenuItem>
                    </Submenu>

                    <Submenu name="4">
                        <template slot="title">
                            <Icon type="ios-analytics"></Icon>
                            党建标准化
                        </template>
                         <Submenu name="4-1">
                            <template slot="title">
                              <Icon type="ios-apps"></Icon>
                              党员发展
                              </template>
                            <MenuItem name="4-1-1">入党申请</MenuItem>
                            <MenuItem name="4-2-2">学习文件</MenuItem>
                            <MenuItem name="4-2-2">纪实系统</MenuItem>
                        </Submenu>
                        <Submenu name="4-2">
                            <template slot="title">
                              <Icon type="ios-bonfire"></Icon>
                              三会一课
                            </template>
                            <MenuItem name="4-1-1">新增考核项</MenuItem>
                            <MenuItem name="4-2-2">考核清单</MenuItem>
                            <MenuItem name="4-2-2">明细汇总</MenuItem>
                            <MenuItem name="4-2-2">考核统计</MenuItem>
                        </Submenu>
                        <Submenu name="4-3">
                            <template slot="title">
                              <Icon type="ios-filing"></Icon>
                              四议两公开
                            </template>
                            <MenuItem name="4-3-1">项目申报</MenuItem>
                            <MenuItem name="4-3-2">项目审核</MenuItem>
                            <MenuItem name="4-3-3">统计汇总</MenuItem>
                        </Submenu>
                        <Submenu name="4-4">
                            <template slot="title">
                              <Icon type="ios-megaphone"></Icon>
                              党务公开
                            </template>
                            <MenuItem name="4-5-1">村(社区)</MenuItem>
                            <MenuItem name="4-5-2">机关(国企)</MenuItem>
                        </Submenu>
                        <Submenu name="4-5">
                            <template slot="title">
                              <Icon type="ios-hammer"></Icon>
                              党建阵地
                            </template>
                            <MenuItem name="4-5-1">村(社区)</MenuItem>
                            <MenuItem name="4-5-2">机关</MenuItem>
                            <MenuItem name="4-5-3">国企</MenuItem>
                        </Submenu>
                        <Submenu name="4-6">
                            <template slot="title">
                              <Icon type="ios-people"></Icon>
                              三员九有
                            </template>
                            <MenuItem name="4-6-1">"三员"信息</MenuItem>
                            <MenuItem name="4-6-2">"三员"工作成效</MenuItem>
                            <MenuItem name="4-6-3">"九有"建设成效</MenuItem>
                            <MenuItem name="4-6-4">"九有"相关文件</MenuItem>
                        </Submenu>
                        <Submenu name="4-7">
                            <template slot="title">
                              <Icon type="ios-link"></Icon>
                              专项经费
                            </template>
                            <MenuItem name="4-7-1">经费申请</MenuItem>
                            <MenuItem name="4-7-2">经费明细</MenuItem>
                        </Submenu>
                        <Submenu name="4-8">
                            <template slot="title">
                              <Icon type="ios-subway"></Icon>
                              村(社区)建设
                            </template>
                            <MenuItem name="4-8-1">干部信息</MenuItem>
                            <MenuItem name="4-8-2">考勤系统</MenuItem>
                            <MenuItem name="4-8-3">工作日志</MenuItem>
                        </Submenu>
                        <Submenu name="4-9">
                            <template slot="title">
                              <Icon type="ios-person"></Icon>
                              第一书记
                            </template>
                            <MenuItem name="4-9-1">工作队员</MenuItem>
                            <MenuItem name="4-9-2">微动态</MenuItem>
                        </Submenu>
                         <Submenu name="4-10">
                            <template slot="title">
                              <Icon type="ios-star-outline"></Icon>
                              积分管理
                            </template>
                            <MenuItem name="4-10-1">积分管理</MenuItem>
                        </Submenu>
                    </Submenu>

                     <Submenu name="5">
                        <template slot="title">
                            <Icon type="ios-school"></Icon>
                            知识竞赛
                        </template>
                        <MenuItem name="5-1">试卷管理</MenuItem>
                        <MenuItem name="5-2">考试管理</MenuItem>
                        <MenuItem name="5-3">考试统计</MenuItem>
                    </Submenu>
                    <Submenu name="6">
                        <template slot="title">
                            <Icon type="ios-podium"></Icon>
                            统计报表
                        </template>
                        <MenuItem name="6-1">活跃度统计</MenuItem>
                        <MenuItem name="6-2">党支部排名统计</MenuItem>
                        <MenuItem name="6-3">开展活动统计</MenuItem>
                    </Submenu>
                    <Submenu name="7">
                        <template slot="title">
                            <Icon type="ios-settings"></Icon>
                            系统管理
                        </template>
                        <MenuItem name="7-1">数据字段</MenuItem>
                        <MenuItem name="7-2">菜单管理</MenuItem>
                        <MenuItem name="7-3">角色管理</MenuItem>
                        <MenuItem name="7-4">账号管理</MenuItem>
                        <MenuItem name="7-5">系统日志</MenuItem>
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
  name: 'App'
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
