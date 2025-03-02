import React, { useState } from "react";

const CommentBox = ({ addComment }) => {
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim() || /[^a-zA-Z0-9\s]/.test(comment)) {
      alert("Special characters are not allowed!");
      return;
    }
    addComment(comment);
    setComment("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Write a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
      />
      <button type="submit">Post</button>
    </form>
  );
};

export default CommentBox;
