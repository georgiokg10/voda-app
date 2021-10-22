import React from "react";
import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";
import Container from "../components/Container";
import Footer from "../components/Footer/Footer";
import "./../styles.scss";

const Router = () => {
  return (
    <BrowserRouter>
      <div className="page-container">
        <Switch className="col pr-0 pl-0">
          <Redirect from="/" exact to="/home" />
          <Route exact path="/home" component={Container} />
          <Route exact path="/page2" component={Container} />
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default Router;
