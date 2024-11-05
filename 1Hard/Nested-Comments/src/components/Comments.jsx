import React, { useState } from "react";

const Comments = ({ comments, addReply, onDelete }) => {
  return (
    <div>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          addReply={addReply}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

const Comment = ({ comment, addReply, onDelete }) => {
  const [displayInput, setDisplayInput] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleReply = () => {
    if (replyText.trim()) {
      addReply(comment.id, replyText.trim());
      setReplyText("");
      setDisplayInput(false);
    }
  };

  const handleCancel = () => {
    setReplyText("");
    setDisplayInput(false);
  };

  return (
    <div className="comment-container">
      <h3>{comment.text}</h3>
      <div>
        <button onClick={() => setDisplayInput(!displayInput)}>Reply</button>
        <button onClick={() => onDelete(comment.id)}>Delete</button>
      </div>
      {displayInput && (
        <div>
          <input
            type="text"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
          <button onClick={handleReply}>Submit</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      )}
      <div style={{ paddingLeft: "25px" }}>
        {comment.replies.map((reply) => (
          <Comment
            key={reply.id}
            comment={reply}
            addReply={addReply}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default Comments;
