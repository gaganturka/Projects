// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBMkl-hjDvS9xggIv-eoolr4xoKRF7VHx4",
//   authDomain: "ecommerce-5e9ee.firebaseapp.com",
//   projectId: "ecommerce-5e9ee",
//   storageBucket: "ecommerce-5e9ee.appspot.com",
//   messagingSenderId: "137202885644",
//   appId: "1:137202885644:web:3f11082c88d88c784e3a29",
//   measurementId: "G-5Q3MEZPPZC"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


import firebase from 'firebase';
  
const firebaseConfig = {
    apiKey: "AIzaSyBMkl-hjDvS9xggIv-eoolr4xoKRF7VHx4",
  authDomain: "ecommerce-5e9ee.firebaseapp.com",
  projectId: "ecommerce-5e9ee",
  storageBucket: "ecommerce-5e9ee.appspot.com",
  messagingSenderId: "137202885644",
  appId: "1:137202885644:web:3f11082c88d88c784e3a29",
  measurementId: "G-5Q3MEZPPZC"
};
  
firebase.initializeApp(firebaseConfig);
var auth = firebase.auth();
export  {auth};