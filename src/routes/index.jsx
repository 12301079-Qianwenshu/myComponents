import React from "react"
import { Route, Redirect, Switch, HashRouter as Router } from "react-router-dom"
import Demo1 from 'containers/Demo1'
import App from 'containers/App'

const { RouterHandler } = Router;

const routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" render={() => (
          <Redirect to="/demo/1"/>
      )}/>
      <Route
        path="/demo"
        component={props => (
          <App {...props}>
            <Switch>
              <Route path='/demo/1' component={Demo1}/>
            </Switch>
          </App>
        )}
      />
    </Switch>
  </Router>
)

export default routes
