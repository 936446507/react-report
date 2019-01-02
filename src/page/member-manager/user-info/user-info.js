import React, { Component } from 'react'

import { Pagination, Loading } from 'element-react'
import ListState from '@/components/list-state/list-state'
import UserInfoForm from './user-info-form'
import UserInfoListHeader from './user-info-list-header'
import UserInfoListCell from './user-info-list-cell'

import { getAgentInvestorListData } from '@/request/member-manager'

// import './user-info.scss'

export class UserInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      state: 'nodata',
      needRefresh: false,
      pageNum: 1,
      pageSize: 7,
      records: 0,
      list: [],
      isGettingListData: false
    }

    this.getAgentInvestorListData = this.getAgentInvestorListData.bind(this)
    this.onUserInfoFormRef = this.onUserInfoFormRef.bind(this)
  }
  render() {
    const { pageNum, pageSize, records, list, state, isGettingListData } = this.state

    return (
      <div className="userInfo">
        <UserInfoForm
          onRef={ this.onUserInfoFormRef }
          isSearching={ isGettingListData }
          getAgentInvestorListData={ this.getAgentInvestorListData } />
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

  getAgentInvestorListData(infoFormData) {
    const { pageNum: page, pageSize, isGettingListData } = this.state

    if (isGettingListData) return
    const params = {
      AgentID: this.agentId,
      page,
      pageSize,
      ...infoFormData
    }
    this.setState({ isGettingListData: true })
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
      this.setState({ isGettingListData: false })
    })
  }

  onUserInfoFormRef(ref) {
    this.userInfoFormRef = ref
  }

  componentDidMount() {
    this.userInfoFormRef.getAgentInvestorListData()
  }
}

export default UserInfo
