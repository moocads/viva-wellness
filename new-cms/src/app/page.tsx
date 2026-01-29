import { Sidebar } from "@/components/Sidebar";
import { Dashboard } from "@/components/Dashboard";

export default function Home() {
  return (
    <>
      <Sidebar />
      <div className="ml-64">
        <Dashboard />
      </div>
    </>
  );
}
