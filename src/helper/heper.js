import { toast } from "react-toastify";


export const  BackEndUrl ='http://localhost:4000/';
 
export const showSucess = (message) =>{
    toast.success(message)
};

export const showError = (message) =>{
    toast.error(message)
};
