import React from 'react'
import Home from './components/Home/Home'
import Welcome from './components/Welcome/Welcome'
import Error404 from './components/Error404/Error404'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' component={Welcome} exact={true}/>
        <Route path='/home' component={Home}/>
        <Route component={Error404} />
      </Switch>
    </Router>
  )
}

export default App;
