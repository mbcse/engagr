"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardInterContainer, CardItem } from "../ui/3d-card";
import Link from "next/link";

export interface CardProps {
  imageSrc: string;
  profileSrc: string;
  title: string;
  subtitle: string;
  linkUrl?: string;
}

export function Card({
  imageSrc,
  profileSrc,
  title,
  subtitle,
  linkUrl,
}: CardProps) {
  return (
    <CardInterContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-[#020617] w-[20rem] h-auto rounded-xl p-4">
        <CardItem translateZ="70" className="w-full">
          <Image
            src={imageSrc}
            height={1000}
            width={1000}
            className="h-40 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <div className="flex justify-between items-center mt-4">
          <CardItem
            translateZ={70}
            as={linkUrl ? Link : 'div'}
            href={linkUrl || "#"}
            target={linkUrl ? "__blank" : undefined}
            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white flex"
          >
            <Image
              src={profileSrc}
              height={40}
              width={40}
              className="rounded-full"
              alt="profile"
            />
            <div className="pl-4">
              <p className="font-bold text-base">{title}</p>
              <p className="font-medium text-xs">{subtitle}</p>
            </div>
          </CardItem>
        </div>
      </CardBody>
    </CardInterContainer>
  );
}
