import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-center">
      <div className="mb-6 text-4xl"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-alert-icon lucide-circle-alert"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg></div>

      <h1 className="text-2xl font-bold mb-2">
        Page Not Found
      </h1>

     

      <Link
        to="/"
        className="rounded-full bg-black px-6 py-3 text-white"
      >
        Go To Homepage
      </Link>
    </main>
  );
}
