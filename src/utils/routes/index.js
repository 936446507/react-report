
export function setRoutes(routes) {
  routes.map(item => {
    let route = (
      <Route
        path={ item.path }
        component={ item.component }
        onEnter={ _ => setDocTitle(item.title)}
        exact>
      </Route>
    )
  })
}

export function setDocTitle(title) {
  document.title = title
}
