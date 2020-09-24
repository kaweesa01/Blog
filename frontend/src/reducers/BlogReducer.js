import {
  ADD_BLOG_POST,
  GET_BLOG_POSTS,
  DELETE_BLOG_POSTS,
  GET_EDIT_BLOG_POST,
  EDIT_BLOG_POST,
  GET_USER_BLOG_POSTS,
  ADMIN_DELETE_BLOG_POSTS,
  SEARCH_BLOG,
  GET_ADMIN_BLOG_POSTS,
  CANCEL_SEARCH,
} from "../actions/types";

const initialstate = {
  blogPosts: [],
  adminBlogPosts: [],
  userBlogPosts: [],
  blogEdit: {},
  searchArray: [],
  next: "",
  previous: "",
};

export default function (state = initialstate, action) {
  switch (action.type) {
    case ADD_BLOG_POST:
      return {
        ...state,
        userBlogPosts: [...state.userBlogPosts, action.payload],
      };
    case GET_USER_BLOG_POSTS:
      return {
        ...state,
        userBlogPosts: [...action.payload],
      };
    case GET_BLOG_POSTS:
      return {
        ...state,
        next: action.payload.next,
        previous: action.payload.previous,
        blogPosts: [...action.payload.results],
      };
    case SEARCH_BLOG:
      return {
        ...state,
        searchArray: [...action.payload],
      };
    case CANCEL_SEARCH:
      return {
        ...state,
        searchArray: [],
      };
    case DELETE_BLOG_POSTS:
      return {
        ...state,
        userBlogPosts: [
          ...state.userBlogPosts.filter((cur) => cur.id !== action.payload),
        ],
      };
    case GET_ADMIN_BLOG_POSTS:
      return {
        ...state,
        adminBlogPosts: [...action.payload],
      };
    case ADMIN_DELETE_BLOG_POSTS:
      return {
        ...state,
        adminBlogPosts: [
          ...state.adminBlogPosts.filter((cur) => cur.id !== action.payload),
        ],
      };
    case GET_EDIT_BLOG_POST:
      return {
        ...state,
        blogEdit: action.payload,
      };
    case EDIT_BLOG_POST:
      return {
        ...state,
        userBlogPosts: [
          ...state.userBlogPosts.filter((cur) => cur.id !== action.payload.id),
          action.payload,
        ],
      };
    default:
      return state;
  }
}
