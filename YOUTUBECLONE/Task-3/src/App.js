import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentBox from "./components/CommentBox";
import CommentList from "./components/CommentList";

const App = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchCity();
  }, []);

  const fetchCity = async () => {
    try {
      const response = await axios.get("https://ipapi.co/json/");
      localStorage.setItem("userCity", response.data.city);
    } catch (error) {
      alert("Could not fetch location.");
    }
  };

  const addComment = (text) => {
    const userCity = localStorage.getItem("userCity") || "Unknown City";
    const newComment = { id: Date.now(), text, city: userCity };
    setComments([...comments, newComment]);
  };

  const removeComment = (id) => {
    setComments(comments.filter(comment => comment.id !== id));
  };

  return (
    <div>
      <h1>Comment Section</h1>
      <CommentBox addComment={addComment} />
      <CommentList comments={comments} removeComment={removeComment} />
    </div>
  );
};

export default App;
