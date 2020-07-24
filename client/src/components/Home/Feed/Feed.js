import React from 'react'
import './Feed.css'
function Feed() {
    function handlclick(e) {
        var trend = document.querySelector('.nav')
        trend.style.display = 'none'
        var rightbar = document.querySelector('.RightBar')
        rightbar.style.width = '800px'
        document.querySelector('#show').style.display = 'flex'
    }
    return (
        <div className="Topic">
            <div className='TopicHeading'>
                <h2 align='center'>Topic Heading/Description</h2>
                <span><hr className='mt-0 pd-0 mb-0 pb-0' /></span>
            </div>
            <div className='TopicInfo'>
                <div className='TopicDate'>
                    <h4>Added by - Topic Adminsssssaaa</h4>
                </div>
                <div className='TopicAdmin'>
                    <h4>time - dd/mm at hh:mm</h4>
                </div>
            </div>
            <div className="topicimage">
                <p>Image here if exists</p>
            </div>
            <div className='TopicTags'>
                <h5>Topic Hashtag</h5>
            </div>
            <div className="TopicMembers">
                <h5>Topic Members</h5>
            </div>
            <div className="TopicAction">
                <button className='btn btn-primary' onClick={handlclick}>Join/LeaveView</button>
            </div>
        </div>
    )
}

export default Feed