"use client";
import React from "react";
import { ContainerScroll } from "../ui/container-scroll-animation";

export function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-white pb-6">
              Unleash the power of <br />
              <span className="text-4xl md:text-[6rem] font-bold mb-1 leading-none">
                ADs Platform
              </span>
            </h1>
          </>
        }
      >
        <video
          src="/demo.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="mx-auto rounded-2xl object-cover h-full object-left-top scale-[1.7]"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}
