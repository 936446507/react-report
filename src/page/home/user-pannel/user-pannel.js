import React, { Component } from 'react'
import PropTypes from 'prop-types'

import formateNum from '../../../utils/formate-num'
import integerNum from '../../../utils/integer-num'
// import './user-pannel.scss'

class UserPannel extends Component {
  static propTypes = {
    bigTitle: PropTypes.string,
    isRefreshing: PropTypes.bool
  }
  static defaultProps  = {
    bigTitle: '待结算金额',
    isRefreshing: false
  }
  constructor(props) {
    super(props)
    this.state = {
      bigMoney: 0,
      userInfo: {
        balance: 0,
        equity: 0,
        agentSum: 16,
        formalUserSum: 36,
        userSum: 73

      }
    }
    this.refresh = this.refresh.bind(this)
  }

  render() {
    const { bigTitle } = this.props
    let { bigMoney, userInfo } = this.state
    bigMoney = formateNum({ num: bigMoney })
    let balance = formateNum({ num: userInfo.balance })
    let equity = formateNum({ num: userInfo.equity })
    let agentSum = integerNum(userInfo.agentSum)
    let formalUserSum = integerNum(userInfo.formalUserSum)
    let userSum = integerNum(userInfo.userSum)

    return (
      <div className="user-pannel-out">
        <div className="user-pannel">
          <div className="user-floatpl">
          <div className="user-floatpl--digit">
            <p className={ bigTitle === '待结算金额' ? 'bold is-float' : 'bold' }> { bigMoney }</p>
            <div className="floatpl-refresh-wrap">
            <span className="floatpl-refresh"></span>
            </div>
          </div>
          <div className="user-floatpl--title">{ bigTitle }</div>
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
      </div>
    )
  }

  refresh() {}
}

export default UserPannel
