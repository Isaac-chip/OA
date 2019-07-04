import Vue from 'vue'
import Router from 'vue-router'
import PartyIn from '@/components/PartyIn'
import PartyAm from '@/components/partyAm/partyAm'
import PartyAmList from '@/components/partyAm/PartyAmList'
import PartySpecialResult from '@/components/partyAm/partySpecialResult'
import PartySpecialResultDetail from '@/components/partyAm/partySpecialResultDetail'
import Menu from '@/components/system/menu'
import Role from '@/components/system/role'
import User from '@/components/system/user'
import Department from '@/components/system/department'
import ColumnManage from '../components/partyManage/columnManage'
import ContentPublish from '../components/partyManage/contentPublish'
import ApplicationForParty from '../components/partyDevelopment/applicationForParty'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'PartyIn',
      component: PartyIn
    }, {
      path: '/partyAm/partyAm',
      name: 'partyAm',
      component: PartyAm
    }, {
      path: '/partyAm/partyAmList',
      name: 'partyAmList',
      component: PartyAmList
    }, {
      path: '/partyAm/partySpecialResult',
      name: 'PartySpecialResult',
      component: PartySpecialResult
    }, {
      path: '/partyAm/partySpecialResultDetail',
      name: 'partySpecialResultDetail',
      component: PartySpecialResultDetail
    }, {
      path: '/system/menu',
      name: 'menu',
      component: Menu
    }, {
      path: '/system/role',
      name: 'role',
      component: Role
    }, {
      path: '/system/user',
      name: 'user',
      component: User
    }, {
      path: '/system/dept',
      name: 'dept',
      component: Department
    },{
      path:'/partyManage/columnManage',
      name:'columnManage',
      component:ColumnManage
    },{
      path:'/partyManage/contentPublish',
      name:'contentPublish',
      component:ContentPublish
    },{
      path:'/partyDevelopment/applicationForParty',
      name:'applicationForParty',
      component:ApplicationForParty
    }
  ]
})
