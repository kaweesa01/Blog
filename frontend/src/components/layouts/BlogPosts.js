import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import {
  getBlog,
  getUserBlog,
  searchBlog,
  readMore,
  cancelSearch,
} from "../../actions/BlogActions";
import marked from "marked";
import { Link } from "react-router-dom";
import { loadUser } from "../../actions/auth";
import "../../../styles/css/blog-home.css";
import axios from "axios";
import { getQuote } from "../../actions/quote";

class BlogPost extends Component {
  constructor() {
    super();
    this.state = {
      search: "",
      logoUrl: "",
    };
    this.onChange = this.onChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.cancelSearch = this.cancelSearch.bind(this);
    this.navigatePage = this.navigatePage.bind(this);
    this.Converter = this.Converter.bind(this);
  }

  componentDidMount() {
    const url = "/api/blog/";

    this.props.getBlog(url);
    this.props.loadUser();
    this.props.getUserBlog();
    this.props.getQuote();

    document.documentElement.style.setProperty("--topPadding", `90px`);

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

  dateFormatter(date) {
    const dateTimeArray = date.split(":");
    const dateArray = dateTimeArray[0].split("T")[0];
    return dateArray;
  }

  getMarkdownText(blog) {
    var rawMarkup = marked(`${blog}`);
    return { __html: rawMarkup };
  }

  onChange(ev) {
    this.setState({
      [ev.target.name]: ev.target.value,
    });
  }

  navigatePage(ev) {
    this.props.getBlog(ev.target.name);
  }

  handleSearch() {
    const { search } = this.state;
    const { posts } = this.props;

    this.props.searchBlog(posts, search);
  }

  cancelSearch() {
    this.props.cancelSearch();
    this.setState({
      search: "",
    });
  }

  Converter = (content, limit = 150) => {
    const newContent = [];
    if (content.length > limit) {
      content.split(" ").reduce((acc, cur) => {
        if (acc + cur.length <= limit) {
          newContent.push(cur);
        }
        return acc + cur.length;
      }, 0);

      // return the result
      const filtered = newContent.filter((cur) => {
        return cur != "";
      });
      return `${filtered.join(" ")} ...`;
    }
    return content;
  };

  getLength(content) {
    const newArray = content.split(" ");
    const filtered = newArray.filter((cur) => {
      return cur != "";
    });
    return filtered.length;
  }

  render() {
    const { posts, searchPosts,quote } = this.props;

    var postCard = null;

    if (searchPosts.length === 0) {
      postCard = posts.map((post) => {
        return (
          <div key={post.id} className="card mb-4">
            <img
              className="card-img-top"
              height=""
              src={post.image}
              alt="Card image cap"
            />
            <div className="card-body">
              <div
                dangerouslySetInnerHTML={this.getMarkdownText(
                  this.Converter(post.blog)
                )}
              />

              {this.getLength(post.blog) < 31 ? null : (
                <Link
                  to="/readMore"
                  onClick={this.props.readMore.bind(this, post.id)}
                  className="btn btn-primary"
                >
                  Read More &rarr;
                </Link>
              )}
            </div>
            <div className="card-footer text-muted">
              Posted on {this.dateFormatter(post.date)} by {post.creator}
            </div>
          </div>
        );
      });
    } else {
      postCard = searchPosts.map((post) => {
        return (
          <div key={post.id} className="card mb-4">
            <img
              className="card-img-top"
              height=""
              src={post.image}
              alt="Card image cap"
            />
            <div className="card-body">
              <div dangerouslySetInnerHTML={this.getMarkdownText(post.blog)} />
              {/* <a href="#" className="btn btn-primary">
                Read More &rarr;
              </a> */}
            </div>
            <div className="card-footer text-muted">
              Posted on {this.dateFormatter(post.date)} by {post.creator}
            </div>
          </div>
        );
      });
    }

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

              <div>{postCard}</div>

              {/* <!-- Pagination --> */}
              <ul className="pagination justify-content-center mb-4">
                {this.props.nextPrev.previous !== null ? (
                  <li className="page-item">
                    <a
                      onClick={this.navigatePage}
                      href="#"
                      name={this.props.nextPrev.previous}
                      className="btn btn-link"
                    >
                      &larr; Previous
                    </a>
                  </li>
                ) : null}
                {this.props.nextPrev.next !== null ? (
                  <li className="page-item">
                    <a
                      onClick={this.navigatePage}
                      href="#"
                      name={this.props.nextPrev.next}
                      className="btn btn-link"
                    >
                      Next &rarr;
                    </a>
                  </li>
                ) : null}
              </ul>
            </div>

            {/* <!-- Sidebar Widgets Column --> */}
            <div className="col-md-4">
              {/* <!-- Search Widget --> */}
              <div className="card my-4">
                <h5 className="card-header">Search</h5>

                {this.props.errors.length === 0 ? null : this.props.errors[0]
                    .msg ? (
                  <div className="card-header">
                    <div className="alert alert-danger alert-dismissible fade show">
                      <button
                        type="button"
                        className="close"
                        data-dismiss="alert"
                      >
                        &times;
                      </button>
                      <strong>Error!</strong> {this.props.errors[0].msg}
                    </div>
                  </div>
                ) : null}

                <div className="card-body">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.search}
                      name="search"
                      onChange={this.onChange}
                      placeholder="Search by blogger..."
                    />
                    <span className="input-group-append">
                      <button
                        onClick={this.handleSearch}
                        className="btn btn-primary"
                        type="button"
                      >
                        Go!
                      </button>
                    </span>
                  </div>
                </div>
              </div>

              {/* <!-- Side Widget --> */}

              {this.props.searchPosts.length >= 1 ? (
                <div className="card my-4">
                  <h5 className="card-header">
                    Results found {this.props.searchPosts.length}
                  </h5>
                  <div className="card-body">
                    <button
                      onClick={this.cancelSearch}
                      className="btn btn-danger"
                      type="button"
                    >
                      Cancel search
                    </button>
                  </div>
                </div>
              ) : null}

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
  posts: state.BlogReducer.blogPosts,
  nextPrev: state.BlogReducer,
  searchPosts: state.BlogReducer.searchArray,
  errors: state.errors.errors,
  quote: state.quotes.quote,
});

export default connect(mapSateToProps, {
  getBlog,
  readMore,
  loadUser,
  getUserBlog,
  searchBlog,
  cancelSearch,
  getQuote,
})(BlogPost);
