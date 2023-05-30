import { checkPermission, login, register } from 'api/auth';
import { createContext, useEffect, useState } from 'react';
import * as jwt from 'jsonwebtoken';
import { useLocation } from 'react-router-dom';
import { useContext } from 'react';

const defaultAuthContext = {
  isAuthentical: false,
  currentMember: null,
  login: null,
  logout: null,
  register: null,
};

const AuthContext = createContext(defaultAuthContext);

// const {defaultAuthContext} = useContex(AuthContext)
export const useAuth = () => useContext(AuthContext); //封裝個useAuth 用函式回傳 之後在其他元件只要匯入 useAuth 就能取用這個 Context 的內容
export const AuthProvider = ({ children }) => {
  const [isAuthentical, setIsAuthtical] = useState(false);
  const [payload, setPayload] = useState(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const checkTokenIsValid = async () => {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {//確認有無憑證
        return;
      }
      const result = await checkPermission(authToken);//到後端進行驗證
      if (result) {
        setIsAuthtical(true);
        const tempPayload = jwt.decode(authToken);
        //console.log(tempPayload);{sub: '051fad4c-f673-48f5-9104-b02c4d0846ac', name: 'member6969', iat: 1685171298, exp: 1685173098}
        setPayload(tempPayload);
      } else {
        setIsAuthtical(false);
        setPayload(null);
      }
    };
    checkTokenIsValid();
  }, [pathname]); //只要有變化變執行

  return (
    <AuthContext.Provider
      value={{
        isAuthentical,
        currentMember: payload && {
          id: payload.sub,
          name: payload.name,
        },
        register: async (data) => {
          const { success, authToken } = await register({
            username: data.name,
            password: data.password,
            email: data.email,
          });
          const tempPayload = jwt.decode(authToken);
          if (tempPayload) {
            setIsAuthtical(true);
            setPayload(data);
            localStorage.setItem('authToken', authToken);
          } else {
            setIsAuthtical(false);
            setPayload(null);
          }
          return success;
        },
        login: async (data) => {
          const { success, authToken } = await login({
            username: data.username,
            password: data.username,
          });
          const tempPayload = jwt.decode(authToken);

          //console.log(data);{username: 'member6969', password: 'member6969'}

          if (tempPayload) {
            setIsAuthtical(true);
            setPayload(data);
            localStorage.setItem('authToken', authToken);
          } else {
            setIsAuthtical(false);
            setPayload(null);
          }
          return success;
        },
        logout: () => {
          localStorage.removeItem('authToken');
          setIsAuthtical(false);
          setPayload(null);
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
