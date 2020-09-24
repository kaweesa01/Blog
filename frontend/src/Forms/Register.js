import React, { Component } from "react";
// import "../style/formStyle.css";
import { Link, Redirect } from "react-router-dom";
import { register } from "../actions/auth";
import { connect } from "react-redux";
import axios from "axios";

// import logo from "../../images/logo.png";
import "../../styles/css/main.css";

import store from "../store";
import { GET_ERRORS } from "../actions/types";

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      password2: "",
      logoUrl: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(ev) {
    ev.preventDefault();
    const { username, email, password, password2 } = this.state;

    if (password !== password2) {
      const err = {
        pass: ["Passwords must mutch"],
      };
      store.dispatch({
        type: GET_ERRORS,
        payload: err,
      });
    } else if (password.length < 8) {
      const err = {
        pass: ["Password must be atleast 8 Characters long"],
      };
      store.dispatch({
        type: GET_ERRORS,
        payload: err,
      });
    } else {
      const user = {
        username,
        email,
        password,
      };
      this.props.register(user);
    }
  }

  onChange(ev) {
    this.setState({
      [ev.target.name]: ev.target.value,
    });
  }

  componentDidMount() {
    document.documentElement.style.setProperty(
      "--topPadding",
      `0px`
    );
    axios
      .get("/api/logo/")
      .then((res) => {
        this.setState({
          logoUrl: res.data[0].image,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    if (this.props.isAuthenticated) {
      // document.documentElement.style.setProperty("--topMargin", "120px");
      return <Redirect to="/blogForm" />;
    }
    // } else {
    //   document.documentElement.style.setProperty("--topMargin", "20px");
    // }

    const { username, password1, email, password2 } = this.state;
    return (
      <div className="main-container vh-100">
        <div className="logo reg-logo">
          <img
            className="logo-img"
            alt="katwe-colab-logo"
            src={this.state.logoUrl}
          />
        </div>
        <form onSubmit={this.onSubmit} className="RegisterForm">
          <h1 className="text-center mb-5">SIGN UP</h1>
          <div className="icon">
            <i className="fas fa-user-circle"></i>
          </div>
          <div className="container">
            {this.props.errors.length === 0 ? null : this.props.errors[0]
                .username || this.props.errors[0].pass ? (
              <div className="card-header">
                <div className="alert alert-danger alert-dismissible fade show">
                  <button type="button" className="close" data-dismiss="alert">
                    &times;
                  </button>
                  <strong>Error!</strong>{" "}
                  {this.props.errors[0].username || this.props.errors[0].pass}
                </div>
              </div>
            ) : null}
            <hr className="f-width" />
            <div className="container d-flex flex-column align-items-center justify-content-center">
              <div className="form-group">
                <label>
                  <strong>Username</strong>
                </label>
                <input
                  type="text"
                  placeholder="Enter Username"
                  value={username}
                  className="form-control f-width"
                  onChange={this.onChange}
                  name="username"
                  required
                />
              </div>
              <div className="form-group">
                <label>
                  <strong>E-mail</strong>
                </label>
                <input
                  type="text"
                  placeholder="Enter E-mail"
                  name="email"
                  value={email}
                  className="form-control f-width"
                  onChange={this.onChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>
                  <strong>Password</strong>
                </label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                  value={password1}
                  className="form-control f-width"
                  onChange={this.onChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>
                  <strong>Confirm Password</strong>
                </label>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  name="password2"
                  value={password2}
                  className="form-control f-width"
                  onChange={this.onChange}
                  required
                />
              </div>
              <button className="btn btn-primary mb-2" type="submit">
                <strong>SIGN UP</strong>
              </button>
              <div className="container">
                <div className="psw">
                  <span className="link-container">
                    <Link className="link" to="/login">
                      Already have an account.
                    </Link>
                    <Link className="link" to="/">
                      Back to blog posts
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  errors: state.errors.errors,
});

export default connect(mapStateToProps, { register })(RegisterForm);
