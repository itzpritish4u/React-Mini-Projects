import React, { useState } from "react";
import Comments from "./Components/Comments";

const commentData = [
  {
    id: "1",
    text: "Hello world! How are you?",
    replies: [
      {
        id: "2",
        text: "Hey, I am fine, wau?",
        replies: [],
      },
    ],
  },
];

const App = () => {
  const [comments, setComments] = useState(commentData);
  const [userInput, setUserInput] = useState("");

  const addComment = () => {
    if (userInput.trim()) {
      const newComment = {
        id: Date.now().toString(),
        text: userInput,
        replies: [],
      };
      setComments([...comments, newComment]);
      setUserInput("");
    }
  };

  const addReply = (commentId, replyText) => {
    const updateComments = (comments) =>
      comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [
              ...comment.replies,
              { id: Date.now().toString(), text: replyText, replies: [] },
            ],
          };
        }
        return {
          ...comment,
          replies: updateComments(comment.replies),
        };
      });

    setComments(updateComments(comments));
  };

  const onDelete = (commentId) => {
    const deleteComment = (comments) =>
      comments
        .filter((comment) => comment.id !== commentId)
        .map((comment) => ({
          ...comment,
          replies: deleteComment(comment.replies),
        }));

    setComments(deleteComment(comments));
  };

  return (
    <div>
      <h2>Comments</h2>
      <input
        type="text"
        placeholder="Add Comment..."
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        style={{height: '2rem', width: '10rem'}}
      />
      <button
        style={{
          margin: "1rem",
          width: "3rem",
          backgroundColor: "inherit",
          border: "1px solid",
        }}
        onClick={addComment}
      >
        Add
      </button>
      <Comments comments={comments} addReply={addReply} onDelete={onDelete} />
    </div>
  );
};

export default App;

