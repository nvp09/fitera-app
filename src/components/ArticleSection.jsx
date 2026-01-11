import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import blogPosts from "../data/blogPosts";
import BlogCard from "./BlogCard";

const categories = ["Highlight", "Cat", "Inspiration", "General"];

export default function ArticleSection() {
  const [category, setCategory] = useState("Highlight");

  const filteredPosts =
    category === "Highlight"
      ? blogPosts
      : blogPosts.filter(
          (post) => post.category === category
        );

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
                className="h-12 rounded-[14px] border-gray-200 bg-white pl-4 pr-10 text-[14px]"
              />
              <Search
                size={18}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>

            {/* Category (Mobile Select) */}
            <div>
              <p className="mb-1 px-1 text-[12px] text-[#8B8B8B]">
                Category
              </p>

              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger
                  className="
                    h-12 w-full rounded-[16px]
                    bg-white border border-[#E5E2DD]
                    px-4 text-[14px] text-[#1C1C1C]
                    cursor-pointer hover:text-[15px]
                    shadow-none focus:ring-0
                  "
                >
                  <SelectValue />
                </SelectTrigger>

                <SelectContent
                  className="
                    mt-2 rounded-[16px]
                    border border-[#E5E2DD]
                    bg-white p-2 shadow-lg
                  "
                >
                  {categories.map((item) => (
                    <SelectItem
                      key={item}
                      value={item}
                      className="
                        relative flex items-center
                        rounded-[12px]
                        pl-8 pr-4 py-3
                        text-[14px] text-[#1C1C1C]
                        cursor-pointer
                        focus:bg-[#F3F1ED]
                      "
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
        <div className="hidden md:flex items-center justify-between rounded-[16px] bg-[#F3F1ED] px-4 py-3">
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
                        ? "bg-[#DAD6D1] text-[#1C1C1C] cursor-default"
                        : "text-[#6B6B6B] hover:bg-[orange] hover:text-[#1C1C1C] cursor-pointer hover:text-[15px]"
                    }
                  `}
                >
                  {item}
                </button>
              );
            })}
          </div>

          {/* Search */}
          <div className="relative w-[260px]">
            <Input
              type="text"
              placeholder="Search"
              className="h-10 rounded-[10px] border-gray-200 bg-white pl-4 pr-10 text-[14px]"
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
            {filteredPosts.map((post) => (
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

          {/* ================= VIEW MORE ================= */}
          <div className="mt-16 mb-20 flex justify-center">
            <button
              type="button"
              className="
                border-b border-[#1C1C1C]
                pb-1
                text-[14px]
                text-[#1C1C1C]
                hover:text-[green]
                cursor-pointer
                hover:text-[15px]
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
