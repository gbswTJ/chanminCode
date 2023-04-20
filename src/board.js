import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const Board = () => {
  const [boardList, setBoardList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/board")
      .then((res) => {
        setBoardList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${year}년 ${month}월 ${day}일 ${hours}:${minutes}:${seconds}`;
  }
  


  const Boards = ({ id, title,username, created_at,good }) => {
    return (
      <tr key={id}>
        <td>{id}</td>
        <td>{title}</td>
        <td>{username}</td>
        <td>{created_at}</td>
        <td>{good}</td>
      </tr>
    );
  };
  return (
    <>
      <table >
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
            <th>좋아요 수</th>
          </tr>
        </thead>
        <tbody>
          {boardList.map((board) => {
            return (
               <tr key={board.id}>
                <td>{board.id}</td>
                <td>
                  <Link to={`/board/${board.id}`}>{board.title}</Link>
                </td>
               <td>{board.username}</td>
                <td>{formatDate(board.created_at)}</td>
                <td>{board.good}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button><Link to="/boardwrite">게시판 쓰기</Link></button>
    </>
  );
};

export default Board;
