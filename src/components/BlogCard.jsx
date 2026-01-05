import authorAvatar from "./pic/pic-for-assignment.jpg";

export default function BlogCard({
  image,
  category,
  title,
  description,
  author,
  date,
}) {
  return (
    <article className="w-full">
      <img
        src={image}
        alt={title}
        className="h-48 w-full rounded-[20px] object-cover"
      />

      <div className="mt-3">
        <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-[12px] text-green-700">
          {category}
        </span>

        <h3 className="mt-2 text-[16px] font-semibold leading-snug text-[#1C1C1C]">
          {title}
        </h3>

        <p className="mt-1 text-[14px] leading-relaxed text-[#6B6B6B]">
          {description}
        </p>

        <section className="mt-3 flex items-center gap-2 text-[12px] text-[#8B8B8B]">
          <img
            src={authorAvatar}
            alt={`Profile of ${author}`}
            className="h-6 w-6 rounded-full object-cover"
          />
          <span className="text-[#1C1C1C]">{author}</span>
          <span>|</span>
          <span>{date}</span>
        </section>
      </div>
    </article>
  );
}
