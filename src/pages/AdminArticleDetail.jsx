import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { useAuth } from "../contexts/AuthContext";
import { useLikes } from "../hooks/useLikes";
import { useComments } from "../hooks/useComments";
import { formatDate } from "../utils/dateUtils";
import LikeShareBar from "../components/LikeShareBar";
import CommentSection from "../components/CommentSection";

export default function AdminArticleDetail() {
  const { postId } = useParams();
  const { user, isLoggedIn } = useAuth();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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

    if (postId) {
      fetchPost();
    }
  }, [postId]);

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (!post) return <p className="p-6">Post not found</p>;

  // Mock author data
  const author = {
    name: "Thompson P.",
    avatar: "https://i.pravatar.cc/150?img=12",
    bio: "I am a pet enthusiast and freelance writer who specializes in animal behavior and care. With a deep love for cats, I enjoy sharing insights on feline companionship and wellness.",
  };

  const handleLike = () => {
    if (!isLoggedIn) {
      return;
    }
    toggleLike();
  };

  const handleAddComment = (comment) => {
    addComment(comment);
  };

  const shareUrl = window.location.href;

  return (
    <div className="min-h-screen bg-[#F7F5F0]">
      {/* ===== PAGE TITLE ===== */}
      <div className="bg-[#E5E5E5] px-10 py-2">
        <p className="text-xs text-gray-500">article detail</p>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <main className="mx-auto max-w-[1200px] px-10 py-10">
        {/* ===== WHITE CARD ===== */}
        <div className="relative rounded-[24px] bg-white p-8 shadow-sm">
          {/* ===== LOGO (top left) ===== */}
          <div className="absolute left-8 top-8">
            <span className="text-lg font-semibold text-[#1C1C1C]">hh.</span>
          </div>

          {/* ===== ARTICLE IMAGE ===== */}
          <img
            src={post.image}
            alt={post.title}
            className="mb-6 mt-12 w-full rounded-[24px] object-cover"
          />

          {/* ===== CONTENT LAYOUT ===== */}
          <div className="flex gap-8">
            {/* ===== LEFT: ARTICLE CONTENT ===== */}
            <article className="flex-1">
              {/* ===== CATEGORY TAG ===== */}
              <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">
                {post.category}
              </span>

              {/* ===== DATE ===== */}
              <p className="mt-2 text-sm text-gray-600">
                {formatDate(post.createdAt || new Date().toISOString())}
              </p>

              {/* ===== TITLE ===== */}
              <h1 className="mt-4 text-3xl font-bold text-[#1C1C1C]">
                {post.title}
              </h1>

              {/* ===== MARKDOWN CONTENT ===== */}
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
            </article>

            {/* ===== RIGHT: AUTHOR BOX ===== */}
            <aside className="w-[300px] shrink-0">
              <div className="rounded-[16px] bg-white border border-gray-200 p-6">
                <h3 className="mb-4 text-sm font-semibold text-gray-700">
                  Author
                </h3>

                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={author.avatar}
                    alt={author.name}
                    className="h-10 w-10 rounded-full"
                  />
                  <span className="text-sm font-medium text-[#1C1C1C]">
                    {author.name}
                  </span>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed">
                  {author.bio}
                </p>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
