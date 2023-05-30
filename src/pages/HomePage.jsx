import { useAuth } from "context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";




const HomePage = () => {
  const {isAuthentical} = useAuth()
  const navigate = useNavigate()

  useEffect(()=>{
    if(isAuthentical){
      navigate('/todopage')
    }else{
      navigate('/login')
    }
  },[
    navigate, isAuthentical
  ])

  return <div>HomePage</div>;
};

export default HomePage;
