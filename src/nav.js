import { NavLink } from "react-router-dom"
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
const Nav = () =>{
  const [cookies, ,removeCookie] = useCookies();
  const navigate = useNavigate();


  const logout = () =>{
    axios({
      method: 'post',
      url: 'http://localhost:8000/logout'
    })
    .then((res) =>{
      if(res.data.success) { 
        sessionStorage.setItem("isLogin","");
        navigate('/');
      } else {
        alert(res.data.message);
      }})
      .catch(err => console.log(err.message));
  }

  return(
    <>
    <NavLink to = "/" > Main</NavLink>
    {
     sessionStorage.getItem("isLogin") ?
    <>
      <NavLink to="/board">board</NavLink>
      <label onClick={logout} >logout</label>
    </>    
     :
    <>
     <NavLink to="/login">login</NavLink>
     <NavLink to="/register">register</NavLink>
    </>

    }
   
    </>
  )
}

export default Nav;