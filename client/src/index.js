import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app/App";
import "./css/App.css";
import store from "./context/store/globalStore";
import { Provider } from "react-redux";
const root = ReactDOM.createRoot(document.getElementById("root"));
const Apps = () => {
  return (
    <BrowserRouter basename="/">
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  );
};
root.render(<Apps />);
