"use client";
import React from "react";
import { ContainerScroll } from "../ui/container-scroll-animation";
import Image from "next/image";

export function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-white pb-6">
              Unleash the power of <br />
            </h1>
            <div className="flex justify-center items-center pb-8 w-full">
              <Image
                src="/light_engagr_transparent.png"
                alt="EngagR Logo"
                width={600}
                height={200}
              />
            </div>
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
