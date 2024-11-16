import DashboardLayout from "@/components/Dashboard/DashboardLayout";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout role="admin">{children}</DashboardLayout>;
}
