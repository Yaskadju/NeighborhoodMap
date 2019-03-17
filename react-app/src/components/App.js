import React, { Component } from "react";
import "./App.css";
import MapView from "../components/MapView";

class App extends Component {
  render() {
    return (
      <div className="container">
        <h1>Neighborhood Map</h1>
        <section>
          <MapView />
        </section>
      </div>
    );
  }
}

export default App;
