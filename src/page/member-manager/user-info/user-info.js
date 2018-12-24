import React, { Component } from 'react'

import { Pagination } from 'element-react'
import ListState from '@/components/list-state/list-state'
import UserInfoListHeader from './user-info-list-header'
import UserInfoListCell from './user-info-list-cell'

import { getAgentInvestorListData } from '@/request/member-manager'

import './user-info.scss'

export class UserInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      state: 'nodata',
      startTimeRange: '00:00:00 - 23:59:59',
      endTimeRange: '00:00:00 - 23:59:59',
      needRefresh: false,
      rangeType: '0',             // '0'全部，'1'直属
      accountType: '0',           // '0'全部，'1'普通用户，'2'代理用户
      agentState: '-1',           //  -1所有 0拒绝 1正式 5欠资料 10待审核
      startDate: '',              // 注册开始日期
      startTime: '00:00:00',              // 注册开始时分秒
      endDate: '',                // 注册结束日期
      endTime: '00:00:00',                // 注册结束时分秒
      name: '',                   // 姓名
      account: '',                // MT4账号
      pageNum: 1,
      pageSize: 7,
      records: 0,
      list: [],
      isGettingListData: false
    }

    this.getAgentInvestorListData = this.getAgentInvestorListData.bind(this)
  }
  render() {
    const { pageNum, pageSize, records } = this.state
    return (
      <div className="userInfo">
        <div className="Isolation-fence"></div>
        <div className="userInfo-data-content" v-loading="isLoading">
          <div className="userInfo-out">
            <div className="userInfo-in">
            <UserInfoListHeader></UserInfoListHeader>
              <div className="userInfo-scroll">
                <div className="userInfo-contain">
                <UserInfoListCell></UserInfoListCell>
                </div>
              </div>
              <ListState />
              <p className="userInfo-last-show" v-if="list.length > 0">当前第{ pageNum }页,共{ Math.ceil(records/pageSize) }页</p>
              <Pagination
                layout="prev, pager, next"
                small
                total={ 50 }/>
            </div>
          </div>
        </div>
        <div className="Isolation-fence"></div>
      </div>
    )
  }

  getAgentInvestorListData() {
    const {
      pageNum: page, pageSize, name, isGettingListData,
      account: mt4code,
      rangeType: range,
      accountType: userType,
      agentState: userState
    } = this.state
    if (isGettingListData) return
    const startDateCopy = ''
    const endDateCopy = ''
    const params = {
      AgentID: this.agentId,
      page,
      pageSize,
      name,
      mt4code,
      startDate: startDateCopy,
      endDate: endDateCopy,
      range,
      userType,
      userState
    }
    this.setState({
      isGettingListData: true
    })
    getAgentInvestorListData({
      params
    }).then(e => {
      let [ state, list, records, pageSize ] = [ '', null, 0, 0 ]
      if (e.state === 'ok') {
        if (e.rows && e.rows.length > 0) {
          state = 'success'
          list = e.rows // 数据列表
          records = e.records
          pageSize = e.pageSize
        } else {
          state = 'nodata'
          list = []
          records = 0
        }
      } else {
        state = e.state === 'error' ? 'error' : 'nodata'
        list = []
        records = 0
      }
      this.state({ state, list, records, pageSize })
    }).catch(err => {
      throw err
    }).finally(_ => {
      this.setState({
        isGettingListData: false
      })
    })
  }
}

export default UserInfo
