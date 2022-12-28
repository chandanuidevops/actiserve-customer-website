import axios from "axios";
import { CONTRACTOR_SENT_RESET_PASSWORD_FAILURE } from "../Stores/Auth/constants";

const api = (token, cancelToken, isHandlerDisabled) => {
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_APP_BACKEND_URI,
    headers:
      typeof token === "string" ? { Authorization: `Bearer ${token}` } : { Authorization: `Bearer ${process.env.NEXT_PUBLIC_APP_STATIC_TOKEN}` },
    withCredentials: true,
    cancelToken,
  });
  if (!isHandlerDisabled)
    axiosInstance.interceptors.response.use(
      (response) => {
        if (
          response.data.status === "error" ||
          response.data.status === "failed"
        ) {
          let error;
          if (
            typeof response.data.message !== "string" &&
            Object.values(response.data.message).length
          )
            error = Object.values(response.data.message).join(", ");
          else error = response.data.message;
          if (
            typeof response.data.error !== "string" &&
            Object.values(response.data.error).length
          )
            error = Object.values(response.data.error).join(", ");
          /* eslint-disable-next-line prefer-destructuring */ else
            error = response.data.error;
          return Promise.reject(error);
        }
        return response.data;
      },
      (_error) => {
        const { response } = _error;
        if (response) {
          if (response.status === 401) {
            // auto logout if 401 response returned from api
            // clear localstorage or a logout method
            // localStorage.clear();
            // eslint-disable-next-line no-restricted-globals
            // if (location) location.replace("/");
          }
          let error;
          if (
            typeof response.data.message === "object" &&
            Object.values(response.data?.message).length
          )
            error = Object.values(response.data?.message).join(", ");
          else error = response.data?.message;
          if (
            !error &&
            typeof response.data?.error === "object" &&
            Object.values(response.data?.error).length
          )
            error = Object.values(response.data?.error).join(", ");
          else if (!error) error = response.data?.error;
          return Promise.reject({ ..._error, error });
        }
        return Promise.reject(_error);
      }
    );
  return axiosInstance;
};

export default api;
