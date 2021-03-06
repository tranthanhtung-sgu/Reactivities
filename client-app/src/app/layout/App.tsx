import React, { useEffect } from "react";
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
import LoginForm from "../../feature/users/LoginForm";
import { useStore } from "../stores/store";
import LoadingComponent from "./LoadingComponent";
import ModalContainer from "../common/modals/ModalContainer";
import ProfilePage from "../../feature/profiles/ProfilePage";
import Home from "../../feature/Facebook/Home";
import PrivateRoute from "./PrivateRoute";

function App() {
  const locaction = useLocation();
  const { commonStore, userStore } = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setApploaded());
    } else {
      commonStore.setApploaded();
    }
  }, [commonStore, userStore]);

  if (!commonStore.appLoaded) return <LoadingComponent content="Loading..." />;

  return (
    <>
      <ToastContainer position="bottom-right" hideProgressBar />
      <ModalContainer />
      <Route exact path={"/"} component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <>
            <NavBar />
            <div style={{ marginTop: "7em" }}>
              <Switch>
                <Route path={"/errors"} component={TestErrors} />
                {/* <Route exact path={"/activities"} component={ActivityDashboard} /> */}
                <PrivateRoute path={"/activities/:id"} component={ActivityDetails} />
                <PrivateRoute key={locaction.key} path={["/createActivity", "/manage/:id"]} component={ActivityForm} />
                <PrivateRoute path={"/server-error"} component={ServerErrors} />
                <PrivateRoute path={"/login"} component={LoginForm} />
                <PrivateRoute path={"/profiles/:username"} component={ProfilePage} />
                <PrivateRoute path={"/home"} component={Home} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </>
        )}
      />
    </>
  );
}

export default observer(App);
