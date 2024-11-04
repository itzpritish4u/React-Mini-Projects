import React, { useState } from "react";

const App = () => {
  const [comments, setComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState("");

  // Function to add a new comment or a reply
  const addComment = (text, parentId = null) => {
    const newComment = {
      id: Date.now(),
      text,
      replies: [],
      isReplying: false,
    };

    if (parentId === null) {
      setComments([...comments, newComment]);
    } else {
      const updatedComments = comments.map((comment) =>
        comment.id === parentId
          ? { ...comment, replies: [...comment.replies, newComment] }
          : {
              ...comment,
              replies: addReplyToNestedComments(comment.replies, parentId, newComment),
            }
      );
      setComments(updatedComments);
    }
  };

  // Helper function to add a reply to nested comments
  const addReplyToNestedComments = (commentsArray, parentId, newReply) => {
    return commentsArray.map((comment) =>
      comment.id === parentId
        ? { ...comment, replies: [...comment.replies, newReply] }
        : {
            ...comment,
            replies: addReplyToNestedComments(comment.replies, parentId, newReply),
          }
    );
  };

  // Function to delete a comment or a reply
  const deleteComment = (id, parentId = null) => {
    if (parentId === null) {
      setComments(comments.filter((comment) => comment.id !== id));
    } else {
      const updatedComments = comments.map((comment) => {
        if (comment.id === parentId) {
          return {
            ...comment,
            replies: comment.replies.filter((reply) => reply.id !== id),
          };
        }
        return {
          ...comment,
          replies: deleteCommentFromNestedComments(comment.replies, id),
        };
      });
      setComments(updatedComments);
    }
  };

  // Helper function to delete a reply from nested comments
  const deleteCommentFromNestedComments = (commentsArray, id) => {
    return commentsArray.map((comment) => ({
      ...comment,
      replies: comment.replies.filter((reply) => reply.id !== id),
    }));
  };

  // Function to toggle the reply form for a specific comment
  const toggleReplying = (id) => {
    setComments(
      comments.map((comment) =>
        comment.id === id
          ? { ...comment, isReplying: !comment.isReplying }
          : {
              ...comment,
              replies: toggleReplyingInNestedComments(comment.replies, id),
            }
      )
    );
  };

  // Helper function to toggle the reply form in nested comments
  const toggleReplyingInNestedComments = (commentsArray, id) => {
    return commentsArray.map((comment) =>
      comment.id === id
        ? { ...comment, isReplying: !comment.isReplying }
        : {
            ...comment,
            replies: toggleReplyingInNestedComments(comment.replies, id),
          }
    );
  };

  // Function to handle adding a top-level comment
  const handleAddComment = () => {
    if (newCommentText.trim()) {
      addComment(newCommentText);
      setNewCommentText("");
    }
  };

  // Comment component to recursively render comments and replies
  const Comment = ({ comment, addComment, deleteComment }) => {
    const [replyText, setReplyText] = useState("");

    const handleReply = () => {
      if (replyText.trim()) {
        addComment(replyText, comment.id);
        setReplyText("");
        toggleReplying(comment.id);
      }
    };

    return (
      <div
        style={{
          marginLeft: "20px",
          padding: "10px",
          borderLeft: "3px solid blue",
          background: "#f7f8fa",
          marginTop: "10px",
          borderRadius: "8px",
        }}
      >
        <p>{comment.text}</p>
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={() => deleteComment(comment.id)}>Delete</button>
          <button onClick={() => toggleReplying(comment.id)}>Reply</button>
        </div>

        {comment.isReplying && (
          <div style={{ marginTop: "10px" }}>
            <input
              type="text"
              placeholder="Reply..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />
            <button onClick={handleReply}>Add</button>
            <button onClick={() => toggleReplying(comment.id)}>Cancel</button>
          </div>
        )}

        {comment.replies.length > 0 && (
          <div style={{ marginTop: "10px" }}>
            {comment.replies.map((reply) => (
              <Comment
                key={reply.id}
                comment={reply}
                addComment={addComment}
                deleteComment={deleteComment}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <h2>Comments</h2>
      <div>
        <input
          type="text"
          placeholder="Add comment..."
          value={newCommentText}
          onChange={(e) => setNewCommentText(e.target.value)}
        />
        <button onClick={handleAddComment}>Add</button>
      </div>

      <div style={{ marginTop: "20px" }}>
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            addComment={addComment}
            deleteComment={deleteComment}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
