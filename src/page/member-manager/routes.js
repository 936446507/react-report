import MemberManager from './member-manager'
import AddAgent from './add-agent/add-agent'
import AgentInfo from './agent-info/agent-info'
import UserInfo from './user-info/user-info'

export const routes = [
  {
    path: '/memberManager/agentInfo',
    name: 'memberManager',
    component: MemberManager,
    meta: {
      title: window.baseName + '-管理账号',
      isScrollTop: true,
      requirePermission: true,
      agentField: 'AgentInfo',
      isRequiedLogin: true
    },
    children: [
      {
        path: 'agentInfo',
        name: 'agentInfo',
        component: AgentInfo,
        meta: {
          title: window.baseName + '-代理商管理信息',
          requirePermission: true,
          agentField: 'AgentInfo',
          isRequiedLogin: true
        }
      },
      {
        path: 'userInfo',
        name: 'userInfo',
        component: UserInfo,
        meta: {
          title: window.baseName + '-投资者管理',
          requirePermission: true,
          agentField: 'AgentInvestorList',
          isRequiedLogin: true
        }
      },
      {
        path: 'addAgent',
        name: 'addAgent',
        component: AddAgent,
        meta: {
          title: window.baseName + '-新建代理商',
          requirePermission: true,
          isRequiedLogin: true
        }
      }
    ]
  }
]
