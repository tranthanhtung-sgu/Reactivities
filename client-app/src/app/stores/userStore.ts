import { makeAutoObservable, runInAction } from "mobx";
import { history } from "../..";
import agent from "../api/agent";
import { User, UserFormValues } from "../layout/models/user";
import { store } from "./store";

export default class UserStore {
  user: User | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get IsLoggedIn() {
    return !!this.user;
  }

  login = async (creds: UserFormValues) => {
    try {
      console.log(creds);
      const user = await agent.Account.login(creds);
      store.commonStore.setToken(user.token);
      runInAction(() => {
        this.user = user;
      });
      history.push("/home");
      window.location.reload();
      store.modalStore.closeModal();
    } catch (error) {
      throw error;
    }
  };

  register = async (creds: UserFormValues) => {
    try {
      console.log(creds);
      const user = await agent.Account.register(creds);
      store.commonStore.setToken(user.token);
      runInAction(() => {
        this.user = user;
      });
      history.push("/home");
      window.location.reload();
      store.modalStore.closeModal();
    } catch (error) {
      throw error;
    }
  };

  logout = () => {
    store.commonStore.setToken(null);
    window.localStorage.removeItem("jwt");
    this.user = null;
    history.push("/");
  };

  getUser = async () => {
    try {
      const user = await agent.Account.current();
      runInAction(() => {
        this.user = user;
      });
    } catch (error) {
      throw error;
    }
  };
  setImage(url: string) {
    if (this.user) this.user.image = url;
  }
}
