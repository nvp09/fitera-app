import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";

export default function PostPage() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // สมมติว่ายังไม่ได้ login
  const isLoggedIn = false;

  // state สำหรับ login modal แจ้งเตือนถ้ายังไม่ได้ log in
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          "https://blog-post-project-api.vercel.app/posts"
        );

        // หา post ตาม id จาก URL
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

  if (isLoading) return <p className="p-6">Loading...</p>; //
  if (!post) return <p className="p-6">Post not found</p>;

  // ===== helpers เปนตัวกลางที่ช่วยตรวจสอบว่าถ้ากดแต่ละปุ่มนี้ login หรือยัง ถ้ายัง เด้งไปที่ หน้า log in =====
  const requireLogin = () => {
    setShowLoginModal(true);
  };

  const handleLike = () => {
    if (!isLoggedIn) return requireLogin();
  };

  const handleSendComment = () => {
    if (!isLoggedIn) return requireLogin();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);

    // ปุ่ม ✕ มุมขวาบนของกล่องแจ้งเตือน copied
    toast.custom((t) => (
      <div className="relative w-[360px] rounded-xl border border-green-200 bg-green-50 px-4 py-3 shadow-lg">
        <button
          onClick={() => toast.dismiss(t)}
          className="absolute right-2 top-2 text-sm text-green-700"
        >
          ✕
        </button>

        <p className="font-semibold text-green-800">
          Copied!
        </p>
        <p className="text-sm text-green-700">
          This article has been copied to your clipboard.
        </p>
      </div>
    ));
  };

  const shareUrl = window.location.href;

  return (
    <>
      <main className="mx-auto max-w-[900px] px-4 py-10">
        {/* ===== รูป IMAGE ===== */}
        <img
          src={post.image}
          alt={post.title}
          className="mb-8 w-full rounded-[24px]"
        />

        {/* ===== กล่องบอกหมวด CATEGORY ===== */}
        <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-[12px] text-green-700">
          {post.category}
        </span>

        {/* ===== กล่องหัวข้อ TITLE ===== */}
        <h1 className="mt-4 text-[28px] font-bold text-[#1C1C1C]">
          {post.title}
        </h1>

        <p className="mt-2 text-[14px] text-gray-600">
          By {post.author}
        </p>

        {/* ===== CONTENT =====แสดงเนื้อหาบทความโดยแปลงข้อความMarkdownจากAPIให้เป็นHTMLด้วยReactMarkdown*/}
        <div className="markdown mt-8">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>

        {/* ===== กล่องกด like-copy-facebook-linkin-twitter ===== */}
        <div className="mt-12 rounded-[20px] bg-[#F3F1ED] px-6 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={handleLike}
              className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm border"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-thumbs-up-icon lucide-thumbs-up"><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"/><path d="M7 10v12"/></svg> Like
            </button>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm border"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy-icon lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg> Copy
              </button>

              <a
                href={`https://www.facebook.com/share.php?u=${shareUrl}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border bg-white px-4 py-2 text-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-facebook-icon lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>

              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border bg-white px-4 py-2 text-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-linkedin-icon lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>

              <a
                href={`https://www.twitter.com/share?&url=${shareUrl}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border bg-white px-4 py-2 text-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-twitter-icon lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
            </div>
          </div>
        </div>

        {/* ===== กล่อง COMMENT ===== */}
        <section className="mt-10">
          <h3 className="mb-2 text-lg font-semibold">Comment</h3>

          <textarea
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
      </main>

      {/* ===== กล่องแจ้งเตือนให้ LOGIN ===== */}
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

            <button className="mt-6 w-full rounded-full bg-black py-3 text-white">
              Create account
            </button>

            <p className="mt-4 text-sm text-gray-600">
              Already have an account?{" "}
              <span className="cursor-pointer font-semibold underline">
                Log in
              </span>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
