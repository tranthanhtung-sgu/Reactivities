import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "../api/agent";
import { Photo, Profile } from "../layout/models/profile";
import { store } from "./store";

export default class ProfileStore {
  profile: Profile | null = null;
  loadingProfile: boolean = false;
  loadingUpload = false;
  loading = false;
  followings: Profile[] = [];
  loadingFollowing = false;
  activeTab = 0;
  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.activeTab,
      (activeTab) => {
        if (activeTab === 1 || activeTab === 2) {
          const predicate = activeTab === 1 ? "following" : "followers";
          this.loadFollowing(predicate);
        } else {
          this.followings = [];
        }
      }
    );
  }

  setActiveTab = (activeTab: any) => {
    this.activeTab = activeTab;
  };

  get isCurrentUser() {
    if (store.userStore.user?.username === this.profile?.username!) {
      return store.userStore.user?.username === this.profile?.username!;
    }
    return false;
  }

  loadProfile = async (username: string) => {
    this.loadingProfile = true;
    try {
      const profile = await agent.Profile.get(username);
      runInAction(() => {
        this.profile = profile;
        this.loadingProfile = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loadingProfile = false;
      });
    }
  };

  uploadPhoto = async (file: Blob) => {
    this.loadingUpload = true;
    try {
      const response = await agent.Profile.uploadPhoto(file);
      const photo = response.data;
      runInAction(() => {
        if (this.profile) {
          this.profile.photos.push(photo);
          if (photo.isMain && store.userStore.user) {
            store.userStore.setImage(photo.url);
            this.profile.image = photo.url;
          }
        }
        this.loadingUpload = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loadingUpload = false;
      });
    }
  };

  setMainPhoto = async (photo: Photo) => {
    this.loading = true;
    try {
      await agent.Profile.setMainPhoto(photo.id);
      store.userStore.setImage(photo.url);
      runInAction(() => {
        if (this.profile && this.profile.photos) {
          this.profile.photos.find((x) => x.isMain)!.isMain = false;
          this.profile.photos.find((x) => x.id === photo.id)!.isMain = true;
          this.profile.image = photo.url;
          this.loading = false;
        }
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  deletePhoto = async (photo: Photo) => {
    this.loading = true;
    try {
      await agent.Profile.deletePhoto(photo.id);
      runInAction(() => {
        if (this.profile) {
          this.profile.photos = this.profile.photos.filter((p) => p.id !== photo.id);
          this.loading = false;
        }
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };
  updateFollowing = async (username: string, following: boolean) => {
    this.loading = true;
    console.log(this.loading);

    try {
      await agent.Profile.updateFollowing(username);
      runInAction(() => {
        store.activityStore.updateFollowingAttendee(username);
        if (
          this.profile &&
          this.profile?.username !== store.userStore.user?.username &&
          this.profile.username === username
        ) {
          following ? this.profile.followersCount++ : this.profile.followersCount--;
          this.profile.following = !this.profile.following;
          console.log(this.loading);
        }

        if (this.profile && this.profile.username === store.userStore.user?.username) {
          following ? this.profile.followingCount++ : this.profile.followingCount--;
          this.profile.following = !this.profile.following;
          console.log(this.loading);
        }
        this.followings.forEach((profile) => {
          if (profile.username === username) {
            profile.following ? profile.followersCount-- : profile.followersCount++;
            profile.following = !profile.following;
            console.log(this.loading);
          }
        });
        this.loading = false;
        console.log(this.loading);
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  loadFollowing = async (predicate: string) => {
    this.loadingFollowing = true;
    try {
      const followings = await agent.Profile.listFollowings(this.profile!.username, predicate);
      runInAction(() => {
        console.log(followings);
        this.followings = followings;
        this.loadingFollowing = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loadingFollowing = false;
      });
    }
  };
}
