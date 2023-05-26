import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import Footer from "./Footer";
import InfiniteScrolling from "./InfiniteScrolling";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      {/* <InfiniteScrolling /> */}
      <Footer />
    </Provider>
  </React.StrictMode>
);
