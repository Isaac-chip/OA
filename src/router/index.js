import Vue from 'vue'
import Router from 'vue-router'
import PartyIn from '@/components/PartyIn'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'PartyIn',
      component: PartyIn
    }
  ]
})
