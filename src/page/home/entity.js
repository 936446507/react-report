export const historyListState = {
  isDetails: false,
  listMapNow: (() => {
    const listMap = {}
    ;['today', 'week', 'month'].forEach(key => {
      listMap[key] = {
        // #init, #loading, #timeout, #nodata, #finished
        loadingState: 'init',
        cancelSource: null,
        data: (_ => ({
          deposit: 0,
          gold: 0,
          netDeposit: 0,
          profitloss: 0,
          siviler: 0,
          turnover: 0,
          withdr: 0
        }))()
      }
    })
    return listMap
  })(),
  listMapLast: (() => {
    const listMap = {}
    ;['yesterday', 'lastweek', 'lastmonth'].forEach(key => {
      listMap[key] = {
        // #init, #loading, #timeout, #nodata, #finished
        loadingState: 'init',
        cancelSource: null,
        data: (_ => ({
          deposit: 0,
          gold: 0,
          netDeposit: 0,
          profitloss: 0,
          siviler: 0,
          turnover: 0,
          withdr: 0
        }))()
      }
    })
    return listMap
  })()
}
