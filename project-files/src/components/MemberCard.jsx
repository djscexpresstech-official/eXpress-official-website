import React, { useState, useEffect } from "react";

const EXTENSIONS = ["jpeg", "jpg", "png", "webp", "heic"];

const MemberCard = ({ name, position, image, linkedin }) => {
  const hasExtension = image ? /\.(jpeg|jpg|png|webp)$/i.test(image) : false;

  const [extIndex, setExtIndex] = useState(0);
  const [imgError, setImgError] = useState(false);
  const cacheBuster = "?v=2";

  useEffect(() => {
    setExtIndex(0);
    setImgError(false);
  }, [image]);

  const resolvedSrc = hasExtension
    ? `${image}${cacheBuster}`
    : image
      ? `${image}.${EXTENSIONS[extIndex]}${cacheBuster}`
      : null;

  const handleError = () => {
    if (!hasExtension && extIndex < EXTENSIONS.length - 1) {
      setExtIndex((i) => i + 1);
    } else {
      setImgError(true);
    }
  };

  // Accepts full URL (https://linkedin.com/in/user) or just handle/username
  const formattedLinkedin = linkedin
    ? linkedin.startsWith("http")
      ? linkedin
      : `https://www.linkedin.com/in/${linkedin}`
    : null;

  return (
    <div
      className="
        relative
        w-full
        max-w-[180px]
        sm:max-w-[210px]
        md:max-w-[240px]
        lg:max-w-[260px]
        xl:max-w-[280px]
        p-4
        sm:p-5
        md:p-6
        lg:p-7
        rounded-xl
        sm:rounded-2xl
        lg:rounded-3xl
        bg-gradient-to-br
        from-violet-950/40
        via-purple-950/30
        to-black/40
        backdrop-blur-xl
        backdrop-saturate-150
        border
        border-violet-500/15
        shadow-[0_8px_32px_rgba(31,8,68,0.37)]
        overflow-hidden
        flex
        flex-col
        items-center
        transition-all
        duration-300
        hover:from-violet-950/50
        hover:via-purple-950/40
        hover:to-black/50
        hover:-translate-y-2
        hover:border-violet-400/50
        hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]
      "
    >
      {/* Glass sheen overlay */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-gradient-to-br
          from-white/[0.08]
          via-white/[0.02]
          to-transparent
          rounded-xl
          sm:rounded-2xl
          lg:rounded-3xl
        "
      />

      {/* Member Image / Initials Fallback */}
      {resolvedSrc && !imgError ? (
        <img
          src={resolvedSrc}
          alt={typeof name === "string" ? name : "Member"}
          onError={handleError}
          className="
            relative
            z-10
            w-16 h-16
            sm:w-20 sm:h-20
            md:w-24 md:h-24
            lg:w-28 lg:h-28
            xl:w-32 xl:h-32
            rounded-full
            object-cover
            border-2
            md:border-4
            border-violet-400/70
            shadow-[0_4px_20px_rgba(168,85,247,0.35)]
          "
        />
      ) : (
        <div
          className="
            relative
            z-10
            mt-2
            w-16 h-16
            sm:w-20 sm:h-20
            md:w-24 md:h-24
            lg:w-28 lg:h-28
            xl:w-32 xl:h-32
            rounded-full
            bg-gradient-to-br
            from-violet-600/80
            to-purple-500/80
            backdrop-blur-md
            border
            border-white/20
            flex
            items-center
            justify-center
            text-base
            sm:text-lg
            md:text-xl
            lg:text-2xl
            font-bold
            text-white
          "
        >
          {typeof name === "string" && name ? name.charAt(0) : "?"}
        </div>
      )}

      {/* Name */}
      <h2
        className="
          relative
          z-10
          mt-3
          sm:mt-4
          font-serif
          text-lg
          sm:text-xl
          md:text-2xl
          font-bold
          text-center
          leading-tight
          text-white
        "
      >
        {name}
      </h2>

      {/* Position */}
      {position && (
        <p
          className="
            relative
            z-10
            font-mono
            uppercase
            tracking-tight
            text-purple-300
            mt-1
            text-xs
            sm:text-sm
            md:text-base
            text-center
          "
        >
          {position}
        </p>
      )}

      {/* LinkedIn Link Icon */}
      {formattedLinkedin && (
        <a
          href={formattedLinkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${typeof name === "string" ? name : "Member"}'s LinkedIn Profile`}
          className="
            relative
            z-10
            mt-3
            p-2
            rounded-full
            bg-white/5
            hover:bg-violet-500/20
            border
            border-white/10
            hover:border-violet-400/50
            text-purple-200
            hover:text-white
            transition-all
            duration-200
            hover:scale-110
          "
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5 fill-current"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.72a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26z" />
          </svg>
        </a>
      )}
    </div>
  );
};

export default MemberCard;