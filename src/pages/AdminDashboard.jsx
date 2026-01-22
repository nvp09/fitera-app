import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

/** AdminDashboard - หน้า Admin แสดงรายการบทความ */
export default function AdminDashboard() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // ===== FETCH POSTS =====
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "https://blog-post-project-api.vercel.app/posts",
          {
            params: {
              limit: 20,
            },
          }
        );

        setPosts(response.data.posts || []);
      } catch (error) {
        console.error("Error fetching posts:", error);
        toast.error("Failed to load articles");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F5F0]">
      {/* ===== PAGE TITLE ===== */}
      <div className="bg-[#E5E5E5] px-10 py-2">
        <p className="text-xs text-gray-500">admin dashboard</p>
      </div>

      {/* ===== CONTENT ===== */}
      <main className="mx-auto max-w-[1200px] px-10 py-10">
        <h1 className="mb-6 text-2xl font-bold text-[#1C1C1C]">
          Articles Management
        </h1>

        {isLoading ? (
          <p className="text-center text-gray-500">Loading articles...</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <Link
                key={`admin-post-${post.id}-${index}`}
                to={`/admin/article/${post.id}`}
                className="block rounded-[16px] bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="mb-3 h-40 w-full rounded-[12px] object-cover"
                />
                <span className="inline-block rounded-full bg-green-100 px-2 py-1 text-xs text-green-700">
                  {post.category}
                </span>
                <h3 className="mt-2 line-clamp-2 text-sm font-semibold text-[#1C1C1C]">
                  {post.title}
                </h3>
                <p className="mt-1 text-xs text-gray-500">
                  By {post.author}
                </p>
              </Link>
            ))}
          </div>
        )}

        {!isLoading && posts.length === 0 && (
          <p className="text-center text-gray-500">No articles found</p>
        )}
      </main>
    </div>
  );
}
