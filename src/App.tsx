import {
  BrowserRouter as Router,
  Route,
  Redirect
} from "react-router-dom";

import './App.css';

import Movies from "./Movies/List";

function App(props: any) {

  return (
    <div className="App">
      <header className="App-header">
        <a
          href="https://github.com/hamza-eljaouhari"
          target="_blank"
          rel="noreferrer"
        >
          Mon profil github
        </a>
      </header>
      <Router>
        <main>
          <Route path="/">
            <Redirect to="/movies/1" />
          </Route>
          <Route path="/movies/:pageNumber">
            <Movies></Movies>
          </Route>
        </main>
      </Router>
    </div>
  );
}

export default App;
