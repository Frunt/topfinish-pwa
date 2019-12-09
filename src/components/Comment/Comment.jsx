import React from "react";
import {vtigerOperationsActions} from '../../_actions/';
import {connect} from "react-redux";
import '../../styles/components/comments.sass';

class Comment extends React.Component {
  state = {
    comment: '',
    reply: false,
    replies: false,
  };
  static defaultProps = {
    child: false,
  };
  componentDidMount() {
    // if (!this.props.child) {
    //   this.props.dispatch(vtigerOperationsActions.getReplies(this.props.data.comment_id));
    // }
  }
  replyOpen = () => {
    this.setState({reply: !this.state.reply})
  };
  onSubmit = () => {
    // console.log(this.state.comment);
    this.props.dispatch(vtigerOperationsActions.addComment(this.props.project, this.props.workorder, this.state.comment, this.props.data.comment_id));
    this.setState({comment: '', reply: false})
  };
  onChange = (e) => {
    this.setState({comment: e.target.value});
  };
  repliesRender = e => {
    e.preventDefault();
    this.setState({replies: !this.state.replies})
  };
  render() {
    const {data} = this.props;
    return (
      <div className="comment-holder">
        <div className="comment">
          <div className="user">
            <div style={{backgroundImage: `url("${data.avatar_path}")`}} className="avatar-holder">

            </div>
            <div className="user-info">
              <span className="username">{data.user_name}</span>
              <br/>
              <span className="time">at {data.createdtime}</span>
            </div>
          </div>
          {data.Relatedto ? <span className="related">
                    Related to: {data.Relatedto}
                  </span> : null}
          <p className="comment-text">
            {data.comment}
          </p>
          {!this.props.child && data.replies.length ? <><span className={'reply-open'} onClick={e => this.repliesRender(e)} href="#">Show {data.replies.length || ''} replies</span></> : null}
          {!this.props.child ? this.state.reply ? <button onClick={this.onSubmit} className='nav-link'>Submit</button> :<button onClick={this.replyOpen} className="nav-link">Reply</button> : null}
          {this.state.reply ? <div className="reply-pan">
            <textarea value={this.state.comment} onChange={e => this.onChange(e)} name="reply" id="reply"/>
          </div> : null}
          {this.state.replies ? (data.replies || []).map((data) =>
            <Comment key={data.comment_id} child={true} data={data}/>) : null
          }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {}
}

Comment = connect(mapStateToProps)(Comment);
export {Comment}
