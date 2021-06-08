/* eslint-disable jsx-a11y/anchor-is-valid */
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStore } from "../../app/stores/store";
import Center from "./Center";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import "/Users/tranthanhtung/Desktop/Reactivities/client-app/src/feature/Facebook/sty.css";
export default observer(function Home() {
  const {
    postStore: { postRegistry, loadPosts, loadingInitial },
  } = useStore();
  useEffect(() => {
    if (postRegistry.size <= 1) loadPosts();
  }, [postRegistry.size, loadPosts]);
  if (loadingInitial) return <LoadingComponent content="Loading..." />;
  return (
    <div className="">
      <div className="d-flex justify-content-between">
        <LeftSide />
        <Center />
        <RightSide />
      </div>
    </div>
  );
});
