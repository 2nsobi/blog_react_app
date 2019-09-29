import React from 'react'
import ProjectSummary from './ProjectSummary'
import {Link} from 'react-router-dom'

const ProjectList = ({projects}) =>{
    return(
        <div className="project-list section">
            {/* "projects &&" is shortcut for if statement
             that checks if any project are even there*/}
            {projects && projects.map(project=>{
                return(
                    // keys needs to be associated with the parent element in a list in react
                    <Link to={'/project/'+project.id}  key={project.id}>
                        <ProjectSummary project={project}/>
                    </Link>
                )
            })}
        </div>
    )
}

export default ProjectList