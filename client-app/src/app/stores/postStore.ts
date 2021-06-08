import { format } from "date-fns";
import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Post } from "../layout/models/post";
import { store } from "./store";

export default class PostStore {
  postRegistry = new Map<string, Post>();
  selectedPost: Post | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = true;

  constructor() {
    makeAutoObservable(this);
  }

  get postsByDate() {
    return Array.from(this.postRegistry.values()).sort((a, b) => a.createdAt!.getTime() - b.createdAt!.getTime());
  }

  get groupedPost() {
    return Object.entries(
      //reduce loc ra cac activity co cung date cho vao cung 1 activities[date]
      this.postsByDate.reduce((posts, post) => {
        const date = format(post.createdAt!, "dd MMM yyyy");
        posts[date] = posts[date] ? [...posts[date], post] : [post];
        return posts;
      }, {} as { [key: string]: Post[] })
    );
  }

  loadPosts = async () => {
    this.loadingInitial = true;
    try {
      const posts = await agent.Posts.list();
      runInAction(() => {
        posts.forEach((post) => {
          this.setPost(post);
        });
        this.loadingInitial = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loadingInitial = false;
      });
    }
  };

  loadPost = async (id: string) => {
    let post = this.getPost(id);
    if (post) {
      this.selectedPost = post;
      return post;
    } else {
      this.loadingInitial = true;
      try {
        post = await agent.Posts.detail(id);
        this.setPost(post);
        runInAction(() => {
          this.selectedPost = post;
          this.loadingInitial = false;
        });
        return post;
      } catch (error) {
        console.log(error);
        runInAction(() => {
          this.loadingInitial = false;
        });
      }
    }
  };

  private getPost(id: string) {
    return this.postRegistry.get(id);
  }

  setPost(post: Post) {
    const user = store.userStore.user;
    if (user) {
      // Check user hiện tại có phải là host ??
      post.isHost = post.username === user.username;
    }
    post.createdAt = new Date(post.createdAt!);
    this.postRegistry.set(post.id, post);
  }
}
