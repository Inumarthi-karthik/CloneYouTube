import React from "react";
import CommentItem from "./CommentItem";

const CommentList = ({ comments, removeComment }) => {
  return (
    <div>
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} onRemove={removeComment} />
      ))}
    </div>
  );
};

export default CommentList;
