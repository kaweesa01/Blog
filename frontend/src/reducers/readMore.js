import { READ_MORE } from "../actions/types";
const initialState = {
  post: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case READ_MORE:
      return {
        post: action.payload
      }
    default:
      return state;
  }
}
