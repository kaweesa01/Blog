import { GET_ERRORS, REMOVE_ERRORS } from "../actions/types";

const initialState = {
  errors: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        errors: [action.payload],
      };
    case REMOVE_ERRORS:
      return {
        errors: [],
      };
    default:
      return state;
  }
}
