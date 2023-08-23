import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import Context from "./context/context";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <Context>
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  // </Context>
);
