import { GET_QUOTE } from "../actions/types";

const initialState = {
  quote: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_QUOTE:
      return {
        quote: action.payload,
      };
    default:
      return state;
  }
}
