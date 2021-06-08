import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { Button, Icon, Popup } from "semantic-ui-react";
import PhotoUploadWidget from "../../app/common/imageUpload/PhotoUploadWidget";
import { Photo, Profile } from "../../app/layout/models/profile";
import { useStore } from "../../app/stores/store";
import Post from "../posts/Post";

interface Props {
  profile: Profile;
  button: string;
}

export default observer(function ProfileMain({ profile, button }: Props) {
  const {
    profileStore: { isCurrentUser, uploadPhoto, loadingUpload, loading, setMainPhoto, deletePhoto },
  } = useStore();
  const [addPhotoMode, setAddPhotoMode] = useState(false);
  const [target, setTarget] = useState("");
  function handlePhotoUpload(file: Blob) {
    uploadPhoto(file).then(() => {
      setAddPhotoMode(false);
    });
  }

  function handleSetMainPhoto(photo: Photo, e: SyntheticEvent<HTMLButtonElement>) {
    setTarget(e.currentTarget.name);
    setMainPhoto(photo);
  }

  function handleDeletePhoto(photo: Photo, e: SyntheticEvent<HTMLButtonElement>): void {
    setTarget(e.currentTarget.name);
    deletePhoto(photo);
  }

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-5 mb-4 md-0 left__side">
            {/* List thông tin */}
            <div className="card w-100 rounded-6">
              <div className="card-body">
                <h5 className="card-title fs-4">
                  <strong>Giới thiệu</strong>
                </h5>
                <ul className="list-unstyled fs-5">
                  <li className="d-flex mb-3">
                    <i className="fas fa-graduation-cap"></i>
                    <p style={{ marginLeft: 15 }}>
                      Học ở{" "}
                      <a href="/" className="text-reset">
                        <strong>Trường THPT Nguyễn Hữu Cảnh - Bình Tân</strong>{" "}
                      </a>
                    </p>
                  </li>
                  <li className="d-flex mb-3">
                    <i className="fas fa-home"></i>
                    <p style={{ marginLeft: 15 }}>
                      Sống tại{" "}
                      <a href="/" className="text-reset">
                        <strong>Thành phố Hồ Chí Minh</strong>{" "}
                      </a>
                    </p>
                  </li>
                  <li className="d-flex mb-3">
                    <i className="fas fa-map-marker-alt"></i>
                    <p style={{ marginLeft: 20 }}>
                      Đến từ{" "}
                      <a href="/" className="text-reset">
                        <strong>Thành phố Hồ Chí Minh</strong>{" "}
                      </a>
                    </p>
                  </li>
                  <li className="d-flex mb-3">
                    <i className="fas fa-rss"></i>
                    <p style={{ marginLeft: 15 }}>
                      Có{" "}
                      <a href="/" className="text-reset">
                        <strong>1.200 người</strong> theo dõi
                      </a>
                    </p>
                  </li>
                  <li className="d-flex mb-3">
                    <i className="fas fa-heart"></i>
                    <p style={{ marginLeft: 15 }}>Độc thân</p>
                  </li>
                  <li className="d-flex mb-3">
                    <i className="fas fa-clock"></i>
                    <p style={{ marginLeft: 15 }}>Tham gia vào Tháng 2 năm 2015</p>
                  </li>
                </ul>
                <button
                  type="button"
                  style={{ backgroundColor: "#f0f2f5", color: "#050505", textTransform: "none" }}
                  className="btn btn-block fs-6 mb-4"
                  data-mdb-ripple-color="dark"
                >
                  <strong>Chỉnh sửa chi tiết</strong>
                </button>
                <button
                  type="button"
                  style={{ backgroundColor: "#f0f2f5", textTransform: "none" }}
                  className="btn btn-light btn-block fs-6 mb-4"
                  data-mdb-ripple-color="dark"
                >
                  <strong>Thêm sở thích</strong>
                </button>
                <button
                  type="button"
                  style={{ backgroundColor: "#f0f2f5", textTransform: "none" }}
                  className="btn btn-light btn-block fs-6"
                  data-mdb-ripple-color="dark"
                >
                  <strong>Thêm nội dung đáng chú ý</strong>
                </button>
              </div>
            </div>
            {/* List Ảnh */}
            <div className="card w-100 mt-4 rounded-6">
              <div className="card-body">
                <div className="d-flex justify-content-between mb-3">
                  <div>
                    <h5 className="card-title fs-4">
                      <strong>Ảnh</strong>
                    </h5>
                  </div>
                  <div className="fs-5">
                    {isCurrentUser && (
                      <button
                        className="btn btn__images"
                        onClick={() => {
                          setAddPhotoMode(!addPhotoMode);
                          console.log(123);
                        }}
                      >
                        {addPhotoMode ? "Trở lại" : "Chỉnh sửa ảnh"}
                      </button>
                    )}
                  </div>
                </div>
                {addPhotoMode ? (
                  <PhotoUploadWidget loadingUpload={loadingUpload} uploadPhoto={handlePhotoUpload} />
                ) : (
                  <div className="lightbox">
                    <div className="row gx-2 mb-4">
                      {profile.photos.map((photo, i) => (
                        <div key={i} className="col-lg-4 mb-2">
                          <Popup
                            position="bottom left"
                            trigger={
                              <Button color="black" className="button__options__image" icon>
                                <Icon name="edit" />
                              </Button>
                            }
                            on="click"
                          >
                            <Button
                              type="button"
                              className="btn btn-link text-reset fs-6 rounded-4 mx-1 img__mainphoto"
                              data-mdb-ripple-color="dark"
                              disabled={photo.isMain}
                              name={"main" + photo.id}
                              loading={target === "main" + photo.id && loading}
                              onClick={(e) => handleSetMainPhoto(photo, e)}
                            >
                              <i className="far fa-user-circle"></i> Đặt làm ảnh đại diện
                            </Button>
                            <Button
                              type="button"
                              className="btn btn-link text-reset fs-6 rounded-4 mx-1 img__delete"
                              data-mdb-ripple-color="dark"
                              disabled={photo.isMain}
                              name={photo.id}
                              loading={target === photo.id && loading}
                              onClick={(e) => handleDeletePhoto(photo, e)}
                            >
                              <i className="fas fa-trash"> </i> Xoá ảnh
                            </Button>
                          </Popup>

                          <img
                            className="w-100 h-100"
                            data-mdb-img="https://mdbcdn.b-cdn.net/img/Photos/Slides/1.jpg"
                            src={photo.url || "/assets/user.png"}
                            alt=""
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* List bạn bè */}
            <div className="card w-100 mt-4 rounded-6">
              <div className="card-body">
                <div className="d-flex justify-content-between mb-1">
                  <div className="">
                    <h5 className="card-title fs-4">
                      <strong>Bạn bè</strong>
                    </h5>
                  </div>
                  <div className="fs-5">
                    <a href="/">Xem tất bạn bè</a>
                  </div>
                </div>
                <div className="text-muted mb-3 fs-5">385 người bạn</div>
                <div className="">
                  <div className="row gx-3">
                    <div className="col-lg-4 mb-3">
                      <img
                        className="w-100 rounded-7"
                        data-mdb-img="https://mdbcdn.b-cdn.net/img/Photos/Slides/1.jpg"
                        src="https://res.cloudinary.com/images-store/image/upload/v1622545740/idutyugjcvywsz7qstv6.jpg"
                        alt=""
                      />
                      <div className="ml-2 mt-1">Trần Thanh Tùng</div>
                    </div>
                    <div className="col-lg-4 mb-3">
                      <img
                        className="w-100 rounded-7"
                        data-mdb-img="https://mdbcdn.b-cdn.net/img/Photos/Slides/1.jpg"
                        src="https://res.cloudinary.com/images-store/image/upload/v1622545740/idutyugjcvywsz7qstv6.jpg"
                        alt=""
                      />
                      <div className="ml-2 mt-1">Trần Thanh Tùng</div>
                    </div>
                    <div className="col-lg-4 mb-3">
                      <img
                        className="w-100 rounded-7"
                        data-mdb-img="https://mdbcdn.b-cdn.net/img/Photos/Slides/1.jpg"
                        src="https://res.cloudinary.com/images-store/image/upload/v1622545740/idutyugjcvywsz7qstv6.jpg"
                        alt=""
                      />
                      <div className="ml-2 mt-1">Trần Thanh Tùng</div>
                    </div>
                    <div className="col-lg-4 mb-3">
                      <img
                        className="w-100 rounded-7"
                        data-mdb-img="https://mdbcdn.b-cdn.net/img/Photos/Slides/1.jpg"
                        src="https://res.cloudinary.com/images-store/image/upload/v1622545740/idutyugjcvywsz7qstv6.jpg"
                        alt=""
                      />
                      <div className="ml-2 mt-1">Trần Thanh Tùng</div>
                    </div>
                    <div className="col-lg-4 mb-3">
                      <img
                        className="w-100 rounded-7"
                        data-mdb-img="https://mdbcdn.b-cdn.net/img/Photos/Slides/1.jpg"
                        src="https://res.cloudinary.com/images-store/image/upload/v1622545740/idutyugjcvywsz7qstv6.jpg"
                        alt=""
                      />
                      <div className="ml-2 mt-1">Trần Thanh Tùng</div>
                    </div>
                    <div className="col-lg-4 mb-3">
                      <img
                        className="w-100 rounded-7"
                        data-mdb-img="https://mdbcdn.b-cdn.net/img/Photos/Slides/1.jpg"
                        src="https://res.cloudinary.com/images-store/image/upload/v1622545740/idutyugjcvywsz7qstv6.jpg"
                        alt=""
                      />
                      <div className="ml-2 mt-1">Trần Thanh Tùng</div>
                    </div>
                    <div className="col-lg-4 mb-3">
                      <img
                        className="w-100 rounded-7"
                        data-mdb-img="https://mdbcdn.b-cdn.net/img/Photos/Slides/1.jpg"
                        src="https://res.cloudinary.com/images-store/image/upload/v1622545740/idutyugjcvywsz7qstv6.jpg"
                        alt=""
                      />
                      <div className="ml-2 mt-1">Trần Thanh Tùng</div>
                    </div>
                    <div className="col-lg-4 mb-3">
                      <img
                        className="w-100 rounded-7"
                        data-mdb-img="https://mdbcdn.b-cdn.net/img/Photos/Slides/1.jpg"
                        src="https://res.cloudinary.com/images-store/image/upload/v1622545740/idutyugjcvywsz7qstv6.jpg"
                        alt=""
                      />
                      <div className="ml-2 mt-1">Trần Thanh Tùng</div>
                    </div>
                    <div className="col-lg-4 mb-3">
                      <img
                        className="w-100 rounded-7"
                        data-mdb-img="https://mdbcdn.b-cdn.net/img/Photos/Slides/1.jpg"
                        src="https://res.cloudinary.com/images-store/image/upload/v1622545740/idutyugjcvywsz7qstv6.jpg"
                        alt=""
                      />
                      <div className="ml-2 mt-1">Trần Thanh Tùng</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-7 mb-4 md-0">
            <div className="card w-100 rounded-6">
              <div className="card-body">
                <div className="d-flex">
                  <a href="/">
                    <img
                      src="https://res.cloudinary.com/images-store/image/upload/v1622545740/idutyugjcvywsz7qstv6.jpg"
                      alt=""
                      style={{ height: "50px" }}
                      className="rounded-circle border mr-2"
                    />
                  </a>
                  <button
                    style={{ marginLeft: 20, background: "#f0f2f5", textTransform: "none", textAlign: "start" }}
                    className="btn btn-block btn-rounded fs-5 text-muted"
                  >
                    <p>Bạn đang nghĩ gì?</p>
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
                      Video trực tiếp
                    </p>
                  </button>
                  <button
                    className="btn btn-light rounded-3 fs-5 btn-mind"
                    style={{ background: "#f0f2f5", textTransform: "none", textAlign: "start", color: "GrayText" }}
                  >
                    <i className="fas fa-photo-video" style={{ color: "green" }}></i>
                    <p style={{ marginLeft: "10px" }} className="d-inline-block">
                      Ảnh/Video
                    </p>
                  </button>
                  <button
                    className="btn btn-light rounded-3 fs-5 btn-mind"
                    style={{ background: "#f0f2f5", textTransform: "none", textAlign: "start", color: "GrayText" }}
                  >
                    <i className="fab fa-font-awesome-flag" style={{ color: "#45b0d5" }}></i>
                    <p style={{ marginLeft: "10px" }} className="d-inline-block">
                      Sự kiện trong đời
                    </p>
                  </button>
                </div>
              </div>
            </div>
            <Post />
          </div>
        </div>
      </div>
    </div>
  );
});
