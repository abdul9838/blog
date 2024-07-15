import React, { useEffect, useRef, useState } from "react";

const CommentForm = ({
  btnLabel,
  addCommentHandler,
  formCancelHandler = null,
  initialText = "",
  affectedComment = null,
}) => {
  const [value, setValue] = useState(initialText);
  const textareaRef = useRef(null);
  const submitHandler = (e) => {
    e.preventDefault();
    addCommentHandler(value);
    setValue("");
  };

  useEffect(() => {
    if (textareaRef.current) {
      const length = textareaRef.current.value.length;
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(length, length);
    }
  }, [affectedComment]);
  return (
    <form onSubmit={submitHandler}>
      <div className="flex flex-col items-end border border-primary rounded-lg p-4">
        <textarea
          value={value}
          ref={textareaRef}
          onChange={(e) => setValue(e.target.value)}
          className="w-full focus:outline-none placeholder:text-sm text-sm bg-transparent"
          rows="3"
          placeholder="Leave your comment here..."
        />

        <div className="flex lg:flex-col-reverse flex-row gap-y-2 items-center gap-x-2 pt-2 min-[420px]:flex-row">
          {formCancelHandler && (
            <button
              onClick={formCancelHandler}
              className="lg:px-4 lg:py-2 text-xs lg:text-sm px-2 py-1 rounded-lg border border-red-500 text-red-500"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="lg:px-4 lg:py-2 text-xs lg:text-sm px-2 py-1.5 rounded-lg bg-primary text-white font-semibold disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {btnLabel}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CommentForm;
