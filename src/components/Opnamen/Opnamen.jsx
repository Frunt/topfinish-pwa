import React from "react";
import {connect} from "react-redux";
import '../../styles/components/project.sass'
import '../../styles/components/nav-links.sass'
import {BackButton} from "..";



class Opnamen extends React.Component {
  render() {
    return (
      <div className='opnamen-holder'>
        <div className='heading-holder'>
          <BackButton/>
          <h1>Opnamen</h1>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {}
}

Opnamen = connect(mapStateToProps)(Opnamen);
export {Opnamen}
