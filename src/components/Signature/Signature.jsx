import React from "react";
// import {NavLink} from "react-router-dom";
import {vtigerOperationsActions} from '../../_actions/';
import {connect} from "react-redux";
import '../../styles/components/listOf.sass'
import '../../styles/components/signature.sass'
// import {getDate} from '../../_helpers';
import {BackButton} from "..";
import SignatureCanvas from "react-signature-canvas";
import DatePicker from "react-datepicker/es";
import "react-datepicker/dist/react-datepicker.css";



class Signature extends React.Component {
  state = {
    startDate: new Date(),
    trimmedDataURL: null,
    name: '',
  };

  handleChange = date => {
    this.setState({
      startDate: date
    });
  };
  getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };
  showPosition = position => {
    this.setState({position: position.coords});
  };
  trim = () => {
    // console.log('asd')
    const {userId} = JSON.parse(localStorage.getItem('user')).info;
    this.props.dispatch(vtigerOperationsActions.saveDelivery(this.state.name, userId, this.sigPad.toDataURL('image/png'), this.state.position.longitude, this.state.position.latitude, this.props.match.params.id));
    this.props.history.push('/');
  };
  sigPad = {};
  render() {
    this.getLocation();
    return (
      <div className="signature-holder">
        <div className='heading-holder'>
          <BackButton/>
          <h1>Handtekening</h1>
        </div>
        <div className="input-block">
          <input value={this.state.name} type="text" onChange={(e) => this.setState({name: e.target.value})} placeholder={'Naam'}/>
          <DatePicker
            dateFormat="dd/MM/yyyy"
            selected={this.state.startDate}
            onChange={this.handleChange}
            placeholderText='Datum'
          />
        </div>
        <SignatureCanvas
          penColor='black'
          canvasProps={{style: {border: '1px solid #1F336C', marginTop: 25, marginBottom: 25, height: 300}}}
          backgroundColor='#fff'
          ref={(ref) => { this.sigPad = ref }}
          // canvasProps={{width: '100%', height: 200}}
        />
        <button onClick={this.trim} className='nav-link'>Bevestigen</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {}
}

Signature = connect(mapStateToProps)(Signature);
export {Signature}
