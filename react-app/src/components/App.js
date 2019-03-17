import React, { Component } from "react";
import { mapStyle } from "../data/mapStyle.js";
import MapView from "../components/MapView";
import scriptLoader from "react-async-script-loader";

const google = window.google;

class App extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps({ isScriptLoaded, isScriptLoadedSucceed }) {
    if (isScriptLoaded && !this.props.isScriptLoaded) {
      // load finished
      if (isScriptLoadedSucceed) {
        const map = new google.maps.Map(document.getElementById("map"), {
          center: {
            lat: 41.5916799,
            lng: 13.2427548
          },
          zoom: 13,
          styles: mapStyle,
          gestureHandling: "greedy",
          mapTypeControl: false
        });
      }
    } else {
      this.props.onError();
    }
  }

  render() {
    return (
      <div className="container">
        <h1>Neighborhood Map</h1>
        <section>
          <div id="map" />
        </section>
      </div>
    );
  }
}

export default scriptLoader([
  "https://maps.googleapis.com/maps/api/js?key=AIzaSyA_vkGYxkHZ4P1gcvKbu62XwvCEO96fVSY&callback=initMap"
])(MapView);
