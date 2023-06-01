import {
  AuthContainer,
  AuthInputContainer,
  AuthButton,
  AuthLinkText,
} from 'components/common/auth.styled';
import { ACLogoIcon } from 'assets/images';
import { AuthInput } from 'components';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useEffect } from 'react';
import { useAuth } from 'context/AuthContext';

const LoginPage = () => {
  const [username, setuserName] = useState('');
  const [password, setpassword] = useState('');
  const navigate = useNavigate()
  const {login, isAuthentical} = useAuth() //取出方法與狀態

  const handleClick = async () => {
    if (username.length === 0) {
      return;
    }
    if (password.length === 0) {
      return;
    }

    const success= await login({
      username,
      password,
    });
    if (success) {
      Swal.fire({
        title: '登入成功',
        icon: 'success',
        showConfirmButton:false,
        position:"top",
        timer:1000
      });
      return;
    }
    Swal.fire({
      title: '登入失敗',
      icon: 'error',
      showConfirmButton: false,
      position: 'top',
      timer: 1000,
    });
  };

  useEffect(()=>{
   if(isAuthentical){
    navigate('/todoPage')
   }
  },[navigate,isAuthentical])


  return (
    <AuthContainer>
      <div>
        <ACLogoIcon />
      </div>
      <h1>登入 Todo</h1>

      <AuthInputContainer>
        <AuthInput
          placeholder="輸入使用者名稱"
          label="使用者名稱"
          value={username}
          onChange={(nameInputValue) => setuserName(nameInputValue)} //prop: onChange={(event)=>onChange?.(event.target.value)} //目前解釋成若onChange有改變 則形成(nameInputValue) => setuserName(nameInputValue.target.value)
        />
      </AuthInputContainer>

      <AuthInputContainer>
        <AuthInput
          type="password"
          placeholder="輸入密碼"
          label="密碼"
          value={password}
          onChange={(passwordInputValue) => setpassword(passwordInputValue)}
        />
      </AuthInputContainer>
      <AuthButton onClick={handleClick}>登入</AuthButton>
      <Link to="/signuppage">
        <AuthLinkText>註冊</AuthLinkText>
      </Link>
    </AuthContainer>
  );
};

export default LoginPage;
