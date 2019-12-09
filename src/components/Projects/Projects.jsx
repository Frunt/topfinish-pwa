import React from "react";
import {NavLink} from "react-router-dom";
import {vtigerOperationsActions} from '../../_actions/';
import {connect} from "react-redux";
import '../../styles/components/listOf.sass'
import {getDate} from '../../_helpers';
import {BackButton} from "..";
import '../../styles/components/project.sass'



class Projects extends React.Component {
  static defaultProps = {
    projects: [],
  };
  componentDidMount() {
    this.props.dispatch(this.props.match.path === '/today' ? vtigerOperationsActions.projectList(true) : vtigerOperationsActions.projectList());
  }

  render() {
    // console.log(this.props.projects);
    return (
      <div className="project-list-holder">
        <div className="heading-holder">
          <BackButton/>
          <h1>{this.props.match.path === '/today' ? 'Vandaag' : 'Projecten'}</h1>
          <span className='project-no'>Projects count: {this.props.projects.length}</span>
        </div>
        <div className="projects">
          <ul className='listOf project-list'>
            {this.props.projects.map(project =>
              <li key={project.project_id}>
                <NavLink to={`/projects/${project.project_id}`}>
                <span className="name">{project.projectname}</span>
                <span className="date">{getDate(project.startdate)}</span>
                <span className={`status ${project.project_status === 'Open' ? 'open' : false}`}>{project.project_status ? project.project_status : null}</span>
                <span className={'assigned-to'}>{project.assigned_to}</span>
                </NavLink>
              </li>)}
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const projects = state.vtigerOperationsReducer.list;
  return {projects}
}

Projects = connect(mapStateToProps)(Projects);
export {Projects}
