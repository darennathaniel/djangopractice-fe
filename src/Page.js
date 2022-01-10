import axios from "axios";
import { useRef, useState, useEffect } from "react";

export default function Page(props) {
  const { data } = props;
  const [comments, setComments] = useState([]);
  useEffect(() => {
    axios.get(`/posts/${data.id}/`).then((res) => {
      setComments(res.data);
      console.log(res.data);
    });
  }, [data.id]);
  const comment = useRef("");
  const onSubmit = async () => {
    const postData = {
      idx: data.id,
      comment: comment.current.value,
    };
    const postComment = await axios.post(`/posts/comments/`, postData);
    setComments([...comments, postComment.data]);
  };
  return (
    <div>
      <div>Title: {data.title}</div>
      <div>Body: {data.body}</div>
      Comment <input ref={comment}></input>
      <button type="submit" onClick={onSubmit}>
        Submit
      </button>
      {comments.map((com) => {
        return <div>{com.comment}</div>;
      })}
    </div>
  );
}
