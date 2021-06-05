import React from "react";

import {
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
  MDBDropdownLink,
  MDBBtn,
} from "mdb-react-ui-kit";
import { observer } from "mobx-react-lite";
import { Profile } from "../../app/layout/models/profile";

interface Props {
  profile: Profile;
}

export default observer(function ProfileHeader({ profile }: Props) {
  return (
    <div className="container" style={{ marginTop: "-45px" }}>
      {/* Section: Images */}
      <section className="mb-5">
        <div
          className="p-5 text-center bg-image rounded-6"
          style={{
            backgroundImage: "url('https://mdbcdn.b-cdn.net/img/new/slides/041.jpg')",
            height: 400,
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          }}
        ></div>
        <div className="d-flex justify-content-center">
          <img
            src={profile.image || "/assets/user.png"}
            alt="user"
            className="rounded-circle position-absolute"
            style={{ width: "169px", marginTop: "-140px", border: "5px solid white" }}
          />
        </div>
      </section>
      {/* Section: Images */}

      {/* Section: User data */}
      <section className="text-center border-bottom">
        <div className="row d-flex justify-content-center">
          <div className="col-md-6">
            <h2>
              <strong>{profile.displayName}</strong>
            </h2>
            <span style={{ marginRight: "10px", fontSize: "20px" }}>200 người theo dõi</span>
            <i className="far fa-dot-circle" style={{ fontSize: "10px" }}></i>
            <span style={{ marginLeft: "10px", fontSize: "20px" }}>200 đang theo dõi</span>
            <p className="text-muted fs-5 m-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis molestiae necessitatibus aut ipsa
              repellat quo eos minus laudantium architecto iure optio magni, accusamus.
            </p>
          </div>
        </div>
      </section>
      {/* Section: User data */}
      {/* Section: Buttons */}
      <section className="py-3 d-flex justify-content-between">
        {/* left buttons */}
        <div className="">
          <button type="button" className="btn btn-link bg-light fs-6 rounded-4 mx-1" data-mdb-ripple-color="dark">
            Bài viết
          </button>
          <button type="button" className="btn btn-link text-reset fs-6 rounded-4 mx-1" data-mdb-ripple-color="dark">
            Giới thiệu
          </button>
          <button type="button" className="btn btn-link text-reset fs-6 rounded-4 mx-1" data-mdb-ripple-color="dark">
            Bạn bè <small className="text-muted">333</small>
          </button>
          <button type="button" className="btn btn-link text-reset fs-6 rounded-4 mx-1" data-mdb-ripple-color="dark">
            Ảnh
          </button>

          <MDBDropdown group className="shadow-0">
            <MDBDropdownToggle className="text-reset fs-6 rounded-4 mx-1" color="link">
              Action
            </MDBDropdownToggle>
            <MDBDropdownMenu>
              <MDBDropdownItem>
                <MDBDropdownLink className="fs-6" href="#">
                  Action
                </MDBDropdownLink>
              </MDBDropdownItem>
              <MDBDropdownItem>
                <MDBDropdownLink className="fs-6" href="#">
                  Another action
                </MDBDropdownLink>
              </MDBDropdownItem>
              <MDBDropdownItem>
                <MDBDropdownLink className="fs-6" href="#">
                  Something else here
                </MDBDropdownLink>
              </MDBDropdownItem>
            </MDBDropdownMenu>
          </MDBDropdown>
        </div>

        {/* right buttons */}
        <div className="">
          <MDBBtn className="mx-3 fs-6 rounded-4 mx-1" style={{ width: "200px", height: "36px" }}>
            <i className="fas fa-plus-circle"></i> Thêm vào tin
          </MDBBtn>
          <MDBBtn color="light" className="fs-6 rounded-4 mx-1" style={{ width: "260px", height: "36px" }}>
            <i className="fas fa-pen"></i> Chỉnh sửa trang cá nhân
          </MDBBtn>
        </div>
      </section>
      {/* Section: Buttons */}
    </div>
  );
})