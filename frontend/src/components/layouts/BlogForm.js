import React, { Component, Fragment } from "react";
import marked from "marked";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/auth";
import { getUserBlog } from "../../actions/BlogActions";
import axios from 'axios'
import {
  addBlog,
  deleteBlog,
  getEditBlog,
  editBlog,
} from "../../actions/BlogActions";

class BlogForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      image: null,
      blog: "",
      logoUrl: "",
      imageUrl: null,
      creator: this.props.user,
    };
    this.onChange = this.onChange.bind(this);
    this.handleImage = this.handleImage.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(ev) {
    this.setState({
      [ev.target.name]: ev.target.value,
    });
  }

  componentDidMount() {
    // this.props.getBlog();
    this.props.getUserBlog();
  }

  componentDidUpdate(prevProps) {
    document.documentElement.style.setProperty("--topPadding", `90px`);
    if (prevProps.blogEdit !== this.props.blogEdit) {
      this.setState(this.props.blogEdit);
    }
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

  onSubmit(ev) {
    ev.preventDefault();

    const { image, blog, id, creator } = this.state;

    if (id === null) {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("blog", blog);
      formData.append("creator", creator);

      this.props.addBlog(formData);
    } else if (id !== null) {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("blog", blog);

      this.props.editBlog(id, formData);
    }

    this.setState({
      id: null,
      image: null,
      blog: "",
    });
  }

  handleImage(ev) {
    this.setState({
      image: ev.target.files[0],
      imageUrl: URL.createObjectURL(ev.target.files[0]),
    });
  }

  getMarkdownText(blog) {
    var rawMarkup = marked(`${blog}`);
    return { __html: rawMarkup };
  }

  render() {
    const { posts } = this.props;

    const blogs = posts.map((post) => {
      return (
        <div className="card m-2" key={post.id}>
          <div className="card-body">
            <div dangerouslySetInnerHTML={this.getMarkdownText(post.blog)} />
          </div>
          <div className="card-footer">
            <button
              className="btn btn-primary m-1"
              onClick={this.props.getEditBlog.bind(this, post.id)}
            >
              Update
            </button>
            <button
              className="btn btn-danger m-1"
              onClick={this.props.deleteBlog.bind(this, post.id)}
            >
              Delete
            </button>
          </div>
        </div>
      );
    });
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
                  <button
                    className="btn btn-danger"
                    onClick={this.props.logoutUser}
                  >
                    Logout
                  </button>
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
                Welcome {this.props.user} <br />
                <small>Sharing your knowledge</small>
              </h1>

              <div className="card mb-4">
                <form onSubmit={this.onSubmit}>
                  <div className="card-img-top"></div>

                  {this.props.errors.length === 0 ? null : this.props.errors[0]
                      .blog ? (
                    <div className="card-header">
                      <div className="alert alert-danger alert-dismissible fade show">
                        <button
                          type="button"
                          className="close"
                          data-dismiss="alert"
                        >
                          &times;
                        </button>
                        <strong>Error!</strong> {this.props.errors[0].blog}
                      </div>
                    </div>
                  ) : null}

                  <div className="card-body">
                    <textarea
                      onChange={this.onChange}
                      name="blog"
                      value={this.state.blog}
                      className="form-control"
                      cols="50"
                      rows="10"
                    ></textarea>
                  </div>

                  {this.props.errors.length === 0 ? null : this.props.errors[0]
                      .image ? (
                    <div className="card-header">
                      <div className="alert alert-danger alert-dismissible fade show">
                        <button
                          type="button"
                          className="close"
                          data-dismiss="alert"
                        >
                          &times;
                        </button>
                        <strong>Error!</strong>{" "}
                        {this.props.errors[0].image[0].split(".")[0]}
                      </div>
                    </div>
                  ) : null}

                  <div className="card-footer text-muted">
                    <input
                      multiple={false}
                      type="file"
                      onChange={this.handleImage}
                    />

                    <button className="btn btn-primary m-1" type="submit">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* <!-- Sidebar Widgets Column --> */}
            <div className="col-md-4">
              <div className="card my-4">
                <h5 className="card-header">Preview Area</h5>
                <div className="card-body">
                  <div
                    dangerouslySetInnerHTML={this.getMarkdownText(
                      this.state.blog
                    )}
                  />
                </div>
              </div>

              {/* <!-- Side Widget --> */}

              <div className="card my-4">
                <h5 className="card-header">Your Posts</h5>
                {this.props.posts.length === 0 ? (
                  <p className="text-center lead">
                    You haven't shared any knownledge
                  </p>
                ) : (
                  blogs
                )}
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
  posts: state.BlogReducer.userBlogPosts,
  blogEdit: state.BlogReducer.blogEdit,
  user: state.auth.user.username,
  errors: state.errors.errors,
});

export default connect(mapStateToProps, {
  addBlog,
  deleteBlog,
  getEditBlog,
  editBlog,
  logoutUser,
  getUserBlog,
})(BlogForm);
