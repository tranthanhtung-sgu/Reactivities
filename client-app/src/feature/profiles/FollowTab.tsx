import { observer } from "mobx-react-lite";
import React from "react";
import { Tab } from "semantic-ui-react";
import { Profile } from "../../app/layout/models/profile";
import { useStore } from "../../app/stores/store";
import ProfileFollowList from "./Follow/ProfileFollowList";

interface Props {
  profile: Profile;
}

export default observer(function FollowList({ profile }: Props) {
  const { profileStore } = useStore();
  const panes = [
    {
      menuItem: "Bạn chung",
      render: () => (
        <Tab.Pane attached={false}>
          <ProfileFollowList />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Đang theo dõi",
      render: () => (
        <Tab.Pane attached={false}>
          <ProfileFollowList />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Người theo dõi",
      render: () => (
        <Tab.Pane attached={false}>
          <ProfileFollowList />
        </Tab.Pane>
      ),
    },
  ];
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="card rounded-6">
            <div className="card-body" style={{ minHeight: 500 }}>
              <div className="d-flex justify-content-between">
                <h5 className="card-title fs-4">
                  <strong>Bạn bè</strong>
                </h5>
                <input className="search__follow" style={{ width: 280 }} type="text" placeholder={`Tìm kiếm`} />
              </div>
              <Tab
                menu={{ fluid: true, secondary: true }}
                menuPosition="right"
                panes={panes}
                onTabChange={(e, data) => {
                  profileStore.setActiveTab(data.activeIndex);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
