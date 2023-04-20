import Editor from './EditorComponent';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import axios from 'axios';

const Boardupdate = () => {
  const boardID = sessionStorage.getItem('board_ID');
  const isLogin = sessionStorage.getItem('isLogin');
  const [desc, setDesc] = useState('');
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .post('http://localhost:8000/board/update', {
        boardID,  
        isLogin,
        give: true
      }).then((res) => {
        if(res.data.success) {
          setTitle(res.data.data[0].title);
          setDesc(res.data.data[0].content);
        } else {
          alert(res.data.message);
          navigate("/");
        }
      })
      .catch((err) => console.log(err.message));
  }, [boardID, isLogin, navigate]);

  function onEditorChange(value) {
    setDesc(value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const sanitizedDesc = DOMPurify.sanitize(desc);
    const sanitizedTitle = DOMPurify.sanitize(title);
    const isLogin = sessionStorage.getItem('isLogin');
    const username = sessionStorage.getItem('token');
    axios
      .post('http://localhost:8000/board/update', {
        title: sanitizedTitle,
        content: sanitizedDesc,
        isLogin: isLogin,
        username: username,
        give: false
      })
      .then((res) => {
        if (res.data.success) {
          alert('작성에 성공했다.');
          sessionStorage.setItem('board_ID', "");
          navigate('/board');
        } else {
          alert(res.data.message);
        }
      })
      .catch(err => console.log(err.message));
  }

  return (
    <div style={{ margin: '0 auto', width: '1000px' }}>
      제목:
      <input
        type='text'
        id='title'
        defaultValue={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder='제목을 입력해주세요'
      ></input>
      <br />
      내용: <Editor value={desc} onChange={onEditorChange} />
      <button id='btn' onClick={handleSubmit}>
        제출
      </button>
    </div>
  );
};

export default Boardupdate;
