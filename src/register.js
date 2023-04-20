import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const registers = () => {
    const id = document.querySelector("#id");
    const pw = document.querySelector("#pw");
    const REpw = document.querySelector("#REpw");
    const name = document.querySelector("#name");

    if(pw.value === REpw.value){
      axios({
        method: 'post',
        url: 'http://localhost:8000/register',
        data: {
          id: id.value,
          pw: pw.value,
          name: name.value
        }
      })
      .then((res) => {
        if(res.data.success) { // 회원가입에 성공한 경우 로그인 페이지로 이동합니다.
          navigate('/login');
        } else {
          alert(res.data.message);
        }
      })
      .catch(err => console.log(err.message));
      
    } else {
      alert('비밀번호가 다릅니다');
    }
  }

  return(
    <>
      <h1>Register</h1>
      ID : <input type="text" id="id"></input><br/>
      PW : <input type="password" id="pw"></input><br/>
      REPW : <input type="password" id="REpw"></input><br/>
      name: <input type="text" id="name"></input>
      <button onClick={registers}>submit</button>
    </>
  )
}

export default Register;
