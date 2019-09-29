const initState = {
    projects: [
        {id: '1', title: 'go to the poles', content: 'dummy content 1'},
        {id: '2', title: 'make sandwich', content: 'bread, tomates, ham, and mayo'},
        {id: '3', title: 'go to sleep', content: 'dummy content 3'}     
    ]
}

const projectReducer = (state = initState,action) =>{
    switch (action.type) {
        case 'CREATE_PROJECT':
            console.log('created project', action.project)
            return state
        
        case 'CREATE_PROJECT_ERROR':
            console.log('create project error', action.error)
            return state

        default:
            return state
    }
}

export default projectReducer