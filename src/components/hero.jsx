import heroImg from "./pic/pic-for-assignment.jpg";

export default function MobileHero() {
  return (
    <section className="px-4 pt-6 md:pt-12">
      <div className="md:grid md:grid-cols-3 md:gap-8 md:items-center">
        
        {/* LEFT : Headline */}
        <div className="md:text-left text-center">
          <h1 className="text-[28px] md:text-[36px] font-semibold leading-[1.2] text-[#1C1C1C]">
            Stay Informed,
            <br />
            Stay Inspired
          </h1>

          <p className="mt-4 text-[14px] leading-relaxed text-[#6B6B6B] max-w-sm mx-auto md:max-w-none md:mx-0">
            Discover a World of Knowledge at Your Fingertips. Your Daily Dose of
            Inspiration and Information.
          </p>
        </div>

        {/* CENTER : Image */}
        <div className="mt-6 md:mt-0">
          <img
            src={heroImg}
            alt="Hero"
            className="w-full h-[300px] object-cover rounded-[20px]"
          />
        </div>

        {/* RIGHT : Author */}
        <div className="mt-6 md:mt-0">
          <p className="text-[12px] text-[#8B8B8B]">Author</p>
          <p className="mt-1 font-medium text-[#1C1C1C]">Thompson P.</p>

          <p className="mt-3 text-[14px] leading-relaxed text-[#6B6B6B]">
            I am a pet enthusiast and freelance writer who specializes in animal
            behavior and care.
          </p>

          <p className="mt-3 text-[14px] leading-relaxed text-[#6B6B6B]">
            When I'm not writing, I spend time volunteering at my local animal
            shelter, helping cats find loving homes.
          </p>
        </div>

      </div>
    </section>
  );
}
