import { copyToClipboard, getShareUrls } from "../utils/shareUtils";
import { toast } from "sonner";

/* Like and Share Bar Component */
export default function LikeShareBar({
  likeCount,
  liked,
  onLike,
  shareUrl,
  isLoggedIn,
}) {
  const shareUrls = getShareUrls(shareUrl);

  const handleCopy = async () => {
    await copyToClipboard(shareUrl);

    toast.custom((t) => (
      <div className="relative w-[360px] rounded-xl border border-green-200 bg-green-50 px-4 py-3 shadow-lg">
        <button
          onClick={() => toast.dismiss(t)}
          className="absolute right-2 top-2 text-sm text-green-700"
        >
          ✕
        </button>
        <p className="font-semibold text-green-800">Copied!</p>
        <p className="text-sm text-green-700">
          This article has been copied to your clipboard.
        </p>
      </div>
    ));
  };

  return (
    <div className="mt-12 rounded-[20px] bg-[#F3F1ED] px-6 py-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Like Button */}
        <button
          onClick={onLike}
          disabled={!isLoggedIn}
          className="flex items-center justify-center gap-2 w-full md:w-auto rounded-full bg-white px-4 py-2 text-sm border disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-thumbs-up-icon lucide-thumbs-up"
          >
            <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
            <path d="M7 10v12" />
          </svg>
          {likeCount}
        </button>

        {/* Share Buttons */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm border"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-copy-icon lucide-copy"
            >
              <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
            </svg>
            Copy link
          </button>

          <a
            href={shareUrls.facebook}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border bg-white px-4 py-2 text-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-facebook-icon lucide-facebook"
            >
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>

          <a
            href={shareUrls.linkedin}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border bg-white px-4 py-2 text-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-linkedin-icon lucide-linkedin"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect width="4" height="12" x="2" y="9" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>

          <a
            href={shareUrls.twitter}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border bg-white px-4 py-2 text-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-twitter-icon lucide-twitter"
            >
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

