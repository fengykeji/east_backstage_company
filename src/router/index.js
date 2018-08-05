import Vue from 'vue'
import Router from 'vue-router'
import Container from '@/page/Container'
import Login from '@/page/Login'
import Project from '@/page/Project'
import PeopleProject from '@/page/peopleProject'
import PeopleFastDistribution from '@/page/peopleProject/PeopleFastDistribution'
import PeopleAddPerson from '@/page/peopleProject/PeopleAddPerson'
import PeopleChoicePeople from '@/page/peopleProject/PeopleChoicePeople'
import PeopleProjectInfo from '@/page/peopleProject/PeopleProjectInfo'
import PeopleRuleOfMaid from '@/page/peopleProject/PeopleRuleOfMaid'
import AddProject from '@/page/Project/AddProject'
import ReCreateProject from '@/page/Project/AddProject/reCreate'
import RequestRefund from '@/page/Project/RequestRefund'
import PayRecord from '@/page/Project/PayRecord'
import RefundInfo from '@/page/Project/RefundInfo'
import TwoHouse from '@/page/Project/TwoHouse'



import Agent from '@/page/Agent'
import Commission from '@/page/Commission'
import CompanyPrice from '@/page/Commission/CompanyPrice'
import PersonPrice from '@/page/Commission/PersonPrice'
import CompanyPriceInfo from '@/page/Commission/CompanyPriceInfo'
import Distri_commission from '@/page/Distri_commission'
import MaidInfo from '@/page/Distri_commission/MaidInfo'
import CommissionApply from '@/page/Distri_commission/CommissionApply'
import UpdateCommission from '@/page/Distri_commission/UpdateCommission'
import RequestPayment from '@/page/Distri_commission/RequestPayment'
import Distribution from '@/page/Distribution'
import RuleOfMaid from '@/page/Distribution/RuleOfMaid'
import RuleSetting from '@/page/Distribution/RuleSetting'
import FastDistribution from '@/page/Distribution/FastDistribution'
import AddPerson from '@/page/Distribution/AddPerson'
import ChoicePeople from '@/page/Distribution/ChoicePeople'
import StartApply from '@/page/Distribution/StartApply'
import ProjectInfo from '@/page/Distribution/ProjectInfo'
import ExaminePeople from '@/page/Agent/ExaminePeople'
import QuitPeople from '@/page/Agent/QuitPeople'


import StoreAuthorization from '@/page/StoreAuthorization'
import SeeInfo from '@/page/StoreAuthorization/SeeInfo'
import Test from '@/page/Test'



Vue.use(Router);

export default new Router({
  base: '/admin/company/',
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    },
    {
      path: '/project',
      component: Container,
      children: [
        {
          path: '',
          name: 'project',
          component: Project,
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
        },
        {
          path: '/twoHouse',
          name: 'twoHouse',
          component: TwoHouse
        }



        
      ]
    },
    {
      path: '/peopleProject',
      component: Container,
      children: [
        {
          path: '',
          name: 'peopleProject',
          component: PeopleProject,
        },
        {
          path: '/peopleFastDistribution',
          name: 'peopleFastDistribution',
          component: PeopleFastDistribution,
        },
        {
          path: '/peopleAddPerson',
          name: 'peopleAddPerson',
          component: PeopleAddPerson,
        },
        {
          path: '/peopleChoicePeople',
          name: 'peopleChoicePeople',
          component: PeopleChoicePeople,
        },

        {
          path: '/peopleProjectInfo',
          name: 'peopleProjectInfo',
          component: PeopleProjectInfo,
        },
        {
          path: '/peopleRuleOfMaid',
          name: 'peopleRuleOfMaid',
          component: PeopleRuleOfMaid,
        },

      ]
    },
    {
      path: '/agent',
      component: Container,
      children: [
        {
          path: '',
          name: 'agent',
          component: Agent,
        },
        {
          path: '/examinePeople',
          name: 'examinePeople',
          component: ExaminePeople,
        },
        {
          path: '/quitPeople',
          name: 'quitPeople',
          component: QuitPeople,
        },
      ]
    },
    {
      path: '/commission',
      component: Container,
      children: [
        {
          path: '',
          name: 'commission',
          component: Commission,
        },
        {
          path: 'companyPrice',
          name: 'companyPrice',
          component: CompanyPrice,
        },
        {
          path: 'personPrice',
          name: 'personPrice',
          component: PersonPrice,
        }, {
          path: 'companyPriceInfo',
          name: 'companyPriceInfo',
          component: CompanyPriceInfo,
        },
      ]
    },
    {
      path: '/distri_commission',
      component: Container,
      children: [
        {
          path: '',
          name: 'distri_commission',
          component: Distri_commission,
        },
        {
          path: 'maidInfo',
          name: 'maidInfo',
          component: MaidInfo,
        },
        {
          path: 'commissionApply',
          name: 'commissionApply',
          component: CommissionApply,
        },
        {
          path: 'updateCommission',
          name: 'updateCommission',
          component: UpdateCommission,
        },
        {
          path: 'requestPayment',
          name: 'requestPayment',
          component: RequestPayment,
        },


      ]
    },
    {
      path: '/distribution',
      component: Container,
      children: [
        {
          path: '',
          name: 'distribution',
          component: Distribution,
        },
        {
          path: '/fastDistribution',
          name: 'fastDistribution',
          component: FastDistribution,
        },
        {
          path: '/addPerson',
          name: 'addPerson',
          component: AddPerson,
        },
        {
          path: '/choicePeople',
          name: 'choicePeople',
          component: ChoicePeople,
        },
        {
          path: '/startApply',
          name: 'startApply',
          component: StartApply,
        },
        {
          path: '/projectInfo',
          name: 'projectInfo',
          component: ProjectInfo,
        }, {
          path: '/ruleOfMaid',
          name: 'ruleOfMaid',
          component: RuleOfMaid,
        },
        {
          path: '/ruleSetting',
          name: 'ruleSetting',
          component: RuleSetting,
        }

      ]
    },
    {
      path: '/storeAuthorization',
      component: Container,
      children: [
        {
          path: '',
          name: 'storeAuthorization',
          component: StoreAuthorization,
        },

        {
          path: 'seeInfo',
          name: 'seeInfo',
          component: SeeInfo,
        },



      ],
    },
  ]
})
