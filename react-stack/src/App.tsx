import React from "react";
import "./App.css";
import { BrowserRouter, NavLink, Route, Switch } from "react-router-dom";
import * as pages from "./pages";

const Navigation = () => (
  <>
    {Object.values(pages).map((Page) => (
      <p key={Page.name}>
        <NavLink to={`/${Page.name}`}>{Page.name}</NavLink>
      </p>
    ))}
  </>
);

const Switcher = () => (
  <>
    <Switch>
      {Object.values(pages).map((Page) => (
        <Route key={Page.name} path={`/${Page.name}`} component={Page} />
      ))}
    </Switch>
  </>
);

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <p>---</p>
        <Switcher />
      </BrowserRouter>
    </div>
  );
}

export default App;
