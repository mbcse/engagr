"use client";
import React from "react";
import { FloatingNav as ExternalFloatingNav } from "../ui/floating-navbar";

export function FloatingNav() {
  return (
    <div className="relative  w-full">
      <ExternalFloatingNav />
    </div>
  );
}
