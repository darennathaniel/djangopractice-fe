import axios from "axios";
import { useRef, useState } from "react";

export default function Page(props) {
  const { data } = props;
  var str = data.comments.replace(/'/g, '"');
  str = JSON.parse(str);
  const [comments, setComments] = useState(str.all);
  const comment = useRef("");
  const onSubmit = async () => {
    const putComment = await axios.put("/posts/comments/", {
      idx: data.id,
      comment: comment.current.value,
    });
    var str = putComment.data.comments.replace(/'/g, '"');
    str = JSON.parse(str);
    setComments([...str.all]);
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
        return <div>{com}</div>;
      })}
    </div>
  );
}
