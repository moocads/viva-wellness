import { Sidebar } from "@/components/Sidebar";
import { PromotionsGrid } from "@/components/PromotionsGrid";

export default function PromotionPage() {
  return (
    <>
      <Sidebar />
      <div className="ml-64">
        <PromotionsGrid />
      </div>
    </>
  );
}

