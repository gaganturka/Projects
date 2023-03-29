
import {  toast } from 'react-toastify';



export const BackendUrl = 'http://localhost:3001/'

export const showSucess = (message) => {
    toast.success(message)
}

export const showError = (message) => {
    toast.error(message)
}

export const images = (data)=>{
    const newArray = []
for(let i=0; i< data.length; i++){
    newArray.push({original : `${BackendUrl}static/${data[i]}`})
}
return newArray
}