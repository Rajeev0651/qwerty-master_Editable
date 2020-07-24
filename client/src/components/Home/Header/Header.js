import React, { useState } from 'react'
import './Header.css'
import { NavLink, Redirect} from 'react-router-dom'
function Header() {
    const[route,setRoute] = useState(false)
    const handleClick = (e) => {
        e.preventDefault()
        fetch('https://localhost:5000/logout',{
            method:'GET' , mode:'cors', credentials:'include'})
            .then(response=>response.json())
            .then(data => {console.log(data)
                document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                setRoute(true)
                })
            .catch(err => console.log(err))
    }
    return (
        <nav
            className="navbar sticky-top navbar-expand-lg navbar-light"
            style={{ backgroundColor: 'coral' }}>
            {route && <Redirect to={{pathname:'/'}}/>}
            <span className="navbar-brand mb-0 h1">Website Logo</span>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav nav-tabs  ml-auto mr-auto justify-content-center">
                    <NavLink to={`/home`} activeClassName='nav-item'>Feed</NavLink>
                    <NavLink to={`/home/notifications`} activeClassName='nav-item'>Notifications</NavLink>
                    <NavLink to={`/home/messages`}>Messages</NavLink>
                    <NavLink to={`/home/profile`}>Profile</NavLink>
                    <NavLink to={`/home/createtopic`}>Create Topic</NavLink>
                </ul>
                <div className='logoutbtn'>
                    <button 
                        className='btn btn-primary mr-5'
                        onClick={handleClick}>Logout
                    </button>
                </div>
                <form
                    className="form-inline my-2 my-lg-0"
                    onSubmit={(e) => e.preventDefault()}>
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                </form>
            </div>
        </nav>
    )
}

export default Header