import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const login = () => {
    const id = document.querySelector("#id");
    const pw = document.querySelector("#pw");

    axios({
      method: 'post',
      url: 'http://localhost:8000/login',
      data: {
        id: id.value,
        pw: pw.value
      }
    })
    .then((res) =>{
      if(res.data.success) { 
        sessionStorage.setItem("isLogin",res.data.isLogin);
        sessionStorage.setItem("token",res.data.token);
        navigate('/');
      } else {
        alert(res.data.message);
      }})
      .catch(err => console.log(err.message));
  }
  return(
    <>
    <h1>login</h1>
    ID : <input type="text" id="id"></input><br></br>
    PW : <input type="password" id="pw"></input>
    <button onClick={login}>submit</button>
    </>
  )
}

export default Login