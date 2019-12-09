import React from "react";
import {BackButton} from "..";

class Location extends React.Component {
  state = {
    location: ''
  };
  getLocation = () => {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
      console.log("Geo Location not supported by browser");
    }
  };
  componentDidMount() {
  }

//function that retrieves the position
  showPosition =  position => {
    // console.log(position);
    let location = {
      longitude: position.coords.longitude,
      latitude: position.coords.latitude
    };
    this.showInMap(location)
  };
//request for location
  showInMap = location => {
    // console.log(location);
    let latlon = location.latitude + "," + location.longitude;
    let img_url = "https://maps.googleapis.com/maps/api/staticmap?center="+latlon+"&zoom=14&size=400x300&sensor=false&key=AIzaSyANadOpGdcJeShZmJbV8mfcQoBoWkNDKrA";
    let map = document.getElementById("mapholder");
    map.innerHTML = "<img alt='map' src='"+img_url+"'>";
  };

  render() {
    return (
      <div className="location-holder">
        <div className="heading-holder">
          <BackButton/>
          <h1>Location</h1>
        </div>
        <button onClick={this.getLocation}>map</button>
        <div id="mapholder">

        </div>
      </div>
    );
  }
}
export {Location}
