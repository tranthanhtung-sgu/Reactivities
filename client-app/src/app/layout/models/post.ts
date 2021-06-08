import { ChatComment } from "./comment";
import { Like } from "./like";
export interface Post {
  id: string;
  username: string;
  displayName: string;
  caption: string;
  image: string;
  createdAt: Date;
  comments: ChatComment[];
  likes: Like[];
  isHost?: boolean;
}
export class Post implements Post {
  constructor(init?: PostFormValues) {
    Object.assign(this, init);
  }
}
export class PostFormValues {
  id?: string = undefined;
  caption: string = "";
  image: string = "";

  constructor(post?: PostFormValues) {
    if (post) {
      this.id = post.id;
      this.caption = post.caption;
      this.image = post.image;
    }
  }
}
