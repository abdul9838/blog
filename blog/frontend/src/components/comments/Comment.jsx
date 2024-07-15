import React from "react";
import { FiEdit2, FiMessageSquare, FiTrash } from "react-icons/fi";
import CommentForm from "./CommentForm";
import images from "./../../constants/images";

const Comment = ({
  comment,
  loggedInUserId,
  setAffectedComment,
  affectedComment,
  parentId = null,
  addCommentHandler,
  updateCommentHandler,
  deleteComment,
  replies,
  showComment = true,
}) => {
  const isUserLoggedIn = Boolean(loggedInUserId);
  const commentBelongsToUser = comment.user._id === loggedInUserId;

  const isReplying =
    affectedComment &&
    affectedComment.type === "replying" &&
    affectedComment._id === comment._id;

  const isEditing =
    affectedComment &&
    affectedComment.type === "editing" &&
    affectedComment._id === comment._id;

  const repliedCommentId = parentId ? parentId : comment._id;
  const replyOnUserId = comment.user._id;

  return (
    <div
      className={`${showComment && "border-gray-300 border p-4"} rounded-lg `}
    >
      <div className="flex flex-nowrap items-start gap-x-3 bg-[#F2F4F5] p-3 rounded-md">
        <img
          src={images.post3}
          alt="user profile"
          className="w-9 h-9 object-cover rounded-full"
        />

        <div className="flex-1 flex flex-col">
          <h5 className="font-bold text-dark-hard text-xs lg:text-sm">
            {comment.user.name}
          </h5>
          <span className="text-[10px] text-dark-light">
            {new Date(comment.createdAt).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
              hour: "2-digit",
            })}
          </span>
          <p className="font-opensans text-sm text-dark-hard">{comment.desc}</p>
          {isEditing && (
            <CommentForm
              btnLabel="Update"
              addCommentHandler={(value) =>
                updateCommentHandler(value, comment._id)
              }
              formCancelHandler={() => setAffectedComment(null)}
              initialText={comment.desc}
            />
          )}
          <div className="flex items-center gap-x-3 text-dark-light font-roboto text-sm mt-3 mb-3">
            {isUserLoggedIn && showComment && (
              <button
                className="flex items-center space-x-2"
                onClick={() =>
                  setAffectedComment({ type: "replying", _id: comment._id })
                }
              >
                <FiMessageSquare className="w-4 h-auto" />
                <span>Reply</span>
              </button>
            )}

            {commentBelongsToUser && (
              <>
                <button
                  className="flex items-center space-x-2"
                  onClick={() =>
                    setAffectedComment({ type: "editing", _id: comment._id })
                  }
                >
                  <FiEdit2 className="w-4 h-auto" />
                  <span>Edit</span>
                </button>
                <button
                  className="flex items-center space-x-2"
                  onClick={() => deleteComment(comment._id)}
                >
                  <FiTrash className="w-4 h-auto" />
                  <span>Delete</span>
                </button>
              </>
            )}
          </div>
          {isReplying && (
            <CommentForm
              btnLabel="Reply"
              addCommentHandler={(value) =>
                addCommentHandler(value, repliedCommentId, replyOnUserId)
              }
              formCancelHandler={() => setAffectedComment(null)}
              affectedComment={affectedComment}
            />
          )}
        </div>
      </div>
      {replies.length > 0 && (
        <div className="ml-4 mt-4 space-y-4">
          {replies.map((reply) => (
            <Comment
              key={reply._id}
              showComment={false}
              comment={reply}
              loggedInUserId={loggedInUserId}
              affectedComment={affectedComment}
              setAffectedComment={setAffectedComment}
              addCommentHandler={addCommentHandler}
              updateCommentHandler={updateCommentHandler}
              deleteComment={deleteComment}
              replies={[]}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
