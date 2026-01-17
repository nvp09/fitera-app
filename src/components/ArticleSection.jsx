import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import BlogCard from "./BlogCard";
import axios from "axios";

const categories = ["Highlight", "Cat", "Inspiration", "General"];
const LIMIT = 6;
const BASE_URL = "https://blog-post-project-api.vercel.app/posts";

export default function ArticleSection() {
  // ===== category + pagination =====
  const [category, setCategory] = useState("Highlight");
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // ===== loading =====
  const [isLoading, setIsLoading] = useState(false);

  // ===== search =====
  const [keyword, setKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // ================= FETCH POSTS (pagination + category) =================
  const fetchPosts = async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    try {
      const response = await axios.get(BASE_URL, {
        params: {
          page,
          limit: LIMIT,
          category: category === "Highlight" ? undefined : category,
        },
      });

      setPosts((prev) => [...prev, ...response.data.posts]);

      if (response.data.currentPage >= response.data.totalPages) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // โหลดข้อมูลเมื่อ page หรือ category เปลี่ยน
  useEffect(() => {
    fetchPosts();
  }, [page, category]);

  // reset เมื่อเปลี่ยน category
  useEffect(() => {
    setPosts([]);
    setPage(1);
    setHasMore(true);
  }, [category]);

  // ================= SEARCH (keyword) =================
  useEffect(() => {
    if (keyword.trim() === "") {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const response = await axios.get(BASE_URL, {
          params: {
            keyword,
            limit: 5,
          },
        });

        setSearchResults(response.data.posts);
        setShowDropdown(true);
      } catch (error) {
        console.error("Search error:", error);
      }
    }, 400); // debounce

    return () => clearTimeout(timer);
  }, [keyword]);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <section className="mt-14">
      <div className="px-4">
        <h2 className="mb-6 text-[18px] font-semibold text-[#1C1C1C]">
          Latest articles
        </h2>

        {/* ================= MOBILE ================= */}
        <div className="md:hidden">
          <div className="rounded-[16px] bg-[#F3F1ED] p-4 space-y-3">
            {/* Search (mobile) */}
            <div className="relative">
              <Input
                type="text"
                placeholder="Search"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="h-12 rounded-[14px] border-gray-200 bg-white pl-4 pr-10 text-[14px]"
              />
              <Search
                size={18}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              {showDropdown && (
                <div className="absolute top-14 w-full rounded-[12px] bg-white shadow-lg z-50 overflow-hidden">
                  {searchResults.length === 0 ? (
                    <p className="px-4 py-3 text-sm text-gray-500">
                      No results found
                    </p>
                  ) : (
                    searchResults.map((post) => (
                      <Link
                        key={post.id}
                        to={`/post/${post.id}`}
                        onClick={() => setShowDropdown(false)}
                        className="block px-4 py-3 text-sm hover:bg-gray-100"
                      >
                        {post.title}
                      </Link>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Category (mobile) */}
            <div>
              <p className="mb-1 px-1 text-[12px] text-[#8B8B8B]">
                Category
              </p>

              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="h-12 w-full rounded-[16px] bg-white">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent className="rounded-[16px] bg-white">
                  {categories.map((item) => (
                    <SelectItem
                      key={item}
                      value={item}
                      className="cursor-pointer rounded-md hover:bg-gray-200"
                    >
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* ================= DESKTOP ================= */}
        <div className="relative hidden md:flex items-center justify-between rounded-[16px] bg-[#F3F1ED] px-4 py-3">
          {/* Category buttons */}
          <div className="flex items-center gap-2">
            {categories.map((item) => {
              const isActive = category === item;

              return (
                <button
                  key={item}
                  disabled={isActive}
                  onClick={() => setCategory(item)}
                  className={`
                    px-4 py-2 rounded-[8px] text-[14px] transition-all
                    ${
                      isActive
                        ? "bg-[#DAD6D1] text-[#1C1C1C]"
                        : "text-[#6B6B6B] hover:bg-orange-200"
                    }
                  `}
                >
                  {item}
                </button>
              );
            })}
          </div>

          {/* Search (desktop) */}
          <div className="relative w-[260px]">
            <Input
              type="text"
              placeholder="Search"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="h-10 rounded-[10px] bg-white pl-4 pr-10"
            />
            <Search
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            {showDropdown && (
              <div className="absolute top-12 w-full rounded-[12px] bg-white shadow-lg z-50 overflow-hidden">
                {searchResults.length === 0 ? (
                  <p className="px-4 py-3 text-sm text-gray-500">
                    No results found
                  </p>
                ) : (
                  searchResults.map((post) => (
                    <Link
                      key={post.id}
                      to={`/post/${post.id}`}
                      onClick={() => setShowDropdown(false)}
                      className="block px-4 py-3 text-sm hover:bg-gray-100"
                    >
                      {post.title}
                    </Link>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        {/* ================= ARTICLES LIST ================= */}
        <section className="mt-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post.id} {...post} />
            ))}
          </div>

          {/* View more */}
          {hasMore && (
            <div className="mt-16 mb-20 flex justify-center">
              <button
                type="button"
                onClick={handleLoadMore}
                disabled={isLoading}
                className="
                  border-b border-[#1C1C1C]
                  pb-1
                  text-[14px]
                  text-[#1C1C1C]
                  hover:text-[green]
                  hover:text-[15px]
                  transition-colors
                "
              >
                {isLoading ? "Loading..." : "View more"}
              </button>
            </div>
          )}
        </section>
      </div>
    </section>
  );
}
