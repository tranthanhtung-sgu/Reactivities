import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import ProfileHeader from "./ProfileHeader";
import "./ProfileStyle.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import ProfileMain from "./ProfileMain";
import { useParams } from "react-router";
import { useStore } from "../../app/stores/store";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import FollowTab from "./FollowTab";
import LoadingComponent from "../../app/layout/LoadingComponent";

export default observer(function ProfilePage() {
  const { username } = useParams<{ username: string }>();

  const {
    profileStore: { loadProfile, profile, loadingProfile, setActiveTab },
  } = useStore();

  const [button, setButton] = useState("");

  let { path, url } = useRouteMatch();

  console.log(path, " ", url);

  function changeButton(name: string) {
    setButton(name);
  }

  useEffect(() => {
    loadProfile(username);
    return () => {
      setActiveTab(0);
    };
  }, [loadProfile, setActiveTab, username]);
  if (loadingProfile) return <LoadingComponent content="Loading..." />;
  return (
    <main className="bg-light" style={{ width: "" }}>
      {/* Section: white background */}
      <section className="bg-white mb-4 shadow-2">
        {profile && <ProfileHeader button={button} setButton={changeButton} profile={profile} />}
      </section>
      {/* Section: grey background */}
      <Switch>
        <Route exact path={path}>
          <section style={{ backgroundColor: "#f0f2f5" }}>
            {profile && <ProfileMain button={button} profile={profile} />}
          </section>
        </Route>
        <Route path={`${path}/friends`}>
          <FollowTab profile={profile!} />
        </Route>
      </Switch>
    </main>
  );
});
