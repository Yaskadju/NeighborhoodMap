import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="container">
        <h1>Neighborhood Map</h1>
        <section>
          <Map />
        </section>
      </div>
    );
  }
}

export default App;
