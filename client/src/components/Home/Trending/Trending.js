import React from 'react'
import './Trending.css'
function Trending() {
    function handleclick(e) {
        document.querySelector('.nav').style.display = 'flex'
        document.querySelector('#show').style.display = 'none'
        var rightbar = document.querySelector('.RightBar')
        rightbar.style.width = '300px'
    }
    return (
        <div className='Trending'>
            <div id='show' className='trendingdisp'>
                <button className='btn btn-danger' id='showtrend' onClick={handleclick}>click me to see trending</button>
            </div>
            <nav className="nav flex-column">
                <span ><h1>Trending Topics</h1></span>
                <span><hr className="mt-0 pt-0 ml-2 mr-2" /></span>
            </nav>
        </div>
    )
}

export default Trending