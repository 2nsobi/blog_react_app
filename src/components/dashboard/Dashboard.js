import React,{Component} from 'react'
import Notifications from './Notifications'
import ProjectList from '../projects/ProjectList'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import {Redirect} from 'react-router-dom'

class Dashboard extends Component{
    render(){

        const {projects,auth,notifs} = this.props;
        if(!auth.uid) return <Redirect to='/signin'/>

        return(
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m6">
                        <ProjectList projects = {projects}/>
                    </div>
                    <div className="col s12 m5 offset-m1">
                        <Notifications notifs={notifs}/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {  //brackets because this is returning an object
        projects: state.firestore.ordered.projects,
        auth: state.firebase.auth,
        notifs: state.firestore.ordered.notifications
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'projects', orderBy: ['createdAt','desc']},
        {collection: 'notifications', limit: 3, orderBy: ['time','desc']}
    ])
)(Dashboard)