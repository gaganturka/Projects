import axios from "axios";
import { BackEndUrl } from "./helper/heper";
import { showLoading,hideLoading } from "./helper/heper";

export const httpPost = (url, data) => {
  return new Promise((resolve, reject) => {
    showLoading()
    axios
      .post(`${BackEndUrl}${url}`, data)
      .then(function (response) {
        hideLoading()
        return resolve(response.data);
      })
      .catch(function (error) {
        hideLoading()
        console.log("err", error);
        return reject(error);
      });
  });
};

export const httpGet = (url) => {
  return new Promise((resolve, reject) => {
    showLoading()
    axios
      .get(`${BackEndUrl}${url}`)
      .then(function (response) {
        hideLoading()
        return resolve(response.data);
      })
      .catch(function (error) {
        hideLoading()
        console.log("err", error);
        return reject(error);
      });
  });
};

export const httpPut = (url, data) => {
  return new Promise((resolve, reject) => {
    showLoading()
    axios
      .put(`${BackEndUrl}${url}`, data)
      .then(function (response) {
        hideLoading()
        return resolve(response.data);
      })
      .catch(function (error) {
        hideLoading()
        console.log("err", error);
        return reject(error);
      });
  });
};

export const httpDelete = (url) => {
  return new Promise((resolve, reject) => {
    showLoading()
    axios
      .delete(`${BackEndUrl}${url}`)
      .then(function (response) {
        hideLoading()
        return resolve(response.data);
      })
      .catch(function (error) {
        hideLoading()
        console.log("err", error);
        return reject(error);
      });
  });
};

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    config.headers = {
      authorization: ` ${token}`,
      // 'Accept': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded'
    };
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    console.log("DEC", response.data.status);
    if (response.data.status === 403) {
      localStorage.removeItem("token");
    }
    return response;
  },
  function (error) {
    console.log("error", error);

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
