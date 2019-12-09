import React from "react";
// import {NavLink} from "react-router-dom";
import {vtigerOperationsActions} from '../../_actions/';
import {connect} from "react-redux";
import '../../styles/components/listOf.sass'
// import {getDate} from '../../_helpers';
import {BackButton} from "..";
import '../../styles/components/comments.sass';
import {Comment} from "../Comment/Comment";



class Comments extends React.Component {
  state = {
    comment: ''
  };
  static defaultProps = {
    comments: [],
  };
  componentDidMount() {
    if (this.props.match.params.workorderId) {
      this.props.dispatch(vtigerOperationsActions.getComments(this.props.match.params.workorderId, 1));
    } else this.props.dispatch(vtigerOperationsActions.getComments(this.props.match.params.id, 0));
  }

  changeHandler = e => {
    this.setState({comment: e.target.value})
  };

  onSubmit = () => {
    if (this.props.match.params.workorderId) {
      this.props.dispatch(vtigerOperationsActions.addComment(this.props.match.params.id, this.props.match.params.workorderId, this.state.comment, 1, null));
    } else this.props.dispatch(vtigerOperationsActions.addComment(this.props.match.params.id, null, this.state.comment, null, null));
    this.setState({comment: ''})
  };
  render() {
    // console.log(this.props.comments);
    return (
      <div className="comments-holder">
        <div className='heading-holder'>
          <BackButton/>
          <h1>Commentaar</h1>
        </div>
        {this.props.comments.map((e, i)=> {
          return (
            <Comment project={this.props.match.params.id} workorder={this.props.match.params.workorderId} key={i} data={e}/>
          );
        })}
        <textarea value={this.state.comment} onChange={e => this.changeHandler(e)} name="comment" id="comment"/>
        <button onClick={this.onSubmit} className='nav-link'>Comment</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const comments = state.vtigerOperationsReducer.comments;
  return {comments}
}

Comments = connect(mapStateToProps)(Comments);
export {Comments}
