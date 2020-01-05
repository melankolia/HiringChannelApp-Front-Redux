import { Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {};

  render() {
    return <Redirect to="/login" />;
  }
}

export default App;
