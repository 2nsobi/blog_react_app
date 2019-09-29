import React from 'react'
import moment from 'moment'

const Notifications = (props) =>{
    const {notifs} = props
    return(
        <div className="section">
            <div className="card z-depth-0">
                <div className="card-content">
                    <span className="card-title"><b>Notifications</b></span>
                    <ul className='notifications'>
                        {notifs && notifs.map(notif=>{
                            return (
                                <li key={notif.id}>
                                    <span className="yellow-text">{notif.user} </span>
                                    <span>{notif.content}</span>
                                    <div className="grey-text note-date">
                                        {moment(notif.time.toDate()).fromNow()}
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Notifications