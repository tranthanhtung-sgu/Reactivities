import React from "react";
import { Redirect, Route, RouteComponentProps, RouteProps } from "react-router";
import { useStore } from "../stores/store";
interface Props extends RouteProps {
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
}

export default function PrivateRoute({ component: Component, ...rest }: Props) {
  const {
    userStore: { IsLoggedIn },
  } = useStore();
  return <Route {...rest} render={(props) => (IsLoggedIn ? <Component {...props} /> : <Redirect to="/" />)} />;
}
