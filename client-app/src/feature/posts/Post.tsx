/* eslint-disable jsx-a11y/anchor-is-valid */
import { format } from "date-fns";
import { Field, FieldProps, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Post } from "../../app/layout/models/post";
import { useStore } from "../../app/stores/store";
import * as Yup from "yup";
import { formatDistanceToNow } from "date-fns/esm";
import { Loader } from "semantic-ui-react";
import vi from "date-fns/locale/vi";

interface Props {
  post: Post;
}

export default observer(function Post({ post }: Props) {
  const {
    commentStorePost,
    userStore: { user },
  } = useStore();
  useEffect(() => {
    if (post) {
      commentStorePost.createHubConnectionPost(post.id);
    }
    return () => {
      commentStorePost.clearComments();
    };
  }, [commentStorePost, post]);
  return (
    <>
      <div className="card w-100 rounded-6 mt-3">
        <div className="card-body">
          <div className="d-flex">
            <a href="/">
              <img
                src={post.hostImage || "/assets/user.png"}
                alt=""
                style={{ height: "50px" }}
                className="rounded-circle border"
              />
            </a>
            <div style={{ marginLeft: "10px" }}>
              <a href="/" className="text-dark mb-0">
                <strong>{post.displayName}</strong>
              </a>
              <a href="/" className="d-block text-muted">
                <small style={{ marginRight: 10 }}>{format(post.createdAt, "dd MMM yyyy")}</small>
                <i className="fas fa-globe-africa"></i>
              </a>
            </div>
          </div>
          <p className="mt-3">{post.caption}</p>
        </div>
        <img src={post.image} alt="" />
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <div className="icon__like d-flex">
              <img
                style={{ height: "25px", zIndex: 3, borderRadius: 999, border: "2px white solid" }}
                src="/assets/like.png"
                alt=""
              />
              <i
                style={{
                  color: "rgb(237, 72, 86)",
                  fontSize: "25px",
                  marginLeft: -5,
                  borderRadius: 999,
                  zIndex: 2,
                  border: "2px white solid",
                }}
                className="fab fa-gratipay"
              ></i>
              <i
                style={{
                  color: "#facd57",
                  fontSize: "25px",
                  marginLeft: -5,
                  marginRight: 3,
                  borderRadius: 999,
                  zIndex: 1,
                  border: "2px white solid",
                }}
                className="fas fa-laugh-squint"
              ></i>
              <a href="#" className="text-muted underline__like">
                {post.likes.length}
              </a>
            </div>
            <a href="" style={{ marginTop: "7px", marginRight: "5px" }} className="text-muted">
              {post.comments.length} bình luận
            </a>
          </div>
          <hr style={{ marginBottom: -1 }} />
          <div className="like_comment_share">
            <div style={{ width: "600px" }} className="d-flex justify-content-between">
              <button
                onClick={() => commentStorePost.addLike(post.id, post.id)}
                className="btn btn-light rounded-3 fs-5 btn-mind"
                style={{
                  background: "#f0f2f5",
                  textTransform: "none",
                  textAlign: "center",
                  color: "#0671ed",
                  width: "160px",
                }}
              >
                <i className="fas fa-thumbs-up"></i>
                <p style={{ marginLeft: "10px" }} className="d-inline-block">
                  Thích
                </p>
              </button>
              <button
                className="btn btn-light rounded-3 fs-5 btn-mind"
                style={{ background: "#f0f2f5", textTransform: "none", textAlign: "center", marginLeft: -50 }}
              >
                <i style={{ marginLeft: "10px" }} className="far fa-comment-alt text-muted"></i>
                <p style={{ marginLeft: "10px" }} className="d-inline-block text-muted">
                  Bình luận
                </p>
              </button>
              <button
                className="btn btn-light rounded-3 fs-5 btn-mind"
                style={{ background: "#f0f2f5", textTransform: "none", textAlign: "center" }}
              >
                <i className="fas fa-share text-muted"></i>
                <p style={{ marginLeft: "10px" }} className="d-inline-block text-muted">
                  Chia sẻ
                </p>
              </button>
            </div>
          </div>
          <hr style={{ marginTop: -1 }} />
          {post.comments.map((comment) => (
            <div key={comment.id} className="d-flex mb-2">
              <a href={`/profiles/${comment.username}`}>
                <img
                  src={comment.image || "/assets/user.png"}
                  alt=""
                  style={{ height: "50px" }}
                  className="rounded-circle border"
                />
              </a>
              <div className="d-flex align-items-center">
                <div className="comment__content">
                  <div className="comment__others" style={{ marginLeft: "10px", background: "rgb(240,242,245)" }}>
                    <a href={`/profiles/${comment.username}`} className="text-dark mb-0">
                      <strong>{comment.displayName}</strong>
                    </a>
                    <p className="pt-1 pb-2" style={{ whiteSpace: "pre-wrap" }}>
                      {comment.body}
                    </p>
                  </div>
                  <a href="#" className="text-muted" style={{ marginLeft: "30px" }}>
                    <strong>Thích</strong>
                  </a>
                  <a href="#" className="text-muted" style={{ marginLeft: "10px" }}>
                    <strong>Trả lời</strong>
                  </a>
                  <a href="#" className="text-muted" style={{ marginLeft: "10px" }}>
                    <small>{formatDistanceToNow(new Date(comment.createdAt), { locale: vi })} truớc</small>
                  </a>
                </div>
                <button className="btn btn__options_comment mb-3" style={{ marginLeft: 10, textAlign: "center" }}>
                  <i className="fas fa-ellipsis-h" style={{ marginLeft: -4 }}></i>
                </button>
              </div>
            </div>
          ))}
          <div className="d-flex">
            <a href="/">
              <img
                src={user?.image || "/assets/user.png"}
                alt=""
                style={{ height: "50px" }}
                className="rounded-circle border mt-3"
              />
            </a>
            <Formik
              onSubmit={(values, { resetForm }) => commentStorePost.addComment(values, post.id).then(() => resetForm())}
              initialValues={{ body: "" }}
              validationSchema={Yup.object({
                body: Yup.string().required(),
              })}
            >
              {({ isSubmitting, isValid, handleSubmit }) => (
                <Form className="ui form">
                  <Field name="body">
                    {(props: FieldProps) => (
                      <div style={{ position: "relative", marginTop: 10 }}>
                        <Loader active={isSubmitting} />
                        <textarea
                          style={{ width: 500, marginLeft: 20 }}
                          placeholder="Viết bình luận..."
                          rows={2}
                          {...props.field}
                          onKeyPress={(e) => {
                            if (e.key === "Enter" && e.shiftKey) {
                              return;
                            }
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault();
                              isValid && handleSubmit();
                            }
                          }}
                        ></textarea>
                      </div>
                    )}
                  </Field>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
});
