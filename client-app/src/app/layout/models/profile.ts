import { User } from "./user";

export interface Profile {
  username: string;
  displayName: string;
  image?: string;
  bio?: string;
  photos: Photo[];
}

export class Profile implements Profile {
  constructor(user: User) {
    this.username = user.username;
    this.image = user.image;
    this.displayName = user.displayName;
  }
}

export interface Photo {
  isMain: boolean;
  url: string;
  id: string;
}
