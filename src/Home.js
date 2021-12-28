import React, { useRef } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import "./App.css";

function Home(props) {
  const { datas, setData } = props;
  const titleRef = useRef("");
  const bodyRef = useRef("");
  const navigate = useNavigate();

  const onSubmit = async () => {
    const post = await axios.post("http://127.0.0.1:8000/posts/create/", {
      title: titleRef.current.value,
      body: bodyRef.current.value,
    });
    setData([...datas, post.data]);
  };

  const onDelete = async (idx) => {
    const delPost = await axios.delete(
      `http://127.0.0.1:8000/posts/delete/${idx}/`
    );
    setData([...delPost.data]);
  };
  return (
    <div className="box">
      Title
      <input type="text" ref={titleRef} />
      Body
      <input type="text" ref={bodyRef} />
      <button onClick={onSubmit}>Add</button>
      <h1>Posts</h1>
      {datas.map((da) => {
        return (
          <div
            className="post"
            onClick={() => {
              navigate(`${da.id}`);
            }}
          >
            <div>
              Title: {da.title}{" "}
              <button
                type="button"
                onClick={() => {
                  onDelete(da.id);
                }}
              >
                Delete
              </button>
            </div>
            <div>Isi: {da.body}</div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
