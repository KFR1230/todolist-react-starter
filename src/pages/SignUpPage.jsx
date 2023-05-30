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
import { checkPermission, register } from 'api/auth';
import Swal from 'sweetalert2';
import { useEffect } from 'react';
import { useAuth } from 'context/AuthContext';
const SignUpPage = () => {
  const [username, setuserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate()
  const {register, isAuthentical} = useAuth()

  const handleClick = async () => {
     if (username.length === 0) {
       return;
     }
     if (password.length === 0) {
       return;
     }
     if (email.length === 0) {
       return;
     }

    const success = await register({
      username,
      password,
      email,
    });
    if (success) {
      Swal.fire({
        title: '註冊成功',
        icon: 'success',
        showConfirmButton: false,
        position: 'top',
        timer: 1000,
      });
      return;
    } 
    Swal.fire({
      title: '註冊失敗',
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
  },[navigate,isAuthentical]) //不懂為什麼加這個


  return (
    <AuthContainer>
      <div>
        <ACLogoIcon />
      </div>
      <h1>建立您的帳號</h1>

      <AuthInputContainer>
        <AuthInput
          placeholder="填入帳號"
          label="帳號"
          value={username}
          onChange={(nameInputValue) => setuserName(nameInputValue)}
        />
      </AuthInputContainer>

      <AuthInputContainer>
        <AuthInput
          type="password"
          placeholder="填入密碼"
          label="密碼"
          value={password}
          onChange={(passwordInputValue) => setPassword(passwordInputValue)}
        />
      </AuthInputContainer>

      <AuthInputContainer>
        <AuthInput
          placeholder="填入信箱"
          label="電子郵件"
          value={email}
          onChange={(emailInputValue) => setEmail(emailInputValue)}
        />
      </AuthInputContainer>
      <AuthButton onClick={handleClick}>註冊</AuthButton>
      <Link to="/login">
        <AuthLinkText>取消</AuthLinkText>
      </Link>
    </AuthContainer>
  );
};

export default SignUpPage;
