import React, { useState } from "react";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import axios from "axios";

const CommentItem = ({ comment, onRemove }) => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [translatedText, setTranslatedText] = useState("");

  const handleLike = () => setLikes(likes + 1);
  const handleDislike = () => {
    const newDislikes = dislikes + 1;
    setDislikes(newDislikes);
    if (newDislikes === 2) {
      onRemove(comment.id);
    }
  };

  const translateComment = async () => {
    try {
      const response = await axios.post(
        `https://api.mymemory.translated.net/get?q=${comment.text}&langpair=auto|en`
      );
      setTranslatedText(response.data.responseData.translatedText);
    } catch (error) {
      alert("Translation failed.");
    }
  };

  return (
    <div className="comment-item">
      <p><strong>{comment.city}:</strong> {comment.text}</p>
      {translatedText && <p className="translated">Translated: {translatedText}</p>}
      <button onClick={handleLike}><AiOutlineLike /> {likes}</button>
      <button onClick={handleDislike}><AiOutlineDislike /> {dislikes}</button>
      <button onClick={translateComment}>Translate</button>
    </div>
  );
};

export default CommentItem;
