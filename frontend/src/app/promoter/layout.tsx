import DashboardLayout from "@/components/Dashboard/DashboardLayout";

export default function PromoterLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout role="promoter">{children}</DashboardLayout>;
}
