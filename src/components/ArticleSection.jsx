import { Search, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import blogPosts from "../data/blogPosts";
import BlogCard from "./BlogCard";

export default function ArticleSection() {
  return (
    <section className="mt-14">
      <div className="px-4">
        <h2 className="mb-6 text-[18px] font-semibold text-[#1C1C1C]">
          Latest articles
        </h2>

        {/* ================= MOBILE ================= */}
        <div className="md:hidden">
          <div className="rounded-[16px] bg-[#F3F1ED] p-4 space-y-3">
            {/* Search */}
            <div className="relative">
              <Input
                type="text"
                placeholder="Search"
                className="
                  h-12
                  rounded-[14px]
                  border-gray-200
                  bg-white
                  pl-4 pr-10
                  text-[14px]
                  outline-none
                "
              />
              <Search
                size={18}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>

            {/* Category */}
            <div>
              <p className="mb-1 px-1 text-[12px] text-[#8B8B8B]">
                Category
              </p>

              <div className="relative">
                <select
                  className="
                    w-full h-12
                    rounded-[14px]
                    border border-gray-200
                    bg-white
                    pl-4 pr-10
                    text-[14px]
                    appearance-none
                    outline-none
                  "
                >
                  <option>Highlight</option>
                  <option>Cat</option>
                  <option>Inspiration</option>
                  <option>General</option>
                </select>

                <ChevronDown
                  size={18}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ================= DESKTOP ================= */}
        <div
          className="
            hidden md:flex
            items-center justify-between
            rounded-[16px]
            bg-[#F3F1ED]
            px-4 py-3
          "
        >
          {/* Category tabs */}
          <div className="flex items-center gap-2">
            {["Highlight", "Cat", "Inspiration", "General"].map((item) => (
              <button
                key={item}
                className="
                  px-4 py-2
                  text-[14px]
                  text-[#6B6B6B]
                  cursor-pointer
                  rounded-[10px]
                  hover:bg-[yellow]
                  hover:text-[#1C1C1C]
                  hover:text-[15px]
                "
              >
                {item}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-[260px]">
            <Input
              type="text"
              placeholder="Search"
              className="
                h-10
                rounded-[10px]
                border-gray-200
                bg-white
                pl-4 pr-10
                text-[14px]
                outline-none
              "
            />
            <Search
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>

        {/* ================= ARTICLES LIST ================= */}
        <section className="mt-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <BlogCard
                key={post.id}
                image={post.image}
                category={post.category}
                title={post.title}
                description={post.description}
                author={post.author}
                date={post.date}
              />
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <button
              type="button"
              className="
                border-b border-[#1C1C1C]
                pb-1
                text-[14px]
                cursor-pointer
                text-gray-700
                hover:text-[green]
                transition-colors
              "
            >
              View more
            </button>
          </div>
        </section>
      </div>
    </section>
  );
}
