import { useState } from "react";
import { toast } from "sonner";
import { formatDateTime } from "../utils/dateUtils";

/* Comment Section Component */
export default function CommentSection({
  comments,
  onAddComment,
  isLoggedIn,
  user,
}) {
  const [commentText, setCommentText] = useState("");

  const handleSendComment = () => {
    if (!isLoggedIn) {
      toast.error("Please login to comment");
      return;
    }
    if (!commentText.trim()) {
      toast.error("Please enter a comment");
      return;
    }

    onAddComment({
      author: user.name,
      avatar: user.avatar,
      text: commentText,
    });

    setCommentText("");
    toast.success("Comment added successfully");
  };

  return (
    <>
      {/* Comment Input */}
      <section className="mt-10">
        <h3 className="mb-2 text-lg font-semibold">Comment</h3>

        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="What are your thoughts?"
          className="w-full rounded-[16px] border p-4 text-sm"
          rows={4}
        />

        <div className="mt-4 flex justify-end">
          <button
            onClick={handleSendComment}
            className="rounded-full bg-black px-8 py-2 text-sm text-white"
          >
            Send
          </button>
        </div>
      </section>

      {/* Comment List */}
      <section className="mt-8 space-y-6">
        {comments.length === 0 ? (
          <p className="text-sm text-gray-500">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="flex gap-4">
              <img
                src={comment.avatar}
                alt={comment.author}
                className="h-10 w-10 rounded-full"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-sm">{comment.author}</p>
                  <span className="text-xs text-gray-400">
                    {formatDateTime(comment.createdAt)}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-700">{comment.text}</p>
              </div>
            </div>
          ))
        )}
      </section>
    </>
  );
}

