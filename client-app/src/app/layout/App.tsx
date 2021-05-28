import React from "react";
import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import ActivityDashboard from "../../feature/activities/dashboard/ActivityDashboard";
import { observer } from "mobx-react-lite";
import { Route, Switch, useLocation } from "react-router";
import HomePage from "../../feature/home/HomePage";
import ActivityForm from "../../feature/activities/form/ActivityForm";
import ActivityDetails from "../../feature/activities/details/ActivityDetails";
import { ToastContainer } from "react-toastify";
import TestErrors from "../../feature/errors/TestError";
import NotFound from "../../feature/errors/NotFound";
import ServerErrors from "../../feature/errors/ServerErrors";

function App() {
  const locaction = useLocation();
  return (
    <>
      <ToastContainer position="bottom-right" hideProgressBar />
      <Route exact path={"/"} component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <>
            <NavBar />
            <Container style={{ marginTop: "7em" }}>
              <Switch>
                <Route path={"/errors"} component={TestErrors} />
                <Route exact path={"/activities"} component={ActivityDashboard} />
                <Route path={"/activities/:id"} component={ActivityDetails} />
                <Route key={locaction.key} path={["/createActivity", "/manage/:id"]} component={ActivityForm} />
                <Route path={'/server-error'} component={ServerErrors} />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </>
        )}
      />
    </>
  );
}

export default observer(App);
