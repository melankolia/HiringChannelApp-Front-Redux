import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Login from "./Component/Login.jsx";
import Register from "./Component/Register.jsx";
import Home from "./Component/Home.jsx";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Engineer from "./Component/Engineer.jsx";
import Details from "./Component/Details.jsx";

import { Provider } from "react-redux";
import store from "./Redux/store.js"

const AppWithRoute = () => {
  return (
    <Router>
      <Route path="/" exact component={App} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/home" component={Home} />
      <Route path="/engineer" exact component={Engineer} />
      <Route path="/engineer/detail" component={Details} />
    </Router>
  );
};

const AppUsingRedux = () => {
  return (
    <Provider store = {store}>
      <AppWithRoute/>
    </Provider>
  )
}
ReactDOM.render(<AppUsingRedux />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
