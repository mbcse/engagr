"use client";

import { InfiniteMovingCards } from "../ui/infinite-moving-cards.tsx";

export function Partners() {
  return (
    <div className="h-[20rem] rounded-md flex flex-col antialiaseddark:bg-grid-white/[0.05] items-center justify-center overflow-hidden">
      <p className="text-neutral-500 text-center text-xl font-medium mb-4">
        Trusted by big industries
      </p>
      <InfiniteMovingCards
        items={[
          { image: "https://skill-connect-job-board.vercel.app/delloite.svg" },
          { image: "https://skill-connect-job-board.vercel.app/accenture.svg" },
          { image: "https://skill-connect-job-board.vercel.app/microsoft.svg" },
          { image: "https://skill-connect-job-board.vercel.app/amazon.svg" },
          { image: "https://skill-connect-job-board.vercel.app/accenture.svg" },
          { image: "https://skill-connect-job-board.vercel.app/airbus.svg" },
          { image: "https://skill-connect-job-board.vercel.app/cisco.svg" },
          { image: "https://skill-connect-job-board.vercel.app/deisney.svg" },
        ]}
        direction="right"
        speed="fast"
        pauseOnHover={true}
        className="my-custom-class"
      />
    </div>
  );
}
