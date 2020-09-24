import React, { Component, Fragment } from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";

import BlogForm from "../components/layouts/BlogForm";
import BlogPost from "../components/layouts/BlogPosts";

import store from "../store";

import LoginForm from "../components/../Forms/Login";
import RegisterForm from "../components/../Forms/Register";

import PrivateRoute from "../PrivateRoutes/Private";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import AdminBoard from "../components/layouts/AdminBoard";

import "../../styles/css/bootstrap.min.css";
import { loadUser } from "../actions/auth";
import ReadMore from "../components/layouts/readMore";

import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import Alert from "../alert/alert";


import "bootstrap/dist/js/bootstrap.bundle.min.js";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    const options = {
      positions: positions.TOP_CENTER,
      timeout: 2000,
      offset: "80px",
      transition: transitions.SCALE,
    };
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...options}>
          <Router>
            <Fragment>
              <Alert />
              <Switch>
                <PrivateRoute exact path="/blogForm" component={BlogForm} />
                <PrivateRoute exact path="/adminBoard" component={AdminBoard} />
                <Route exact path="/" component={BlogPost} />
                <Route exact path="/readMore" component={ReadMore} />
                <Route exact path="/register" component={RegisterForm} />
                <Route exact path="/login" component={LoginForm} />
              </Switch>
            </Fragment>
          </Router>
        </AlertProvider>
      </Provider>
    );
  }
}

ReactDom.render(<App />, document.getElementById("app"));

export default App;
