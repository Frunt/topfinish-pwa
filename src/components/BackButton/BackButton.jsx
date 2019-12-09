import React from "react";
import backIcon from '../../assets/img/back.svg';
import {history} from '../../_helpers';
import '../../styles/components/back-button.sass'

class BackButton extends React.Component {
  backhandler = () => {
    history.goBack();
  };
  render() {
    return (
      <button onClick={this.backhandler} className='back-button'><img src={backIcon} alt="back"/> Back</button>
    );
  }
}


export {BackButton}
