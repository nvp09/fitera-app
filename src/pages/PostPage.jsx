import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { useAuth } from "../contexts/AuthContext";
import { useLikes } from "../hooks/useLikes";
import { useComments } from "../hooks/useComments";
import LikeShareBar from "../components/LikeShareBar";
import CommentSection from "../components/CommentSection";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function PostPage() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();

  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // ===== Custom hooks =====
  const { likeCount, liked, toggleLike } = useLikes(postId, user);
  const { comments, addComment, deleteComment } = useComments(postId);

  // ===== Load single post =====
  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `${API_BASE_URL}/posts/${postId}`
        );

        setPost(res.data.data);
      } catch (error) {
        console.error("Fetch post error:", error);
        setPost(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (postId) {
      fetchPost();
    }
  }, [postId]);

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (!post) return <p className="p-6">Post not found</p>;

  const requireLogin = () => setShowLoginModal(true);

  // ===== Like =====
  const handleLike = () => {
    if (!isLoggedIn) return requireLogin();
    toggleLike();
  };

  // ===== Add comment =====
  const handleAddComment = (comment) => {
    addComment(comment);
  };

  // ===== Admin delete comment =====
  const handleDeleteComment = (commentId) => {
    if (user?.role !== "admin") return;
    deleteComment(commentId);
  };

  const shareUrl = window.location.href;

  return (
    <>
      <main className="mx-auto max-w-[900px] px-4 py-10">
        {/* ===== IMAGE ===== */}
        <img
          src={post.image}
          alt={post.title}
          className="mb-8 w-full rounded-[24px]"
        />

        <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-[12px] text-green-700">
          {post.category}
        </span>

        <h1 className="mt-4 text-[28px] font-bold text-[#1C1C1C]">
          {post.title}
        </h1>

        <p className="mt-2 text-[14px] text-gray-600">
          By {post.author ?? "Unknown"}
        </p>

        <div className="markdown mt-8">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>

        {/* ===== LIKE / SHARE ===== */}
        <LikeShareBar
          likeCount={likeCount}
          liked={liked}
          onLike={handleLike}
          shareUrl={shareUrl}
          isLoggedIn={isLoggedIn}
        />

        {/* ===== COMMENT SECTION ===== */}
        <CommentSection
          comments={comments}
          onAddComment={handleAddComment}
          onDeleteComment={handleDeleteComment}
          isLoggedIn={isLoggedIn}
          user={user}
        />
      </main>

      {/* ===== LOGIN MODAL ===== */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="relative w-[420px] rounded-[24px] bg-white p-8 text-center">
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute right-4 top-4 text-xl"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold">
              Create an account to
              <br />
              continue
            </h2>

            <button
              onClick={() => navigate("/signup")}
              className="mt-6 w-full rounded-full bg-black py-3 text-white"
            >
              Create account
            </button>

            <p className="mt-4 text-sm text-gray-600">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="cursor-pointer font-semibold underline"
              >
                Log in
              </span>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
