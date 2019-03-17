import React, { Component } from "react";
import { mapStyle } from "../data/mapStyle.js";
import scriptLoader from "react-async-script-loader";

class MapView extends Component {
  constructor(props) {
    super(props);
    this.map = null;
  }

  componentWillReceiveProps({ isScriptLoaded, isScriptLoadedSucceed }) {
    if (isScriptLoaded && !this.props.isScriptLoaded) {
      // load finished
      if (isScriptLoadedSucceed) {
        this.map = new google.maps.Map(document.getElementById("map"), {
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
    return <div id="map" />;
  }
}

export default scriptLoader([
  "https://maps.googleapis.com/maps/api/js?key=AIzaSyA_vkGYxkHZ4P1gcvKbu62XwvCEO96fVSY&callback=initMap"
])(MapView);
