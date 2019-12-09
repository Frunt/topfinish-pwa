import React from "react";
import {NavLink} from "react-router-dom";
import {vtigerOperationsActions} from '../../_actions/';
import {connect} from "react-redux";
import '../../styles/components/listOf.sass'
// import {getDate, history} from '../../_helpers';
import {BackButton} from "..";



class Workorder extends React.Component {
  static defaultProps = {
    workorder: [],
  };
  componentDidMount() {
    const { match: { params } } = this.props;
    this.props.dispatch(vtigerOperationsActions.projectDetails(params.id));
    this.props.dispatch(vtigerOperationsActions.workorderList(params.id));
  }


  render() {
    // console.log(this.props.workorder);
    return (
      <div className="workorder-list-holder">
        <div className="heading-holder">
          <BackButton/>
          <h1>Werkbonnen</h1>
        </div>
        <div className="workorder">
          <ul className='listOf workorder'>
            {this.props.workorder.map(workorder => {
              return (
                <li key={workorder.ProjectTaskId}>
                  <NavLink to={`/projects/${this.props.match.params.id}/workorder/${workorder.ProjectTaskId}`}>
                    <span className="task-no">{workorder['Project Task No']}</span>
                    <span className="name">{workorder['Project Task Name']}</span>
                    <span className={`binnen ${workorder.Werkomstandigheid ? 'active' : ''}`}>{workorder.Werkomstandigheid ? workorder.Werkomstandigheid : ''}</span>
                    <span className={`status ${workorder.Status === 'Open' ? 'open' : workorder.Status === 'Afgerond' ? 'completed' : workorder.Status === 'In Progress' ? 'progress' : ''}`}>{workorder.Status ? workorder.Status : null}</span>
                    <span className={'assigned-to'}>{workorder.AssignedTo}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const workorder = state.vtigerOperationsReducer.workorder;
  return {workorder}
}

Workorder = connect(mapStateToProps)(Workorder);
export {Workorder}
