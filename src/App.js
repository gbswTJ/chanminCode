import { Route, Routes } from "react-router-dom";
import Login from "./login";
import Nav from "./nav";
import Register from "./register";
import Main from "./main";
import Board from "./board";
import BoardDetail from "./boardDetail";
import BoardWtire from "./boardwtire";
import Boardupdate from "./boardUpdate";

function App() {
  return (
    <>
      <Nav/>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/" element={<Main/>}/>
        <Route path="/board" element={<Board/>}/>
        <Route path="/board/:id" element={<BoardDetail />} />
        <Route path="/boardwrite" element={<BoardWtire/>}/>
        <Route path="/boardupdate" element={<Boardupdate/>}/>
      </Routes>
    </>
  );
}

export default App;
