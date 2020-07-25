import React, { useState, useEffect } from 'react'
import Header from './Header/Header'
import RightBar from './RightBar/RightBar'
import Trending from './Trending/Trending'
import Feed from './Feed/Feed'
import Notifications from './Notifications/Notifications'
import Messages from './Messages/Messages'
import Profile from './Profile/Profile'
import CreateTopic from './CreateTopic/CreateTopic'
import Error404 from '../Error404/Error404'
import './Home.css'
import { Route, Switch, useRouteMatch, Redirect } from 'react-router-dom'

const Home = () => {
    let match = useRouteMatch()
    const [valid, SetValid] = useState(true)
    useEffect(() => {
        fetch('https://localhost:5000',
            { method: 'GET', mode: 'cors', credentials: 'include' })
            .then(response => response.json())
            .then(data => {
                data.user !== 'authenticated' && SetValid(false)
            })
    }, [])
    return (
        <div>
        {valid === false ? <Redirect to={{pathname : '/'}}/>: null}
            <Header />
            <div className='homeContainer'  className="container-fluid">
                <div className="row content">
                <div className="body container-fluid" className="col-sm-3">
                <Trending /></div>
                <div className="body container-fluid" className="col-sm-6">
                <Switch>
                    <Route path={`${match.path}`} component={Feed} exact={true} />
                    <Route path={`${match.path}/notifications`} component={Notifications} />
                    <Route path={`${match.path}/messages`} component={Messages} />
                    <Route path={`${match.path}/profile`} component={Profile} />
                    <Route path={`${match.path}/createtopic`} component={CreateTopic} />
                    <Route component={Error404} />
                </Switch></div>
                <div className="body container-fluid" className="col-sm-2">
                <RightBar /></div>
                </div>
            </div>
        </div>
    )
}

export default Home