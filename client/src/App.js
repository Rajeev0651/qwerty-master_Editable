import React from 'react'
import Home from './components/Home/Home'
import Welcome from './components/Welcome/Welcome'
import Error404 from './components/Error404/Error404'
import ChatBox from './components/Home/ChatBox/ChatBox'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider, createMuiTheme} from "@material-ui/core/styles"

function App() {
  const theme = createMuiTheme({
    palette:{
      type: "light",
    }
  })
  return (
    <Router>
      <ThemeProvider theme={theme}>
      <Switch>
        <Route path='/' component={Welcome} exact={true}/>
        <Route path='/home' component={Home}/>
        {/* <Route component={Error404} /> */}
      </Switch>
      </ThemeProvider>
    </Router>
  )
}
export default App;
