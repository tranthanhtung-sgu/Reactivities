/* eslint-disable jsx-a11y/anchor-is-valid */
import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Icon, Popup } from "semantic-ui-react";
import { Profile } from "../../../app/layout/models/profile";
import { useStore } from "../../../app/stores/store";
interface Props {
  profile: Profile;
}
export default observer(function ProfileFollowCard({ profile }: Props) {
  const {
    userStore: { user },
    profileStore: { updateFollowing },
  } = useStore();

  function handleFollow(username: string) {
    profile.following ? updateFollowing(username, false) : updateFollowing(username, true);
    console.log(profile.following);
  }
  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <div className="square__avatar">
              <img
                style={{ width: "80px", borderRadius: 10, marginRight: 20 }}
                src={profile.image || "/assets/user.png"}
                alt=""
              />
            </div>
            <div className="detail__profile ml-4">
              <div className="name">
                <a className="link__underscore__black" href={`/profiles/${profile.username}`}>
                  <h5>{profile.displayName}</h5>
                </a>
              </div>
              <div className="mutual__friends text-muted">200 bạn chung</div>
            </div>
          </div>
          <Popup
            position="bottom left"
            trigger={
              <Button
                color="black"
                className="btn__options_comment"
                icon
                style={{ marginLeft: 10, textAlign: "center" }}
              >
                <i className="fas fa-ellipsis-h"></i>
              </Button>
            }
            on="click"
          >
            {profile.username !== user?.username ? (
              <Button
                type="button"
                className="btn btn-link text-reset fs-6 rounded-4 mx-1 img__mainphoto"
                data-mdb-ripple-color="dark"
                // name={"main" + photo.id}
                onClick={() => handleFollow(profile.username)}
              >
                <Icon circular name="user plus" /> {profile.following ? "Đã theo dõi" : "Theo dõi"}
              </Button>
            ) : (
              ""
            )}

            <Button
              type="button"
              className="btn btn-link text-reset fs-6 rounded-4 mx-1 img__delete"
              data-mdb-ripple-color="dark"
              // disabled={photo.isMain}
              // name={photo.id}
              // loading={target === photo.id && loading}
              // onClick={(e) => handleDeletePhoto(photo, e)}
            >
              <i className="fas fa-user-times" style={{ marginRight: 10 }}></i>{" "}
              {profile.username === user?.username ? "Đây là bạn" : "Huỷ kết bạn"}
            </Button>
          </Popup>
          {/* <button className="btn btn__options_comment mb-3" style={{ marginLeft: 10, textAlign: "center" }}>
            <i className="fas fa-ellipsis-h" style={{ marginLeft: -4 }}></i>
          </button> */}
        </div>
      </div>
    </div>
  );
});
