import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { toJS } from 'mobx'

import { Loading } from 'element-react'

import { formateNum, integerNum } from '../../../utils'

@inject('UserInfoStore')
@observer
class UserPannel extends Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.refresh = this.refresh.bind(this)
  }

  render() {
    // const { userInfo, isFetching, fetchUserInfo } = this.props
    const userInfo = toJS(this.props.UserInfoStore.userInfo)
    const isFetching = this.props.UserInfoStore.isLoadingUserInfo
    const fetchUserInfo = this.props.UserInfoStore.getUserInfo
    const isSettleAgent = userInfo.isSettleAgent
    // userInfo.totalProfitloss -> 数据应该为home/index接口中的profitloss
    const digit = formateNum({ num: isSettleAgent ? userInfo.totalSettling : userInfo.totalProfitloss })
    const pannelTitle = isSettleAgent ? '待结算金额' : '浮动盈亏'
    const balance = formateNum({ num: userInfo.balance })
    const equity = formateNum({ num: userInfo.equity })
    const agentSum = integerNum(userInfo.agentSum)
    const formalUserSum = integerNum(userInfo.formalUserSum)
    const userSum = integerNum(userInfo.userSum)

    return (
      <div className="user-pannel-out">
        <Loading loading={ isFetching }>
          <div className="user-pannel">
            <div className="user-floatpl">
              <div className="user-floatpl--digit">
                <p className={ digit === '待结算金额' ? 'bold is-float' : 'bold' }> { digit }</p>
                <div className="floatpl-refresh-wrap" onClick={ fetchUserInfo }>
                  <span className="floatpl-refresh"></span>
                </div>
              </div>
              <div className="user-floatpl--title">{ pannelTitle }</div>
              </div>
              <div className="user-dashboard">
              <div className="user-dashboard--item">
                <div className="user-dashboard--item-cell">
                  <div className="user-dashboard--digit">{ balance }</div>
                  <div className="user-dashboard--title">可用金额</div>
                </div>
                <div className="user-dashboard--item-cell">
                  <div className="user-dashboard--digit">{ equity }</div>
                  <div className="user-dashboard--title">净值</div>
                </div>
              </div>
              <div className="user-dashboard--item">
                <div className="user-dashboard--item-cell">
                  <div className="user-dashboard--digit">{ agentSum }</div>
                  <div className="user-dashboard--title">总代理数</div>
                </div>
                <div className="user-dashboard--item-cell">
                  <div className="user-dashboard--digit">{ formalUserSum }/{ userSum }</div>
                  <div className="user-dashboard--title">正式用户/总用户数 </div>
                </div>
              </div>
            </div>
          </div>
        </Loading>
      </div>
    )
  }

  refresh() {}
}

export default UserPannel
