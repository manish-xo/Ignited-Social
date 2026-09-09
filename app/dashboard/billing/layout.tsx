import { getDashboardData } from "../lib/get-dashboard-data";
import { DashboardDataProvider } from "../components/Layout/DashboardDataProvider";
import Sidebar from "../components/Layout/Sidebar";
import DashboardHeader from "../components/Layout/DashboardHeader";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const data = await getDashboardData();

  return (
    <DashboardDataProvider data={data}>
      <div className="flex min-h-screen bg-canvas">
        <Sidebar />
        <div className="flex-1 space-y-5 p-6">
          <DashboardHeader
            instagramUsername={data.instagramUsername}
            campaignStatus={data.campaignStatus}
            planName={data.planName}
          />

          {children}
        </div>
      </div>
    </DashboardDataProvider>
  );
};

export default DashboardLayout;
