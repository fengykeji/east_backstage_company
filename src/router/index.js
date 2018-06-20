import Vue from 'vue'
import Router from 'vue-router'
import Container from '@/page/Container'
import Login from '@/page/Login'
import Project from '@/page/Project'
import AddProject from '@/page/Project/AddProject'
import ReCreateProject from '@/page/Project/AddProject/reCreate'
import RequestRefund from '@/page/Project/RequestRefund'
import PayRecord from '@/page/Project/PayRecord'
import RefundInfo from '@/page/Project/RefundInfo'
import Agent from '@/page/Agent'
import Commission from '@/page/Commission'
import Distri_commission from '@/page/Distri_commission'
import Distribution from '@/page/Distribution'
import FastDistribution from '@/page/Distribution/FastDistribution'
import AddPerson from '@/page/Distribution/AddPerson'
import ChoicePeople from '@/page/Distribution/ChoicePeople'
import StartApply from '@/page/Distribution/StartApply'
import ProjectInfo from '@/page/Distribution/ProjectInfo'
import ExaminePeople from '@/page/Agent/ExaminePeople'
import QuitPeople from '@/page/Agent/QuitPeople'


Vue.use(Router);

export default new Router({
  base: '/admin/conpany/admin_conpany_show',
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/project',
      component: Container,
      children:[
        {
          path:'',
          name:'project',
          component:Project,
        },
        {
          path: '/addProject',
          name: 'addProject',
          component: AddProject
        },
        {
          path: '/reCreateProject',
          name: 'reCreateProject',
          component: ReCreateProject
        },
        {
          path: '/requestRefund',
          name: 'requestRefund',
          component: RequestRefund
        },
        {
          path: '/payRecord',
          name: 'payRecord',
          component: PayRecord
        },
        {
          path: '/refundInfo',
          name: 'refundInfo',
          component: RefundInfo
        }
      ]
    },
    {
      path: '/agent',
      component: Container,
      children:[
        {
          path:'',
          name:'agent',
          component:Agent,
        },
        {
          path:'/examinePeople',
          name:'examinePeople',
          component:ExaminePeople,
        },
        {
          path:'/quitPeople',
          name:'quitPeople',
          component:QuitPeople,
        },
      ]
    },
    {
      path: '/commission',
      component: Container,
      children:[
        {
          path:'',
          name:'commission',
          component:Commission,
        }
      ]
    },
    {
      path: '/distri_commission',
      component: Container,
      children:[
        {
          path:'',
          name:'distri_commission',
          component:Distri_commission,
        }
      ]
    },
    {
      path: '/distribution',
      component: Container,
      children:[
        {
          path:'',
          name:'distribution',
          component:Distribution,
        },
        {
          path:'/fastDistribution',
          name:'fastDistribution',
          component:FastDistribution,
        },
        {
          path:'/addPerson',
          name:'addPerson',
          component:AddPerson,
        },
        {
          path:'/choicePeople',
          name:'choicePeople',
          component:ChoicePeople,
        },
        {
          path:'/startApply',
          name:'startApply',
          component:StartApply,
        },
        {
          path:'/projectInfo',
          name:'projectInfo',
          component:ProjectInfo,
        }

        
      ]
    },
  ]
})
