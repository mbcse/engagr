import React from "react";
import CreateAds from "../CreateAds";
import CampaignHistory from "../Campaigns/CampaignHistory";
import Dashboard from "../Promoter/Dashboard";
import MarketDashboard from "../Marketer/Dashboard";

type DynamicContentProps = {
  activeContent: string;
  role: "admin" | "promoter";
};

const DynamicContent: React.FC<DynamicContentProps> = ({ activeContent, role }) => {
  const renderAdminContent = () => {
    switch (activeContent) {
      case "dashboard":
        return <MarketDashboard />;
      case "campaign":
        return <CreateAds />;
      case "campaign_history":
        return <CampaignHistory />;
      case "settings":
        return (
          <div>
            <h1 className="text-2xl font-semibold mb-4">Settings</h1>
            <p>Admin-specific settings and preferences.</p>
          </div>
        );
      default:
        return <div>Select an admin option from the sidebar</div>;
    }
  };

  const renderPromoterContent = () => {
    switch (activeContent) {
      case "dashboard":
        return <Dashboard />;
      case "campaign_history":
        return <CampaignHistory />;
      case "settings":
        return (
          <div>
            <h1 className="text-2xl font-semibold mb-4">Settings</h1>
            <p>Configure your account settings.</p>
          </div>
        );
      default:
        return <div>Select an option from the sidebar</div>;
    }
  };

  // Determine which content to render based on the role
  return (
    <div className="">
      {role === "admin" ? renderAdminContent() : renderPromoterContent()}
    </div>
  );
};

export default DynamicContent;
