import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { makeAutoObservable, runInAction } from "mobx";
import { ChatComment } from "../layout/models/comment";
import { Like } from "../layout/models/like";
import { store } from "./store";

export class CommentStorePost {
  comments: ChatComment[] = [];
  hubConnection: HubConnection | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  createHubConnectionPost = (postId: string) => {
    if (store.postStore.postsByDate.find((x) => x.id === postId)) {
      this.hubConnection = new HubConnectionBuilder()
        .withUrl(process.env.REACT_APP_COMMENT_URL + "?postId=" + postId, {
          accessTokenFactory: () => store.userStore.user?.token!,
        })
        .withAutomaticReconnect()
        .build();
      this.hubConnection.start().catch((error) => {
        console.log("Error establishing the connection: ", error);
      });
      this.hubConnection.on("LoadCommentsPost", (comments: ChatComment[]) => {
        runInAction(() => {
          const post = store.postStore.postRegistry.get(postId);
          post?.comments.splice(0, post.comments.length);
          comments.forEach((comment) => {
            comment.createdAt = new Date(comment.createdAt + "Z");
            post?.comments.push(comment);
          });
          store.postStore.postRegistry.set(postId, post!);
        });
      });
      this.hubConnection.on("LoadLikesPost", (likes: Like[]) => {
        runInAction(() => {
          console.log(likes);
          const post = store.postStore.postRegistry.get(postId);
          post?.likes.splice(0, post.likes.length);
          likes.forEach((like) => {
            post?.likes.push(like);
          });
          store.postStore.postRegistry.set(postId, post!);
        });
      });

      this.hubConnection.on("ReciveLikePost", () => {
        runInAction(() => {
          var post = store.postStore.postRegistry.get(postId);
          var likes = post?.likes;
          const currentUser = store.userStore.user;
          const like = likes?.find((x) => x.username === currentUser?.username);
          if (like !== undefined) {
            const newList = post?.likes.filter((x) => x.username !== currentUser?.username);
            post?.likes.splice(0, post.likes.length);
            newList!.forEach((like) => {
              post?.likes.push(like);
            });
            store.postStore.setPost(post!);
          } else {
            var temp: Like = {
              username: currentUser?.username!,
              displayName: currentUser?.displayName!,
              image: currentUser?.image!,
              isLike: true,
              react: "Like",
            };
            post?.likes.push(temp);
            store.postStore.postRegistry.set(postId, post!);
            console.log(store.postStore.postRegistry.get(postId));
          }
        });
      });
      this.hubConnection.on("ReciveCommentPost", (comment: ChatComment) => {
        runInAction(() => {
          comment.createdAt = new Date(comment.createdAt);
          const post = store.postStore.postRegistry.get(postId);
          post?.comments.push(comment);
          store.postStore.setPost(post!);
        });
      });
    }
  };

  stopHubConnectionPost = () => {
    this.hubConnection?.stop().catch((error) => {
      console.log("Error stopping connection: ", error);
    });
  };

  clearComments = () => {
    store.postStore.postRegistry.forEach((post) => {
      post.likes.splice(0, post.likes.length);
      post.comments.splice(0, post.comments.length);
    });
    this.stopHubConnectionPost();
  };

  addComment = async (values: any, id: string) => {
    values.postId = id;
    try {
      await this.hubConnection?.invoke("SendCommentPost", values);
    } catch (error) {
      console.log(error);
    }
  };
  addLike = async (values: any, id: string) => {
    try {
      await this.hubConnection?.invoke("SendLikePost", { postId: values });
    } catch (error) {
      console.log(error);
    }
  };
}
