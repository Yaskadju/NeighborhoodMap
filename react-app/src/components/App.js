import React, { Component } from "react";
import { mapStyle } from "../data/mapStyle.js";
import scriptLoader from "react-async-script-loader";
import PlaceList from "./PlaceList.js";

const google = window.google;

class App extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    this.state = {
      listOn: true,
      infoWindow: {}
    };
  }

  componentWillReceiveProps({ isScriptLoaded, isScriptLoadedSucceed }) {
    if (isScriptLoaded && !this.props.isScriptLoaded) {
      // load finished
      if (isScriptLoadedSucceed) {
        const map = new google.maps.Map(document.getElementById("map"), {
          center: {
            lat: -23.560245,
            lng: -46.657948
          },
          zoom: 13,
          styles: mapStyle,
          gestureHandling: "greedy",
          mapTypeControl: false
        });

        let marker = new google.maps.Marker({
          map: map,
          position: map.center,
          animation: google.maps.Animation.DROP,
          open: false
        });

        console.log(map);
      }
    } else {
      this.props.onError();
    }
  }

  render() {
    return (
      <div className="container">
        <h1>Neighborhood Map</h1>
        <section id="map" />
      </div>
    );
  }
}

export default scriptLoader([
  "https://maps.googleapis.com/maps/api/js?key=AIzaSyA_vkGYxkHZ4P1gcvKbu62XwvCEO96fVSY"
])(App);
