import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { UserContextProvider } from "./Context/UserContext.jsx";
import { ToastContainer } from "react-toastify";
import { TodoContextProvider } from "./Context/TodoContext.jsx";
import Modal from 'react-modal';


// Set the app element for accessibility
Modal.setAppElement('#root'); // Replace '#root' with the actual ID of your app element



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserContextProvider>
      <TodoContextProvider>
        <Router>
          <App />
          <ToastContainer />
        </Router>
      </TodoContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);
