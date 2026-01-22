import { Link } from "react-router-dom";
import authorAvatar from "./pic/pic-for-assignment.jpg";
import { formatDate } from "../utils/dateUtils";

export default function BlogCard({
  id,
  image,
  category,
  title,
  description,
  author,
  date,
}) {
  return (
    <article className="w-full">
      <Link to={`/post/${id}`}>
        <img
          src={image}
          alt={title}
          className="h-48 w-full rounded-[20px] object-cover object-center"
          />
      </Link>

      <div className="mt-3">
        <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-[12px] text-green-700">
          {category}
        </span>

        <Link to={`/post/${id}`}>
          <h3 className="mt-2 text-[16px] font-semibold text-[#1C1C1C]">
            {title}
          </h3>
        </Link>

        <p className="mt-1 text-[14px] text-[#6B6B6B]">
          {description}
        </p>

        <div className="mt-3 flex items-center gap-2 text-[12px] text-[#8B8B8B]">
          <img
            src={authorAvatar}
            alt={author}
            className="h-6 w-6 rounded-full"
          />
          <span className="text-[#1C1C1C]">{author}</span>
          <span>|</span>
          <span>{formatDate(date)}</span>
        </div>
      </div>
    </article>
  );
}
