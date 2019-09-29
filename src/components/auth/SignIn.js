import React, { Component } from 'react'
import { connect } from 'react-redux'
import signIn from '../../data-store/actions/authActions'
import { Redirect } from 'react-router-dom'
import { getImage } from '../../loadAllImages'

class SignIn extends Component {
    state = {
        email: '',
        password: ''
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.signIn(this.state)
    }

    handleTextChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    render() {
        const { authError, auth } = this.props
        if (auth.uid) return <Redirect to='/' />
        return (
            <div className='container'>
                <div>
                    <img src={getImage('ballskins')} alt="lol :(" />
                </div>
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3">Sign In</h5>
                    <div className="input-feild">
                        <label htmlFor="email">Email</label>
                        <input type="email" id='email' onChange={this.handleTextChange} />
                    </div>
                    <div className="input-feild">
                        <label htmlFor="password">Password</label>
                        <input type="password" id='password' onChange={this.handleTextChange} />
                    </div>
                    <div className="input-feild">
                        <button className="btn yellow lighten-1 z-depth-0">Log In</button>
                        {authError ?
                            <div className="red-text center">
                                <p>{authError}</p>
                            </div>
                            : null}
                    </div>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (creds) => dispatch(signIn(creds))
    }
}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
