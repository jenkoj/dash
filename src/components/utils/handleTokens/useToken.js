import { useState } from 'react';

/**
 * Class handles token. It stores new one into local storage and
 * reads the saved one when reloading page 
 * @returns saveToken and token
 */

export default function useToken() {
    const getToken = () => {
      const tokenString = localStorage.getItem('token');
      const userToken = JSON.parse(tokenString);
      return userToken?.token
    };
    const [token, setToken] = useState(getToken());
  
    const saveToken = userToken => {
      localStorage.setItem('token', JSON.stringify(userToken));
  
      setToken(userToken.token);
    };
  
    return {
      setToken: saveToken,
      token
    }
  
  }
  