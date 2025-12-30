import { Search, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import ArticleCard from "./article-card";

import exercise1 from "./pic/cat1.jpg";
import exercise2 from "./pic/cat2.jpg";
import exercise3 from "./pic/cat3.jpg";
import exercise4 from "./pic/cat4.jpg";
import exercise5 from "./pic/cat5.jpg";
import exercise6 from "./pic/cat6.jpg";

export default function ArticleSection() {
  return (
    <section className="mt-14">
      <div className="px-4">
        <h2 className="mb-6 text-[18px] font-semibold text-[#1C1C1C]">
          Latest articles
        </h2>

        {/* ================= MOBILE ================= */}
        <div className="md:hidden -mx-4">
          <div className="rounded-[16px] bg-[#F3F1ED] p-4 space-y-3 mx-4">
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
            <button
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
              Highlight
            </button>
            <button
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
              Cardio
            </button>
            <button
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
              Strength
            </button>
            <button
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
              Yoga
            </button>
            <button
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
              Nutrition
            </button>
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
      </div>

      <div className="px-4 pb-24 mt-6">
        <div className="grid gap-8 md:grid-cols-2">
          <ArticleCard
            image={exercise1}
            title="Beginner's Guide to Cardio: Building Endurance One Step at a Time"
            description="Discover essential cardio exercises for beginners, from brisk walking to cycling, and learn how to build your endurance safely and effectively…"
          />
          <ArticleCard
            image={exercise2}
            title="Strength Training Fundamentals: Building Muscle the Right Way"
            description="Learn the basics of strength training, including proper form, essential exercises, and how to create a workout routine that fits your fitness goals…"
          />
          <ArticleCard
            image={exercise3}
            title="Yoga for Flexibility: Unlock Your Body's Full Potential"
            description="Explore how yoga can improve your flexibility, reduce muscle tension, and enhance your overall physical performance in just minutes a day…"
          />
          <ArticleCard
            image={exercise4}
            title="Fueling Your Workouts: Nutrition Essentials for Active Lifestyles"
            description="Discover the best foods to eat before and after workouts, understand macronutrients, and learn how proper nutrition can accelerate your fitness results…"
          />
          <ArticleCard
            image={exercise5}
            title="Staying Motivated: How to Maintain Your Fitness Journey Long-Term"
            description="Learn proven strategies to overcome workout plateaus, stay consistent with your exercise routine, and maintain motivation even when life gets busy…"
          />
          <ArticleCard
            image={exercise6}
            title="Home Workout Essentials: Effective Exercises You Can Do Anywhere"
            description="Build a complete home gym routine with no equipment needed. Discover bodyweight exercises that target all major muscle groups and keep you fit…"
          />
        </div>

        <button
          className="
            mt-12
            mx-auto
            block
            text-sm
            underline
            text-gray-600
            cursor-pointer
            hover:text-gray-900
            hover:scale-105
          "
        >
          View more
        </button>
      </div>
    </section>
  );
}
