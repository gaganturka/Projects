import { toast } from "react-toastify";

// export const  BackEndUrl ='https://api.xyxx-cmt.dev.seraphic.io/';

export const  BackEndUrl ='http://localhost:4333/';

 
export const showSucess = (message) =>{
    toast.success(message)
};

export const showError = (message) =>{
    toast.error(message)
};



  export const showLoading = () => {
    var mainLoader = document.getElementById("mainLoaderElement");
    if (mainLoader != null) {
      mainLoader.classList.remove("d-none");
    }
  }
  
  export const hideLoading = () => {
    var mainLoader = document.getElementById("mainLoaderElement");
    if (mainLoader != null) {
      mainLoader.classList.add("d-none");
    }
  }
  