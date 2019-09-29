import firebase from 'firebase/app'

export const createProject = (project) => {
    return (dispatch, getState) => {
        // make async call to database
        const activeUser = getState()
        
        firebase.firestore().collection('projects').add({
            ...project,
            authorFirstName: activeUser.firebase.profile.firstName,
            authorLastName: activeUser.firebase.profile.lastName,
            authorID: activeUser.firebase.auth.uid,
            createdAt: new Date()
        }).then(()=>{
            dispatch({type: 'CREATE_PROJECT', project}) // or dispatch({type: 'CREATE_PROJECT', project: project})
        }).catch((error)=>{
            dispatch({type: 'CREATE_PROJECT_ERROR', error})
        })
    }
}

export default createProject