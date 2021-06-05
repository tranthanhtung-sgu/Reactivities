import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import ProfileHeader from "./ProfileHeader";
import "./ProfileStyle.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import ProfileMain from "./ProfileMain";
import { useParams } from "react-router";
import { useStore } from "../../app/stores/store";

export default observer(function ProfilePage() {
  const { username } = useParams<{ username: string }>();
  const {
    profileStore: { loadProfile, profile },
  } = useStore();

  useEffect(() => {
    loadProfile(username);
    console.log(username);
  }, [loadProfile, username]);

  return (
    <main className="bg-light" style={{ width: "" }}>
      {/* Section: white background */}
      <section className="bg-white mb-4 shadow-2">{profile && <ProfileHeader profile={profile} />}</section>
      {/* Section: grey background */}
      <section style={{ backgroundColor: "#f0f2f5" }}>{profile && <ProfileMain profile={profile} />}</section>
    </main>
  );
});
