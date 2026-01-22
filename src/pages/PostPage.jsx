import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { useAuth } from "../contexts/AuthContext";
import { useLikes } from "../hooks/useLikes";
import { useComments } from "../hooks/useComments";
import LikeShareBar from "../components/LikeShareBar";
import CommentSection from "../components/CommentSection";

export default function PostPage() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();

  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Custom hooks
  const { likeCount, liked, toggleLike } = useLikes(postId, user);
  const { comments, addComment } = useComments(postId);

  // Load post
  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          "https://blog-post-project-api.vercel.app/posts"
        );

        const foundPost = res.data.posts.find(
          (item) => item.id === Number(postId)
        );

        setPost(foundPost || null);
      } catch (error) {
        console.error(error);
        setPost(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (!post) return <p className="p-6">Post not found</p>;

  const requireLogin = () => setShowLoginModal(true);

  const handleLike = () => {
    if (!isLoggedIn) return requireLogin();
    toggleLike();
  };

  const handleAddComment = (comment) => {
    addComment(comment);
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

        <p className="mt-2 text-[14px] text-gray-600">By {post.author}</p>

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
