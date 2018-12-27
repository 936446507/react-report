import React, { Component } from 'react'

import { Pagination, Loading } from 'element-react'
import ListState from '@/components/list-state/list-state'
import UserInfoForm from './user-info-form'
import UserInfoListHeader from './user-info-list-header'
import UserInfoListCell from './user-info-list-cell'

import { getAgentInvestorListData } from '@/request/member-manager'
import { formateDate } from '@/utils'

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
    const { pageNum, pageSize, records, list, state, isGettingListData } = this.state

    return (
      <div className="userInfo">
        <UserInfoForm />
        <div className="Isolation-fence"></div>
        <Loading loading={ isGettingListData }>
          <div className="userInfo-data-content">
            <div className="userInfo-out">
              <div className="userInfo-in">
                <UserInfoListHeader></UserInfoListHeader>
                {
                  list.length > 0 && (
                    <div className="userInfo-scroll">
                      <div className="userInfo-contain">
                      {
                        list.map((item, index) => (
                          <UserInfoListCell key={ index } data={ item } />
                        ))
                      }
                      </div>
                    </div>
                  )
                }
                <ListState state={ state } reload={ this.getAgentInvestorListData } />
                <p className="userInfo-last-show" v-if="list.length > 0">当前第{ pageNum }页,共{ Math.ceil(records/pageSize) }页</p>
                <Pagination
                  layout="prev, pager, next"
                  small
                  total={ records }
                  pageSize={ pageSize }
                  onCurrentChange={ this.getAgentInvestorListData }/>
              </div>
            </div>
          </div>
        </Loading>
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
      agentState: userState,
      startDate, endDate,
      startTime, endTime
    } = this.state
    if (isGettingListData) return
    const startDateCopy = formateDate({date: startDate, fmt: 'yyyy-MM-dd'}) + ' ' + startTime
    const endDateCopy = formateDate({date: endDate, fmt: 'yyyy-MM-dd'}) + ' ' + endTime
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
    getAgentInvestorListData(
      params
    ).then(e => {
      let [ state, list, records, pageSize ] = [ '', null, 0, 0 ]
      const isSuccStataData = e.state === 'ok' && e.records > 0

      state = isSuccStataData ?
        'success' :
        e.state === 'error' ? 'error' : 'nodata'
      list = isSuccStataData ? e.rows : []
      records = isSuccStataData ? e.records : 0
      pageSize = isSuccStataData ? e.pageSize : pageSize

      this.setState({ state, list, records, pageSize })
    }).catch(err => {
      throw err
    }).finally(_ => {
      this.setState({
        isGettingListData: false
      })
    })
  }

  componentDidMount() {
    this.getAgentInvestorListData()
  }
}

export default UserInfo
