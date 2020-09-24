import React, { Component, Fragment } from "react";
import marked from "marked";
import {
  adminDeleteBlog,
  getAdminBlog,
  searchBlog,
  cancelSearch,
} from "../../actions/BlogActions";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/auth";
import axios from "axios";
import { getQuote } from "../../actions/quote";

class AdminBoard extends Component {
  constructor() {
    super();
    this.state = {
      search: "",
      logoUrl: "",
    };
    this.onChange = this.onChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.cancelSearch = this.cancelSearch.bind(this);
  }

  componentDidMount() {
    document.documentElement.style.setProperty("--topPadding", `90px`);
    this.props.getAdminBlog();
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

  render() {
    const { posts, searchPosts ,quote} = this.props;

    var blogs = null;

    if (searchPosts.length === 0) {
      blogs = posts.map((post) => {
        return (
          <div key={post.id} className="card mb-4">
            <img
              className="card-img-top"
              src={post.image}
              alt="Card image cap"
            />
            <div className="card-body">
              <div dangerouslySetInnerHTML={this.getMarkdownText(post.blog)} />
              <button
                className="btn btn-danger"
                onClick={this.props.adminDeleteBlog.bind(this, post.id)}
              >
                Delete
              </button>
            </div>
            <div className="card-footer text-muted">
              Posted on {this.dateFormatter(post.date)} by {post.creator}
            </div>
          </div>
        );
      });
    } else {
      blogs = searchPosts.map((post) => {
        return (
          <div key={post.id} className="card mb-4">
            <img
              className="card-img-top"
              src={post.image}
              alt="Card image cap"
            />
            <div className="card-body">
              <div dangerouslySetInnerHTML={this.getMarkdownText(post.blog)} />
              <button
                className="btn btn-danger"
                onClick={this.props.adminDeleteBlog.bind(this, post.id)}
              >
                Delete
              </button>
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
                    <button
                      className="btn btn-danger"
                      onClick={this.props.logoutUser}
                    >
                      Logout
                    </button>
                  </a>
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
              <h1 className="my-4">Welcome to Admin Dash board</h1>

              <div>{blogs}</div>
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
                        className="btn btn-primary"
                        onClick={this.handleSearch}
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

const mapStateToProps = (state) => ({
  posts: state.BlogReducer.adminBlogPosts,
  searchPosts: state.BlogReducer.searchArray,
  errors: state.errors.errors,
  quote: state.quotes.quote,
});

export default connect(mapStateToProps, {
  getAdminBlog,
  adminDeleteBlog,
  logoutUser,
  searchBlog,
  cancelSearch,
  getQuote,
})(AdminBoard);
