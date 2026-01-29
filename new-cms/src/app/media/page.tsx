import { Sidebar } from "@/components/Sidebar";
import { MediaLibrary } from "@/components/MediaLibrary";

export default function MediaPage() {
  return (
    <>
      <Sidebar />
      <div className="ml-64">
        <MediaLibrary />
      </div>
    </>
  );
}

