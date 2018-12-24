import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from "mobx-react"
import { toJS } from 'mobx'

import { Form, Input, Loading } from 'element-react'

import { getAgentInfoData, changeAgentInfoData } from '@/request/member-manager'
import { showMessageBox, objectUtils } from '@/utils'
import { HEADQUARTERS_ID } from '@/config'

import './agent-info.scss'

@inject('UserInfoStore')
@observer
export class AgentInfo extends Component {
  static propTypes = {
    agent: PropTypes.object,
    treeState: PropTypes.string
  }
  static defaultProps = {
    treeState: 'noinit'
  }
  constructor(props) {
    super(props)
    this.state = {
      isLoadingAgentInfo: false,
      isChangingAgentInfo: false,
      isShowButton: true,
      ibInfo: {
        superiorIB: '',            // 上级代理商
        ibName: '',              // 代理商名称
        ibId: '',                // 代理商编号
        ibAccount: '',           // 管理账号
        area: '',                // 地区
        phone: '',             // 联系电话
        loginState: ''           // 登陆状态
      },
      rules: {
        area: [ { required: true, message: '请输入地区', trigger: 'blur' } ],
        phone: [ { required: true, message: '请输入联系电话', trigger: 'blur' } ]
      }
    }

    this.getAgentInfoData = this.getAgentInfoData.bind(this)
    this.changeAgentInfoData = this.changeAgentInfoData.bind(this)
    this.computedAgentInfo = this.computedAgentInfo.bind(this)
    this.empty = this.empty.bind(this)
    this.reset = this.reset.bind(this)
  }
  render() {
    const {
      isShowButton,
      ibInfo,
      isLoadingAgentInfo,
      isChangingAgentInfo
    } = this.state

    return (
      <Loading loading={ isLoadingAgentInfo }>
        <div className="ib-manager">
          <div className="ibtitle-hint">
            <span className="hint-block"></span>
            修改代理商信息(带*为必填项)
          </div>
          <Form
            ref="form"
            labelWidth="100"
            model={this.state.ibInfo}
            rules={this.state.rules}
            className="demo-ruleForm">
            <Form.Item label="上级代理商" prop="superiorIB">
              <Input
                value={this.state.ibInfo.superiorIB}
                onChange={this.onChange.bind(this, 'superiorIB')}
                autoComplete="off"
                disabled />
            </Form.Item>
            <Form.Item label="代理商名称" prop="ibName">
              <Input
                value={this.state.ibInfo.ibName}
                onChange={this.onChange.bind(this, 'ibName')}
                autoComplete="off"
                disabled />
            </Form.Item>
            <Form.Item label="代理商编号" prop="ibId">
              <Input
                value={this.state.ibInfo.ibId}
                onChange={this.onChange.bind(this, 'ibId')}
                autoComplete="off"
                disabled />
            </Form.Item>
            <Form.Item label="管理账号" prop="ibAccount">
              <Input
                value={this.state.ibInfo.ibAccount}
                onChange={this.onChange.bind(this, 'ibAccount')}
                autoComplete="off"
                disabled />
            </Form.Item>
            <Form.Item label="地区" prop="area">
              <Input
                value={this.state.ibInfo.area}
                onChange={this.onChange.bind(this, 'area')}
                autoComplete="off" />
            </Form.Item>
            <Form.Item label="联系电话" prop="phone">
              <Input
                value={this.state.ibInfo.phone}
                onChange={this.onChange.bind(this, 'phone')}
                autoComplete="off" />
            </Form.Item>
          </Form>
          <div className="login-state">登录状态: { ibInfo.loginState }</div>
          {
            isShowButton && (
              <div className="button-row">
                <div className="btn" onClick={ this.empty }>重置</div>
                <div
                  className="btn"
                  onClick={ this.changeAgentInfoData }>
                  { isChangingAgentInfo ? '保存中...' : '保存'}
                </div>
              </div>
            )
          }
        </div>
      </Loading>
    )
  }

  getAgentInfoData() {
    if (this.state.isLoadingAgentInfo) return
    this.setState({
      isLoadingAgentInfo: true
    })
    const agentInfo = this.computedAgentInfo()
    getAgentInfoData({
      AgentID: agentInfo.id
    }).then(e => {
      if (e.state === 'ok') {
        const ibInfo = {}
        ibInfo.superiorIB = e.data.parentName
        ibInfo.ibName = e.data.UserName
        ibInfo.ibId = e.data.number
        ibInfo.ibAccount = e.data.admin
        ibInfo.area = e.data.area
        ibInfo.phone = e.data.phone
        ibInfo.loginState = e.data.lastLoginTime
        this.setState({ ibInfo })
      } else {
        let showMessageData = {
          title: `获取${agentInfo.text ? agentInfo.text : agentInfo.username}代理商信息`,
          message: e.msg || '获取代理商信息失败'
        }
        showMessageBox(showMessageData)
      }
    }).catch(err => {
      throw err
    }).finally( _ => {
      this.setState({
        isLoadingAgentInfo: false
      })
    })
  }

  changeAgentInfoData() {
    if (this.state.isChangingAgentInfo) return
    this.setState({
      isChangingAgentInfo: true
    })
    const agentInfo = this.computedAgentInfo()
    const { area, phone } = this.state.ibInfo
    changeAgentInfoData({
      AgentID: agentInfo.id,
      area,
      phone
    }).then(e => {
      const msg = e.state === 'ok' ? '修改成功' : '修改失败'
      showMessageBox({ message: e.msg || msg})
    }).catch(err => {
      throw err
    }).finally( _ => {
      this.setState({
        isChangingAgentInfo: false
      })
    })
  }

  onChange(key, value) {
    this.setState({
      ibInfo: objectUtils.modifyItem(this.state.ibInfo, { [key]: value })
    })
  }

  computedAgentInfo() {
    const { agent } = this.props
    return agent && agent.id ? agent : toJS(this.props.UserInfoStore.userInfo)
  }

  empty() {
    let emptyData = {
      area: '',
      phone: ''
    }

    this.setState({
      ibInfo: objectUtils.modifyItem(this.state.ibInfo, emptyData)
    })
  }

  reset() {
    const { ibInfo } = this.state
    for (let key in ibInfo) {
      ibInfo[key] = ''
    }

    this.setState({ ibInfo })
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    const agentId = this.computedAgentInfo().id
    console.log(agentId)
    this.setState({
      isShowButton: agentId !== HEADQUARTERS_ID
    })
    this.getAgentInfoData(agentId)
  }
}

export default AgentInfo
