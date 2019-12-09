import React from "react";
import FileBase64 from 'react-file-base64';
// import {NavLink} from "react-router-dom";
import {vtigerOperationsActions} from '../../_actions/';
import {connect} from "react-redux";
import '../../styles/components/listOf.sass';
import '../../styles/components/photos.sass';
// import {getDate} from '../../_helpers';
import {BackButton} from "..";
// import Camera from 'react-html5-camera-photo';
// import 'react-html5-camera-photo/build/css/index.css';
// import {vtigerOperationsActions} from '../../_actions/';



class Photos extends React.Component {
  static defaultProps = {
    images: [],
  };
  state = {};
  componentDidMount() {
    this.props.dispatch(vtigerOperationsActions.getImages(this.props.match.params.workorderId));
  }
  onTakePhoto = e => {
    // console.log(e.target.files[0]);
    this.setState({dataUri: e.target.files[0]});
  };
  getFiles = files => {
    this.setState({ files: files })
  };
  uploadHandler = e => {
    e.preventDefault();
    this.props.dispatch(vtigerOperationsActions.saveWorkorderImage(this.state.files[0].base64, this.props.match.params.workorderId));
    this.setState({});
  };
  render() {
    return (
      <div className="photos-holder">
        <div className='heading-holder'>
          <BackButton/>
          <h1>Fotos</h1>
          <span className="add"><FileBase64 multiple={true} onDone={this.getFiles}/></span>
        </div>
        <div className="images-holder">
          <img src={this.props.images.image_path} alt=""/>
        </div>
        <div className="button-holder">
          {this.state.files && <a href="#" onClick={e => this.uploadHandler(e)} className="button">Upload</a>}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const images = state.vtigerOperationsReducer.images;
  return {images};
}

Photos = connect(mapStateToProps)(Photos);
export {Photos}
