import heroImg from "./pic/pic-for-assignment.jpg";

export default function ArticleCard({ image, title, description }) {
  return (
    <article className="w-full">
      {/* Article image */}
      <img
        src={image}
        alt={title}
        className="h-48 w-full rounded-[20px] object-cover"
      />

      <div className="mt-3">
        {/* Category tag */}
        <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-[12px] text-green-700">
          Cat
        </span>

        {/* Title */}
        <h3 className="mt-2 text-[16px] font-semibold leading-snug text-[#1C1C1C]">
          {title}
        </h3>

        {/* Description */}
        <p className="mt-1 text-[14px] leading-relaxed text-[#6B6B6B]">
          {description}
        </p>

        {/* Author */}
        <div className="mt-3 flex items-center gap-2 text-[12px] text-[#8B8B8B]">
          <img
            src={heroImg}
            alt="author"
            className="w-5 h-5 rounded-full object-cover"
          />
          <span className="text-[#1C1C1C]">Thompson P.</span>
          <span> | </span>
          <span>14 September 2024</span>
        </div>
      </div>
    </article>
  );
}
