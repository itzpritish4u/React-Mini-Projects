import React, { useState } from 'react';

const App = () => {
  const [comments, setComments] = useState([
    {
      id: 1,
      text: 'Hello world! How are you?',
      replies: [
        {
          id: 2,
          text: 'Hey, I am fine, wau?',
          replies: [],
        },
      ],
    },
  ]);
  const [newComment, setNewComment] = useState('');
  const [replyText, setReplyText] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);

  const addComment = () => {
    if (newComment.trim()) {
      setComments([...comments, { id: Date.now(), text: newComment, replies: [] }]);
      setNewComment('');
    }
  };

  const addReply = (commentId) => {
    if (replyText.trim()) {
      const updateComments = (comments) => {
        return comments.map((comment) => {
          if (comment.id === commentId) {
            return {
              ...comment,
              replies: [
                ...comment.replies,
                { id: Date.now(), text: replyText, replies: [] },
              ],
            };
          }
          return {
            ...comment,
            replies: updateComments(comment.replies),
          };
        });
      };

      setComments(updateComments(comments));
      setReplyText('');
      setReplyingTo(null);
    }
  };

  const deleteComment = (commentId) => {
    const deleteRecursive = (comments) => {
      return comments
        .filter((comment) => comment.id !== commentId)
        .map((comment) => ({
          ...comment,
          replies: deleteRecursive(comment.replies),
        }));
    };
    setComments(deleteRecursive(comments));
  };

  const renderComments = (comments) => {
    return comments.map((comment) => (
      <div key={comment.id} style={{ marginLeft: '20px', padding: '10px', border: '1px solid #ddd', borderRadius: '5px', backgroundColor: '#f9f9f9', marginBottom: '10px' }}>
        <p>{comment.text}</p>
        <button onClick={() => setReplyingTo(comment.id)}>Reply</button>
        <button onClick={() => deleteComment(comment.id)}>Delete</button>
        {replyingTo === comment.id && (
          <div style={{ marginTop: '10px' }}>
            <input
              type="text"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Reply..."
              style={{ marginRight: '5px' }}
            />
            <button onClick={() => addReply(comment.id)}>Add</button>
            <button onClick={() => setReplyingTo(null)}>Cancel</button>
          </div>
        )}
        <div style={{ marginLeft: '20px' }}>{renderComments(comment.replies)}</div>
      </div>
    ));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Comments</h2>
      <div style={{ display: 'flex', marginBottom: '10px' }}>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add comment..."
          style={{ flex: 1, marginRight: '5px' }}
        />
        <button onClick={addComment}>Add</button>
      </div>
      <div>{renderComments(comments)}</div>
    </div>
  );
};

export default App;
