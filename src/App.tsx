import logo from "./logo.svg";
import React from "react";
import Header from "./Header/Header";
import Videocards from "./Videocards/Videocards";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import VideoPlay from "./VideoPlay/VideoPlay";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/"></Route>
          <Route path="/search/:qfield">
            <Videocards num={1} />
          </Route>
          <Route path="/:qfield/:videoid">
            <div className="BoxofvideoinListView">
              <VideoPlay />
              <Videocards num={2} />
            </div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
