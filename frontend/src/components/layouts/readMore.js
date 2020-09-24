import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import marked from "marked";
import { Link } from "react-router-dom";
import "../../../styles/css/blog-home.css";
import axios from "axios";
import { getQuote } from "../../actions/quote";

class ReadMore extends Component {
  constructor() {
    super();
    this.state = {
      logoUrl: "",
    };
  }

  componentDidMount() {
    document.documentElement.style.setProperty("--topPadding", `90px`);
    this.props.getQuote();

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

  getMarkdownText(blog) {
    var rawMarkup = marked(`${blog}`);
    return { __html: rawMarkup };
  }

  render() {
    const { post ,quote} = this.props;
    return (
      <Fragment>
        <nav className="navbar navbar-expand-lg navbar-light shadow-lg bg-light fixed-top">
          <div className="container">
            <a className="navbar-brand" href="#">
              <img width="50px" height="50px" src={this.state.logoUrl} />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarResponsive"
              aria-controls="navbarResponsive"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item active">
                  <a className="nav-link" href="#">
                    Home
                    <span className="sr-only">(current)</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    About
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Services
                  </a>
                </li>
                <li className="nav-item">
                  <Link to="/blogForm" className="nav-link">
                    Blog with us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* <!-- Page Content --> */}
        <div className="container">
          <div className="row">
            {/* <!-- Blog Entries Column --> */}
            <div className="col-md-8">
              <h1 className="my-4">
                Katwe colab <br />
                <small>Knowledge sharing center</small>
              </h1>

              <div className="card mb-4">
                <img
                  className="card-img-top"
                  height=""
                  src={post.image}
                  alt="Card image cap"
                />
                <div className="card-body">
                  <div
                    dangerouslySetInnerHTML={this.getMarkdownText(post.blog)}
                  />
                  <a href="/" className="btn btn-primary">
                    &larr; Back
                  </a>
                </div>
                <div className="card-footer text-muted">
                  Posted by {post.creator}
                </div>
              </div>

              {/* <!-- Pagination --> */}
            </div>

            {/* <!-- Sidebar Widgets Column --> */}
            <div className="col-md-4">
              {/* <!-- Side Widget --> */}

              <div className="card my-4">
                <h5 className="card-header">Quote of the day</h5>
                <div className="card-body">
                  <div className="card-body">
                    <blockquote className="blockquote">
                      <p>{quote.quote}</p>
                      <footer className="blockquote-footer">
                        By {quote.title}{" "}
                      </footer>
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="py-5 bg-primary">
          <div className="container">
            <p className="m-0 text-center text-white">
              Copyright &copy; Katwe Colab 2020
            </p>
          </div>
        </footer>
      </Fragment>
    );
  }
}

const mapSateToProps = (state) => ({
  post: state.readMore.post,
  quote: state.quotes.quote,
});

export default connect(mapSateToProps, { getQuote})(ReadMore);
