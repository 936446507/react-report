import MemberManager from './index'

export const routes = [
  {
    path: '/memberManager',
    name: 'memberManager',
    component: MemberManager,
    meta: {
      title: window.baseName + '-管理账号',
      requirePermission: true,
      agentField: 'AgentInfo',
      isRequiedLogin: true
    }
  }
]
