import React, { useState, useEffect } from "react";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import { getCommentsData } from "./../../data/comments";

const CommentsContainer = ({ className, loggedInUserId }) => {
  const [comments, setComments] = useState([]);
  const [affectedComment, setAffectedComment] = useState(null);

  // getiing parent comments
  const mainComments = comments.filter((comment) => comment.parent === null);

  const getRepliesHandler = (commentId) => {
    return comments
      .filter((comment) => comment.parent === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

    const addCommentHandler = (value, parent = null, replyOnUser = null) => {
      if (value) {
        const newComment = {
          _id: Math.random().toString(36).substr(2, 9),
          user: {
            _id: "a",
            name: "Abdul Ahad",
          },
          desc: value,
          post: "1",
          parent,
          replyOnUser,
          createdAt: new Date().toISOString(),
        };

        setComments((comments) => [newComment, ...comments]);
        setAffectedComment(null);
      }
      setAffectedComment(null);
    };
    const updateCommentHandler = (value, commentId) => {
      if (value) {
        const updatedComment = comments.map((comment) => {
          if (comment._id === commentId) {
            return { ...comment, desc: value };
          }
          return comment;
        });
        setComments(updatedComment);
        setAffectedComment(null);
      } else {
        setAffectedComment(null);
      }
    };

    const deleteComment = (commentId) => {
      setComments(comments.filter((comment) => comment._id !== commentId));
    };

    useEffect(() => {
      (async () => {
        const commentData = await getCommentsData();
        setComments(commentData);
      })();
    }, []);
  };

  return (
    <div className={`${className}`}>
      <CommentForm
        btnLabel="Send"
        addCommentHandler={(value) => addCommentHandler(value)}
      />
      <div className="space-y-4 mt-8">
        {mainComments.map((comment) => (
          <Comment
            key={comment._id}
            comment={comment}
            loggedInUserId={loggedInUserId}
            affectedComment={affectedComment}
            setAffectedComment={setAffectedComment}
            addCommentHandler={addCommentHandler}
            updateCommentHandler={updateCommentHandler}
            deleteComment={deleteComment}
            replies={getRepliesHandler(comment._id)}
            getRepliesHandler={getRepliesHandler}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentsContainer;
