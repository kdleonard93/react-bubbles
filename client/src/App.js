import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import "./styles.scss";
import BubblePage from "./components/BubblePage";

function App() {
  return (
    <Router>
      <div className="App">
        <Link to="/login">login</Link>
        <Link to="/BubblesPage">BubblePage</Link>
        <Route exact path="/login" component={Login} />
        <Route exact path="/BubblesPage" component={BubblePage} />
      </div>
    </Router>
  );
}

export default App;
