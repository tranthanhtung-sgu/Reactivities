/* eslint-disable jsx-a11y/anchor-is-valid */
import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { useStore } from "../../app/stores/store";
import FormPost from "../posts/FormPost";
import Post from "../posts/Post";
export default observer(function Center() {
  const {
    postStore: { postsByDate },
    userStore: { user },
  } = useStore();
  const { modalStore } = useStore();
  return (
    <div className="center__content" style={{ paddingLeft: 50, paddingRight: 50 }}>
      <div>
        <div className="stories d-flex w-auto">
          <div
            className="story"
            style={{
              backgroundImage: "url(/assets/user.png)",
              width: 112,
              height: 200,
              margin: 5,
              borderRadius: 10,
              backgroundSize: "100% 100%",
            }}
          >
            <img
              style={{ height: 50, borderRadius: 999, marginLeft: 10, marginTop: 10 }}
              className="avatar"
              src="https://res.cloudinary.com/images-store/image/upload/v1622545740/idutyugjcvywsz7qstv6.jpg"
              alt=""
            />
          </div>
          <div
            className="story"
            style={{
              backgroundImage: "url(/assets/user.png)",
              width: 112,
              height: 200,
              margin: 5,
              borderRadius: 10,
              backgroundSize: "100% 100%",
            }}
          >
            <img
              style={{ height: 50, borderRadius: 999, marginLeft: 10, marginTop: 10 }}
              className="avatar"
              src="https://res.cloudinary.com/images-store/image/upload/v1622545740/idutyugjcvywsz7qstv6.jpg"
              alt=""
            />
          </div>
          <div
            className="story"
            style={{
              backgroundImage: "url(/assets/user.png)",
              width: 112,
              height: 200,
              margin: 5,
              borderRadius: 10,
              backgroundSize: "100% 100%",
            }}
          >
            <img
              style={{ height: 50, borderRadius: 999, marginLeft: 10, marginTop: 10 }}
              className="avatar"
              src="https://res.cloudinary.com/images-store/image/upload/v1622545740/idutyugjcvywsz7qstv6.jpg"
              alt=""
            />
          </div>
          <div
            className="story"
            style={{
              backgroundImage: "url(/assets/user.png)",
              width: 112,
              height: 200,
              margin: 5,
              borderRadius: 10,
              backgroundSize: "100% 100%",
            }}
          >
            <img
              style={{ height: 50, borderRadius: 999, marginLeft: 10, marginTop: 10 }}
              className="avatar"
              src="https://res.cloudinary.com/images-store/image/upload/v1622545740/idutyugjcvywsz7qstv6.jpg"
              alt=""
            />
          </div>
          <div
            className="story"
            style={{
              backgroundImage: "url(/assets/user.png)",
              width: 112,
              height: 200,
              margin: 5,
              borderRadius: 10,
              backgroundSize: "100% 100%",
            }}
          >
            <img
              style={{ height: 50, borderRadius: 999, marginLeft: 10, marginTop: 10 }}
              className="avatar"
              src="https://res.cloudinary.com/images-store/image/upload/v1622545740/idutyugjcvywsz7qstv6.jpg"
              alt=""
            />
          </div>
        </div>
        <div className="card w-100 rounded-6">
          <div className="card-body">
            <div className="d-flex">
              <a href={`/profiles/${user?.username}`}>
                <img
                  src={user?.image || "/assets/user.png"}
                  alt=""
                  style={{ height: "50px" }}
                  className="rounded-circle border mr-2"
                />
              </a>
              <button
                onClick={() => modalStore.openModal(<FormPost />)}
                style={{ marginLeft: 20, background: "#f0f2f5", textTransform: "none", textAlign: "start" }}
                className="btn btn-block btn-rounded fs-5 text-muted"
              >
                <p>B???n ??ang ngh?? g???</p>
              </button>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <button
                className="btn btn-light rounded-3 fs-5 btn-mind"
                style={{ background: "#f0f2f5", textTransform: "none", textAlign: "start", color: "GrayText" }}
              >
                <i className="fas fa-video" style={{ color: "red" }}></i>
                <p style={{ marginLeft: "10px" }} className="d-inline-block">
                  Video tr???c ti???p
                </p>
              </button>
              <button
                className="btn btn-light rounded-3 fs-5 btn-mind"
                style={{ background: "#f0f2f5", textTransform: "none", textAlign: "start", color: "GrayText" }}
              >
                <i className="fas fa-photo-video" style={{ color: "green" }}></i>
                <p style={{ marginLeft: "10px" }} className="d-inline-block">
                  ???nh/Video
                </p>
              </button>
              <button
                className="btn btn-light rounded-3 fs-5 btn-mind"
                style={{ background: "#f0f2f5", textTransform: "none", textAlign: "start", color: "GrayText" }}
              >
                <i className="fab fa-font-awesome-flag" style={{ color: "#45b0d5" }}></i>
                <p style={{ marginLeft: "10px" }} className="d-inline-block">
                  S??? ki???n trong ?????i
                </p>
              </button>
            </div>
          </div>
        </div>
        {postsByDate.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
});
