import { useParams, Link } from "react-router-dom";
import useSWR from 'swr'
import { fetcher } from "./utils/fetcher";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
const BoardDetail = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useSWR(`http://localhost:8000/board/${id}`, fetcher)
  const navigate = useNavigate();
  const idx_id = sessionStorage.getItem("isLogin");
  const goods = () =>{
    const userid = sessionStorage.getItem("isLogin");

    axios({
      method: 'post',
      url: 'http://localhost:8000/board/good',
      data: {
        userid,
        id
      }
    })
    .then((res) =>{
      if(res.data.success) { 
        window.location.reload();
      } else {
        alert(res.data.message);
      }})
      .catch(err => console.log(err.message));

  }

  const update = () =>{
    sessionStorage.setItem("board_ID",id);
    navigate("/boardupdate");
  }

  if (error) {
    return <>error</>;
  }
  if (isLoading) {
    return <>loading</>;
  }
  if (!data) {
    return <>No data found</>;
  }
  return (
    <div>
      <h1>{data.data.title}</h1>
      {
        parseInt(idx_id) === data.data.user_id ?

        <div>
          <button onClick={update}>수정</button> 
          <button >삭제</button>
        </div>
        :
        ""
      }
      내용: <div dangerouslySetInnerHTML={{__html:data.data.content}}></div>
      <p>
        <span onClick={goods}>👍</span> {data.data.good}</p>
      <Link to="/board">게시판으로 돌아가기</Link>
    </div>
  );
  
};

export default BoardDetail;
