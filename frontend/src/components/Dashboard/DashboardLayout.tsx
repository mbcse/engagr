"use client";

import React, { type ReactNode, useState } from "react";
import Sidebar from "./Sidebar";
import DynamicContent from "./DynamicContent";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";

type DashboardLayoutProps = {
  role: "admin" | "promoter";
  children: ReactNode;
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ role, children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeContent, setActiveContent] = useState("dashboard");

  return (
    <div className="flex h-screen ">
      {/* Sidebar */}
      <Sidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        setActiveContent={setActiveContent}
        role={role}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-900">
          <DynamicContent activeContent={activeContent} role={role} />

          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
