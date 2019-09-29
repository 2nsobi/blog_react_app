import React, { Component } from 'react'
import {connect} from 'react-redux'
import createProject from '../../data-store/actions/projectActions'
import {Redirect} from 'react-router-dom'

class CreateProject extends Component {
    state = {
        title: '',
        content: ''
    }

    handleSubmit = (e) =>{
        e.preventDefault()
        this.props.createProject(this.state)
        this.props.history.push('/')
    }

    handleTextChange = (e) =>{
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    render() {
        const {auth} = this.props 
        if(!auth.uid) return <Redirect to='/signin'/>
        return (
            <div className = 'container'>
                <form onSubmit ={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3">Create Project</h5>
                    <div className="input-feild">
                        <label htmlFor="title">Title</label>    {/*label tag allows a user to click the text next to the input text box to enter the text box*/}
                        <input type="text" id='title' onChange={this.handleTextChange}/>
                    </div>  
                    <div className="input-feild">
                        <label htmlFor="content">Project Content</label>
                        <textarea id="content" className="materialize-textarea" onChange={this.handleTextChange} placeholder = 'What do you want to work on?'></textarea>
                    </div>   
                    <div className="input-feild">
                        <button className="btn yellow lighten-1 z-depth-0">Create</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {     //brackets because this is returning an object
        createProject: (project) => { dispatch(createProject(project)) }
    }
}

const mapStateToProps = (state)=>{
    return{
        auth: state.firebase.auth
    }
}

//mapStateToProps needs to be the first function passed to connect then the one for mapDispatchToProps
//so if u don't have a mapStateToProps function you can sub it for null
export default connect(mapStateToProps,mapDispatchToProps)(CreateProject)