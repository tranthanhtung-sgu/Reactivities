import { observer } from "mobx-react-lite";
import React from "react";
import { Tab } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import ProfileFollowCard from "./ProfileFollowCard";

export default observer(function ProfileFollowList() {
  const {
    profileStore: { loadingFollowing, followings },
  } = useStore();

  return (
    <Tab.Pane loading={loadingFollowing}>
      <div className="container">
        <div className="row g-2">
          {followings.map((profile) => (
            <div className="col-6" key={profile.username}>
              <ProfileFollowCard profile={profile} />
            </div>
          ))}
        </div>
      </div>
    </Tab.Pane>
  );
});
