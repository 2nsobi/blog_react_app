import firebase from 'firebase/app'

export const signIn = (credentials) =>{
    return (dispatch,getState) =>{
        console.log(getState())

        firebase.auth().signInWithEmailAndPassword(credentials.email,credentials.password)
            .then(()=>{
                dispatch({type: 'LOGIN_SUCCESS'})
            }).catch((error)=>{
                dispatch({type: 'LOGIN_ERROR',error})
            })
    }
}

export const signOut = () =>{
    return(dispatch,getState) =>{

        firebase.auth().signOut()
            .then(()=>{
                dispatch({type:'SIGNOUT_SUCCESS',})
            })
    }
}

export const signUp = (newUser) =>{
    return (dispatch,getState) =>{

        firebase.auth().createUserWithEmailAndPassword(newUser.email,newUser.password)
            .then((response)=>{
                return firebase.firestore().collection('users').doc(response.user.uid).set({
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    initials: newUser.firstName[0].toUpperCase()+newUser.lastName[0].toUpperCase()
                })
            }).then(()=>{
                dispatch({type:'SIGNUP_SUCCESS'})
            }).catch(error=>{
                dispatch({type:'SIGNUP_ERROR',error})
            })
    }
}

export default signIn