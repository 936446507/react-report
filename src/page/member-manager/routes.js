import MemberManager from './member-manager'

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
    }
  }
]
