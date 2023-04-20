import Editor from './EditorComponent';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import axios from 'axios';

const BoardWrite = () => {
  const [desc, setDesc] = useState('');
  const [title, setTitle] = useState('');
  const navigate = useNavigate();
  function onEditorChange(value) {
      setDesc(value)
  }

  function handleSubmit(event) {
    event.preventDefault();
    const sanitizedDesc = DOMPurify.sanitize(desc);
    const sanitizedTitle = DOMPurify.sanitize(title);
    const isLogin = sessionStorage.getItem("isLogin");
    const username = sessionStorage.getItem("token");
    axios.post('http://localhost:8000/board/write', { 
      title: sanitizedTitle, 
      content: sanitizedDesc,
      isLogin: isLogin,
      username: username
    })
      .then((res) => {
        if(res.data.success){
          alert("작성에 성공했다.");
          navigate('/board');
        }else{
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
      <div style={{margin: "0 auto",width: "1000px"}}>
        제목: <input type='text' id='title' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='제목을 입력해주세요'></input><br/>
        내용: <Editor value={desc} onChange={onEditorChange} />
        <button id='btn' onClick={handleSubmit}>제출</button>
      </div>
  )
}

export default BoardWrite;
