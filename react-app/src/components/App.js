import React, { Component } from "react";
import { mapStyle } from "../data/mapStyle.js";
import scriptLoader from "react-async-script-loader";
import PlaceList from "./PlacesList.js";
import InfoWindow from "./InfoWindow.js";
import menu from "../images/menu.png";

const google = window.google;

class App extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    this.state = {
      listOpen: true,
      infoWindow: {},
      infoWindowOpen: false,
      centerMap: {
        lat: -23.560245,
        long: -46.657948
      },
      myMap: {},
      mapReady: false,
      mapError: false,
      screenWidth: window.innerWidth,
      showFiltered: true
    };

    this.toggleList = this.toggleList.bind(this);
    this.checkListIsOpen = this.checkListIsOpen.bind(this);
  }

  toggleList() {
    if (this.state.screenWidth < 800) {
      if (!this.state.listOpen) {
        this.state.infoWindow.close();
      }
      this.setState(prevState => {
        this.state.listOpen = !prevState;
      });
    }
  }

  checkListIsOpen() {
    if (this.state.listOpen && this.state.screenWidth < 800) {
      this.setState(() => {
        this.state.listOpen = false;
      });
    }
  }

  componentDidUpdate({ isScriptLoadSucceed }) {
    if (isScriptLoadSucceed && !this.state.mapIsReady) {
      let map = new window.google.maps.Map(document.getElementById("map"), {
        center: this.state.centerMap,
        zoom: 14,
        styles: mapStyle,
        gestureHandling: "greedy",
        mapTypeControl: false
      });

      let infoWindow = new window.google.maps.InfoWindow({ maxWidth: 300 });

      this.setState({
        myMap: map,
        infowWindow: infoWindow,
        mapIsReady: true
      });
    }
  }

  render() {
    console.log(this.state);

    return (
      <div className="container" role="main">
        <h1 tabIndex="0">São Paulo - Paulista</h1>
        <h2 tabIndex="0">Results by Foursquare</h2>
        {this.state.screenWidth < 800 ? (
          <nav>
            <img
              className="menu-icon"
              src={menu}
              width="30"
              height="30"
              tabIndex="0"
              onClick={this.toggleList}
              alt="menu"
            />
          </nav>
        ) : (
          " "
        )}

        <div
          id="listSection"
          tabIndex={this.state.listOpen ? "0" : "-1"}
          className={this.state.listOpen ? "list-open" : "list-hide"}
        >
          {this.state.mapReady ? (
            <PlaceList
              listOpen={this.state.listOpen}
              infoWindow={this.state.infoWindow}
              infoWindowOpen={this.state.infoWindowOpen}
              myMap={this.state.myMap}
              centerMap={this.state.centerMap}
              showFiltered={this.state.showFiltered}
              toggleList={this.toggleList}
              filterByName={this.filterByName}
              filterCategories={this.filterCategories}
              checkListIsOpen={this.checkListIsOpen}
            />
          ) : (
            <p>An error occurred, try again, please</p>
          )}
        </div>

        <div id="map">
          {this.state.mapError ? (
            <div id="mapError">The Map is not loading, try again</div>
          ) : (
            <div>Wait a moment, map is loading...</div>
          )}
        </div>
      </div>
    );
  }
}

export default scriptLoader([
  `https://maps.googleapis.com/maps/api/js?key=AIzaSyA_vkGYxkHZ4P1gcvKbu62XwvCEO96fVSY`
])(App);
