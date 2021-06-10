import { ChatComment } from "./comment";
import { Like } from "./like";
export interface Post {
  id: string;
  username: string;
  displayName: string;
  caption: string;
  image: string;
  createdAt: Date;
  hostImage: string;
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
  image: any = null;

  constructor(post?: PostFormValues) {
    if (post) {
      this.id = post.id;
      this.caption = post.caption;
      this.image = post.image;
    }
  }
}
