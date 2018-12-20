import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { getAgentInfoData, changeAgentInfoData } from '@/request/member-manager'

export class AgentInfo extends Component {
  static propTypes = {
    agentInfo: PropTypes.object,
    treeState: PropTypes.string
  }
  static defaultProps = {
    treeState: 'noinit'
  }
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      isShowButton: true,
      ibInfo: {
        superiorIB: '',            // 上级代理商
        ibName: '',              // 代理商名称
        ibId: '',                // 代理商编号
        ibAccount: '',           // 管理账号
        area: '',                // 地区
        phone: '',             // 联系电话
        loginState: ''           // 登陆状态
      }
    }

    this.getAgentInfoData = this.getAgentInfoData.bind(this)
    this.changeAgentInfoData = this.changeAgentInfoData.bind(this)
    this.reset = this.reset.bind(this)
  }
  render() {
    const { isShowButton, ibInfo } = this.state
    return (
      <div className="ib-manager">
        <div className="ibtitle-hint">
          <span className="hint-block"></span>
          修改代理商信息(带*为必填项)
        </div>
        <div className="login-state">登录状态: { ibInfo.loginState }</div>
        {
          isShowButton && (
            <div className="button-row">
              <div className="btn">重置</div>
              <div className="btn">保存</div>
            </div>
          )
        }
      </div>
    )
  }

  getAgentInfoData() {
    getAgentInfoData({})
  }

  changeAgentInfoData() {
    changeAgentInfoData()
  }

  reset() {}
}

export default AgentInfo
