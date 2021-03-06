import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from "../..";
import { Activity, ActivityFormValues } from "../layout/models/activity";
import { Post, PostFormValues } from "../layout/models/post";
import { Photo } from "../layout/models/profile";
import { User, UserFormValues } from "../layout/models/user";
import { store } from "../stores/store";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
console.log(process.env.REACT_APP_API_URL);

axios.interceptors.request.use((config) => {
  const token = store.commonStore.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(
  async (response) => {
    await sleep(500);
    return response;
  },
  (error: AxiosError) => {
    const { data, status, config } = error.response!;
    switch (status) {
      case 400:
        if (typeof data === "string") {
          toast.error(data);
        }
        if (config.method === "get" && data.errors.hasOwnProperty("id")) {
          history.push("/not-found");
        }
        if (data.errors) {
          const modalStateErrors = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modalStateErrors.push(data.errors[key]);
            }
          }
          throw modalStateErrors.flat();
        }
        break;
      case 401:
        toast.error("Unauthorised");
        break;
      case 404:
        history.push("/not-found");
        break;
      case 500:
        store.commonStore.setServerError(data);
        history.push("/server-error");
        break;
    }
    return Promise.reject(error);
  }
);

const responseBody = <T,>(response: AxiosResponse<T>) => response.data;

const request = {
  get: <T,>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T,>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
  put: <T,>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T,>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Activities = {
  list: () => request.get<Activity[]>("/activities"),
  detail: (id: string) => request.get<Activity>(`/activities/${id}`),
  create: (activity: ActivityFormValues) => request.post<void>(`/activities`, activity),
  update: (activity: ActivityFormValues) => request.put<void>(`/activities/${activity.id}`, activity),
  del: (id: string) => request.del<void>(`/activities/${id}`),
  attend: (id: string) => request.post<void>(`/activities/${id}/attend`, id),
};

const Account = {
  current: () => request.get<User>("/account"),
  login: (user: UserFormValues) => request.post<User>("/account/login", user),
  register: (user: UserFormValues) => request.post<User>("/account/register", user),
};

const Profile = {
  get: (username: string) => request.get<any>(`/profiles/${username}`),
  uploadPhoto: (file: Blob) => {
    let formData = new FormData();
    formData.append("File", file);
    return axios.post<Photo>("photo", formData, {
      headers: {
        "Content-type": "multipart/form-data",
      },
    });
  },
  setMainPhoto: (id: string) => request.post(`/photo/${id}/setmain`, {}),
  deletePhoto: (id: string) => request.del(`/photo/${id}`),
  updateFollowing: (username: string) => request.post(`/follow/${username}`, {}),
  listFollowings: (username: string, predicate: string) =>
    request.get<any[]>(`/follow/${username}?predicate=${predicate}`),
};

const Posts = {
  list: () => request.get<Post[]>("/post"),
  detail: (id: string) => request.get<Post>(`/post/${id}`),
  create: (post: PostFormValues) => {
    let formData = new FormData();
    formData.append("Image", post.image);
    formData.append("Caption", post.caption);
    formData.append("Id", post.id!);
    return axios.post<Post>("post", formData, {
      headers: {
        "Content-type": "multipart/form-data",
      },
    });
  },
  update: (post: PostFormValues) => request.put<void>(`/post/${post.id}`, post),
  del: (id: string) => request.del<void>(`/post/${id}`),
};

const agent = {
  Activities,
  Account,
  Profile,
  Posts,
};

export default agent;
