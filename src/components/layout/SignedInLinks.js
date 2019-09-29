import React from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {signOut} from '../../data-store/actions/authActions'

const SignedInLinks = (props) =>{
    const {activeUser} = props
    return(
        <ul className="right">
            <li><NavLink to='/create'>New Project</NavLink></li>
            {/* prevent flicker refresh by passing a nothing function to href attribite o anchor tag */}
            <li><a href={console.log('Clicked Log Out Link')} onClick={props.signOut}>Log Out</a></li>
            <li><NavLink to='/' className='btn btn-floating yellow lighten-1 black-text'>{activeUser.initials}</NavLink></li>
        </ul>
    )
}

const mapDispatchToProps = (dispatch) =>{
    return {
        signOut: () => dispatch(signOut())
    }
}

const mapStateToProps = (state) =>{
    return {
        activeUser: state.firebase.profile
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SignedInLinks)