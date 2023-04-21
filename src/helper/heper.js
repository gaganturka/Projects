import { toast } from "react-toastify";


// export const  BackEndUrl ='https://api.xyxx-cmt.dev.seraphic.io/';

export const  BackEndUrl ='http://localhost:4333/';

 
export const showSucess = (message) =>{
    toast.success(message)
};

export const showError = (message) =>{
    toast.error(message)
};
