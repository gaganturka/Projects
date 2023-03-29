import axios from 'axios'
import { BackendUrl } from './helper.js/helper';

export const httpPost = (url, data) => {
    return new Promise((resolve, reject) => {
        
    axios.post(`${BackendUrl}${url}`, data)
      .then(function (response) {
        console.log(response);
        return resolve(response.data)
      })
      .catch(function (error) {
        console.log(error);
        return reject(error)
      });
    })

     //or
    //  return axios.post(`${BackendUrl}${url}`, data)
}


export const httpget = (url) => {
  return new Promise((resolve, reject) => {
      
  axios.get(`${BackendUrl}${url}`)
    .then(function (response) {
      console.log(response);
      return resolve(response.data)
    })
    .catch(function (error) {
      console.log(error);
      return reject(error)
    });
  })
}

export const httpPut = (url, data) => {
  return new Promise((resolve, reject) => {
      
  axios.put(`${BackendUrl}${url}`, data)
    .then(function (response) {
      console.log(response);
      return resolve(response.data)
    })
    .catch(function (error) {
      console.log(error);
      return reject(error)
    });
  })

   //or

  //  return axios.post(`${BackendUrl}${url}`, data)
}


axios.interceptors.request.use((config) => {
  config.headers.Authorization = localStorage.getItem('token')
  return config;
}, (error) => {
  return Promise.reject(error);
});
