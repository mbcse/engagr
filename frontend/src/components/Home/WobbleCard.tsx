"use client";

import React from "react";
import { WobbleCard } from "../ui/wobble-card";
import Link from "next/link";

export function WobbleCardDemo() {
  const year = new Date().getFullYear();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full p-8 lg:p-0 ">
      <WobbleCard containerClassName="col-span-1 lg:col-span-3  ">
        <div className="w-[90%] m-auto flex justify-between items-center">
          <div className="flex justify-between w-full ">
           <div>
           <h2 className="text-white text-xl text-center md:text-left md:text-3xl font-bold mx-auto md:mx-0 max-w-xl">
              Get started today with <span className="text-slate-900">EngagR</span> to kickstart your marketing efforts
            </h2>
            <p className="max-w-md mt-8 text-center md:text-left text-sm md:text-base mx-auto md:mx-0 text-neutral-400">
            <span className="text-slate-900">EngagR</span> houses the best-in-class software tools to kickstart your marketing journey.
              Join 127,000+ other users to get started.
            </p>
           </div>
          <div>
          <div className="flex flex-col items-center mt-10 mb-10 md:items-start">
              <div className="flex flex-col sm:flex-row mb-2 lg:justify-start justify-start items-center">
                {/* Profile Images */}
                {[
                  {
                    alt: "John Doe",
                    src: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
                  },
                  {
                    alt: "Robert Johnson",
                    src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
                  },
                  {
                    alt: "Jane Smith",
                    src: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
                  },
                  {
                    alt: "Emily Davis",
                    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
                  },
                  {
                    alt: "Tyler Durden",
                    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
                  },
                  {
                    alt: "Dora",
                    src: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e",
                  },
                ].map((profile, index) => (
                  <div key={index} className="-mr-4 relative group">
                    <div className="animation-container" style={{ opacity: 1, transform: "none" }}>
                      <div
                        className="rounded-2xl overflow-hidden border-2 border-neutral-200 relative"
                        style={{
                          opacity: 1,
                          transform: `scale(1) rotate(${(Math.random() * 10 - 5).toFixed(2)}deg)`,
                        }}
                      >
                        <img
                          alt={profile.alt}
                          loading="lazy"
                          width="100"
                          height="100"
                          decoding="async"
                          className="object-cover object-top h-14 w-14"
                          style={{ color: "transparent" }}
                          src={`${profile.src}?auto=format&fit=crop&w=256&q=75`}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Rating Stars */}
              <div className="flex justify-center ml-6">
                {Array.from({ length: 5 }).map((_, index) => (
                  <svg
                    key={index}
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 16 16"
                    className="h-4 w-4 text-yellow-400 mx-1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                  </svg>
                ))}
              </div>
              <p className="text-neutral-400 text-sm ml-8 relative z-40 lg:text-left text-center">
                Trusted by 27,000+ creators
              </p>
            </div>

            <button className="group hover:-translate-y-0.5 active:scale-[0.98] bg-secondary relative z-10 hover:bg-secondary/90 border border-secondary text-black text-sm md:text-sm transition font-medium duration-200 rounded-md px-4 py-2 justify-center shadow-[0px_-1px_0px_0px_#FFFFFF60_inset,_0px_1px_0px_0px_#FFFFFF60_inset] flex space-x-2 items-center w-52">
              <span className="text-white">Try Now!</span>
              <svg
                stroke="white"
                fill="white"
                strokeWidth="0"
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="text-black group-hover:translate-x-1 stroke-[1px] h-3 w-3 mt-0.5 transition-transform duration-200"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          </div>
          <div className="w-2/5 hidden">
            <footer className=" text-sm w-full">
              <div className="w-[90%] mx-auto flex flex-col">
                <div className="">
                  <h3 className="lg:text-5xl font-bold md:text-3xl text-3xl text-white ">
                    Let&apos;s Stay In
                  </h3>
                  <h3 className="flex items-center text-[#1AC2DD] gap-3 lg:text-7xl md:text-5xl text-5xl">
                    <span>Touch</span>
                  </h3>
                </div>
                <div className="text-gray-200 pt-12">
                  <h3 className=" text-2xl">Social</h3>
                  <div className="grid grid-flow-col gap-4 pt-4">
                    <a>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        className="fill-current"
                      >
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                      </svg>
                    </a>
                    <a>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        className="fill-current"
                      >
                        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                      </svg>
                    </a>
                    <a>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        className="fill-current"
                      >
                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </div>
        <div className="w-[90%] m-auto bg-gray-800 h-px relative top-16" />

        <div className="w-[90%] m-auto py-5 flex flex-col md:flex-row lg:flex-row justify-between items-center text-white font-medium relative top-16">
          <p>© ETH Bangkok {year} - EngagR. All Rights Reserved.</p>
          <p>
            Made with ❤️ by{" "}
            <Link
              href="https://www.linkedin.com/in/codersadhu/"
              className="text-indigo-50 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Codersadhu
            </Link>
          </p>
        </div>
      </WobbleCard>
    </div>
  );
}
