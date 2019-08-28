import Vue from 'vue'
import Router from 'vue-router'


import Login from '@/login';
import Home from '@/home';

import PartyIn from '@/components/partyIn/PartyIn'
import PartyInTable from '@/components/partyIn/partyInTable'

import PartyAm from '@/components/partyAm/partyAm'
import PartyAmList from "@/components/partyAm/PartyAmList"
import PartySpecialResult from "@/components/partyAm/partySpecialResult"
import PartySpecialResultDetail from "@/components/partyAm/partySpecialResultDetail";
import Menu from "@/components/system/menu"
import Role from "@/components/system/role"
import User from "@/components/system/user"
import Department from "@/components/system/department"
import PartyUser from "@/components/system/partyUser"
import PartyUserTable from "@/components/system/partyUserTable"
import ApkEdition from "@/components/system/ApkEdition"
import SysLogs from "@/components/system/sysLogs"
import MailInfo from "@/components/system/mailInfo"
import Volunteer from "@/components/partyService/volunteer"

/**党讯管理 */
import Catalog from '@/components/partyNews/catalog'
import NewsContent from '@/components/partyNews/newsContent'

/**村社区管理 */
import Village from '@/components/builder/poorVillage'
import TeamMember from '@/components/builder/teamMember'
import TeamMemberLogs from '@/components/builder/teamMemberLogs'
import LeaderMember from '@/components/builder/leaderMember'
import LeaderMemberLogs from '@/components/builder/leaderMemberLogs'
import FirstSecretary from '@/components/builder/firstSecretary'
import FirstSecretaryLogs from '@/components/builder/firstSecretaryLogs'
import DoubleSign from '@/components/builder/doubleSign'

/**学习教育 */
import ExamSubjectType from '@/components/exam/examSubjectType'
import ExamSubject from '@/components/exam/examSubject'
import ExamQuestion from '@/components/exam/examQuestion'
import CourseContent from '@/components/exam/courseContent'
import StudyCatalog from '@/components/exam/studyCatalog'
import StudyContent from '@/components/exam/studyContent'

Vue.use(Router)

export default
new Router({
  base: '/',
  mode: 'hash',
  routes: [{
      path:'/',
      name:'login',
      component:Login
    },{
      path:'/home',
      name:'home',
      component:Home,
      children:[
        {
          path: '/partyIn',
          name: 'partyIn',
          component: PartyIn
        },{
          path:'/partyIn/partyInTable',
          name:'partyInTable',
          component:PartyInTable
        },{
          path: '/partyAm/partyAm',
          name: 'partyAm',
          component: PartyAm
        },{
          path: '/partyAm/partyAmList',
          name: 'partyAmList',
          component: PartyAmList
        },{
          path: '/partyAm/partySpecialResult',
          name: 'PartySpecialResult',
          component: PartySpecialResult
        },{
          path: '/partyAm/partySpecialResultDetail',
          name: 'partySpecialResultDetail',
          component: PartySpecialResultDetail
        },{
          path: '/system/menu',
          name: 'menu',
          component: Menu
        },{
          path: '/exam/examSubjectType',
          name: 'examSubjectType',
          component: ExamSubjectType
        },{
          path: '/exam/examSubject',
          name: 'examSubject',
          component: ExamSubject
        },{
          path: '/exam/examQuestion',
          name: 'examQuestion',
          component: ExamQuestion
        },{
          path: '/exam/courseContent',
          name: 'courseContent',
          component: CourseContent
        },{
          path: '/exam/studyCatalog',
          name: 'studyCatalog',
          component: StudyCatalog
        },{
          path: '/exam/studyContent',
          name: 'studyContent',
          component: StudyContent
        },{
          path: '/system/role',
          name: 'role',
          component: Role
        },{
          path: '/system/user',
          name: 'user',
          component: User
        },{
          path: '/system/dept',
          name: 'dept',
          component: Department
        },{
          path: '/system/apkEdition',
          name: 'apkEdition',
          component: ApkEdition
        },{
          path: '/system/sysLogs',
          name: 'sysLogs',
          component: SysLogs
        },{
          path: '/system/mailInfo',
          name: 'mailInfo',
          component: MailInfo
        },{
          path: '/system/partyUser',
          name: 'partyUser',
          component: PartyUser
        },{
          path: '/system/partyUserTable',
          name: 'partyUserTable',
          component: PartyUserTable
        },{
          path: '/partyService/volunteer',
          name: 'volunteer',
          component: Volunteer
        },{
          path:'/partyNews/catalog',
          name:'catalog',
          component:Catalog
        },{
          path:'/partyNews/newsContent',
          name:'newsContent',
          component:NewsContent
        },{
          path:'/builder/poorVillage',
          name:'poorVillage',
          component:Village
        },{
          path:'/builder/teamMember',
          name:'teamMember',
          component:TeamMember
        },{
          path:'/builder/leaderMember',
          name:'leaderMember',
          component:LeaderMember
        },{
          path:'/builder/firstSecretary',
          name:'firstSecretary',
          component:FirstSecretary
        },{
          path:'/builder/teamMemberLogs',
          name:'teamMemberLogs',
          component:TeamMemberLogs
        },{
          path:'/builder/leaderMemberLogs',
          name:'leaderMemberLogs',
          component:LeaderMemberLogs
        },{
          path:'/builder/firstSecretaryLogs',
          name:'firstSecretaryLogs',
          component:FirstSecretaryLogs
        },{
          path:'/builder/doubleSign',
          name:'doubleSign',
          component:DoubleSign
        }
      ]
    }
  ]
})
