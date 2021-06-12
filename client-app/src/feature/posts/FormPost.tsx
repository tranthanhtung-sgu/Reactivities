/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import { Formik, Form } from "formik";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Dropdown, Header } from "semantic-ui-react";
import { PostFormValues } from "../../app/layout/models/post";
import { useStore } from "../../app/stores/store";
import "./formpost.css";
import { v4 as uuid } from "uuid";
import MyTextArea from "../../app/common/form/MyTextArea";
import ImageDropzone from "./ImageDropzone";

export default observer(function FormPost() {
  const { postStore, userStore } = useStore();
  const [files, setFiles] = useState<any>([]);

  function handleFormSubmit(post: PostFormValues) {
    let newPost = {
      ...post,
      id: uuid(),
    };
    postStore.createPost(newPost).then((post) => {
      console.log(post);
    });
  }
  useEffect(() => {
    files.forEach((file: any) => {
      console.log(URL.createObjectURL(file));
    });
  }, [files]);
  return (
    <Formik
      initialValues={{ image: files[0], caption: "", error: null }}
      enableReinitialize
      onSubmit={(values) => {
        handleFormSubmit(values);
        console.log(values);
      }}
    >
      {({ handleSubmit, isSubmitting, isValid, dirty }) => (
        <Form className="form__post" onSubmit={handleSubmit} autoComplete="off">
          <Header content="Tạo bài viết" as="h3" textAlign="center" />
          <hr></hr>
          {/* div name, avatar */}
          <div className="d-flex justify-content-left">
            <img
              src={userStore.user?.image || "/assets/user.png"}
              alt="avatar"
              style={{ width: 50, borderRadius: 999 }}
            />
            <div className="name" style={{ marginLeft: 15 }}>
              <a href={`/profiles/${userStore.user?.username}`} style={{ color: "black" }}>
                <h5>{userStore.user?.displayName}</h5>
              </a>
              <div>
                <Dropdown pointing="top left" text="Công khai">
                  <Dropdown.Menu>
                    <Dropdown.Item as={Link} to={`/profiles/${userStore.user?.username}`} text="Profile" icon="user" />
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </div>
          {/* div textarea */}
          <div className="input__status" style={{ maxHeight: 400 }}>
            {/* <textarea name="caption" placeholder="Nhap zo" rows={2}></textarea> */}
            <MyTextArea
              className={"status__text"}
              cols={32}
              name="caption"
              rows={5}
              placeholder="Tùng ơi, bạn đang nghĩ gì thế?"
            />
          </div>
          {/* div button */}
          <div className="div__add__image d-flex justify-content-between fs-5 align-items-center mt-2">
            <div className="add__more">Thêm vào bài viết</div>
            <div className="d-flex">
              <ImageDropzone setFiles={setFiles} className={"btn__options_add__image"} />
            </div>
          </div>
          <div className="button__submit">
            {/* <button disabled={{ isSubmitting, isValid }} type="submit" className="d-block w-100 mt-3">
              Đăng
            </button> */}
            <Button
              loading={isSubmitting || !isValid}
              content="Đăng"
              type="submit"
              color="facebook"
              className="d-block w-100 mt-3"
            />
          </div>
          {/* <MyTextInput name="email" placeholder="Email" />
          <MyTextInput name="password" placeholder="Password" type="password" />
          <ErrorMessage
            name="error"
            render={() => <Label style={{ marginBottom: 10 }} basic color="red" content={errors.error} />}
          />
         */}
        </Form>
      )}
    </Formik>
  );
});
