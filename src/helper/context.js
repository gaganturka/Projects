import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { httpPost } from '../Action';
import { showError, showSucess } from './heper';

const AppContext = createContext();

function AppContextProvider(props) {
    const navigate = useNavigate()
  const [token, setToken] = useState('')
  const [formData, setFormData] = useState({ email: "", password: "" });

  useEffect(() => {
    setToken(localStorage.getItem('token'))
  },[token])


  const logIn = async (e) => {
    e.preventDefault();

    const response = await httpPost("user/log/in", formData);
    if (response.status == "400") {
      showError(response.message);
    } else {
     
      console.log("res", response.data);
      localStorage.setItem("token", response.data.token);
      setToken(response.data.token)
      navigate('/')
    }
  };

  const logOut = () => {
    
      localStorage.removeItem('token')
      setToken('')

    
  } 



  const contextValue = {
    logOut,
    logIn,
    token,
    formData, setFormData,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
}

export { AppContextProvider, AppContext };