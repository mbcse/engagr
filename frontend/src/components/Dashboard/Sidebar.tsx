"use client";

import { LayoutDashboard, Users, FileText, Settings, BarChart, Layers } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type SidebarProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  setActiveContent: (content: string) => void;
  role: "admin" | "promoter";
};

const menuItems = {
  admin: [
    { name: "Dashboard", icon: LayoutDashboard, id: "dashboard" },
    { name: "Campaign", icon: BarChart, id: "campaign" },
    { name: "History", icon: FileText, id: "campaign_history" },
    { name: "Audience", icon: Users, id: "audience" },
    { name: "Flows", icon: Layers, id: "flows" },
    { name: "Settings", icon: Settings, id: "settings" },
  ],
  promoter: [
    { name: "Dashboard", icon: LayoutDashboard, id: "dashboard" },
    { name: "History", icon: FileText, id: "campaign_history" },
  ],
};

const Sidebar: React.FC<SidebarProps> = ({ open, setOpen, setActiveContent, role }) => {
  const items = menuItems[role];

  // State to track the active menu item
  const [activeItem, setActiveItem] = useState<string>("dashboard");

  const handleItemClick = (id: string) => {
    setActiveItem(id);
    setActiveContent(id);
  };

  return (
    <div
      className={`${
        open ? "w-64" : "w-20"
      } flex flex-col h-screen p-3 bg-slate-900 border-r border-gray-600 shadow duration-300`}
    >
      <div className="space-y-3">
        <div className={`flex items-center ${open && "justify-between"}`}>
          <Link href="/">
            <Image
              src="/light_engagr_transparent.png"
              alt="logo"
              width={100}
              height={100}
              className={`ml-0 ${!open && "hidden"}`}
            />
          </Link>
          <button onClick={() => setOpen(!open)} className="p-2">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {open ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
        <ul className="pt-2 pb-4 space-y-1 text-sm">
          {items.map((item) => (
            <li key={item.id} className="rounded-sm">
              <button
                onClick={() => handleItemClick(item.id)}
                aria-label={`Open ${item.name}`}
                className={`flex items-center p-2 space-x-3 rounded-md w-full text-left ${
                  activeItem === item.id
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
              >
                <item.icon className="w-6 h-6" />
                <span className={`${!open && "hidden"}`}>{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
