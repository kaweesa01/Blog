import React, { Component } from "react";
// import "../style/formStyle.css";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../actions/auth";
import axios from "axios";
import "../../styles/css/main.css";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      logoUrl: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(ev) {
    this.setState({
      [ev.target.name]: ev.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const { username, password } = this.state;
    this.props.login(username, password);
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
      //document.documentElement.style.setProperty("--topMargin", "120px");

      if (this.props.user.username === "superuser") {
        return <Redirect to="/adminBoard" />;
      } else if (this.props.user.username !== "superuser") {
        return <Redirect to="/blogForm" />;
      }
    }
    // }else{
    //   document.documentElement.style.setProperty("--topMargin", "20px");
    // }

    const { username, password } = this.state;
    return (
      <div className="main-container">
        <div className="logo">
          <img
            className="logo-img"
            alt="katwe-colab-logo"
            src={this.state.logoUrl}
          />
        </div>
        <form onSubmit={this.onSubmit} className="">
          <h1 className="text-center mb-5">Login Form</h1>
          <div className="container ">
            {this.props.errors.length === 0 ? null : this.props.errors[0]
                .non_field_errors ? (
              <div className="card-header">
                <div className="alert alert-danger alert-dismissible fade show">
                  <button type="button" className="close" data-dismiss="alert">
                    &times;
                  </button>
                  <strong>Error!</strong>{" "}
                  {this.props.errors[0].non_field_errors}
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
                  name="username"
                  value={username}
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
                  value={password}
                  className="form-control f-width"
                  onChange={this.onChange}
                  required
                />
              </div>
              <button className="btn btn-primary mb-2" type="submit">
                Login
              </button>
              <div className="">
                <div className="psw">
                  <span className="link-container">
                    <Link to="/register" className="link">
                      Don't have an Account?
                    </Link>
                    <Link to="/" className="link">
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
  user: state.auth.user,
});

export default connect(mapStateToProps, { login })(LoginForm);
