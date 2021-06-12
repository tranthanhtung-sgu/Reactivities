import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";
import { CommentStore } from "./commentStore";
import { CommentStorePost } from "./commentStorePost";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";
import PostStore from "./postStore";
import ProfileStore from "./profileStore";
import UserStore from "./userStore";

interface Store {
  activityStore: ActivityStore;
  commonStore: CommonStore;
  userStore: UserStore;
  modalStore: ModalStore;
  profileStore: ProfileStore;
  commentStore: CommentStore;
  postStore: PostStore;
  commentStorePost: CommentStorePost;
}

export const store: Store = {
  activityStore: new ActivityStore(),
  commonStore: new CommonStore(),
  userStore: new UserStore(),
  modalStore: new ModalStore(),
  profileStore: new ProfileStore(),
  commentStore: new CommentStore(),
  postStore: new PostStore(),
  commentStorePost: new CommentStorePost(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
