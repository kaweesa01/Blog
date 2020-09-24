import { GET_QUOTE } from "../actions/types";
import axios from "axios";

export const getQuote = () => (dispatch) => {
  // quotesData.quotes[Math.floor(Math.random() * quotesData.quotes.length)]

  axios
    .get(
      `https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json`
    )
    .then((res) => {
      const { quote, author } = res.data.quotes[
        Math.floor(Math.random() * res.data.quotes.length)
      ];
      dispatch({
        type: GET_QUOTE,
        payload: {
          title: author,
          quote,
        },
      });
    })
    .catch((err) => console.log(err.response));
};
