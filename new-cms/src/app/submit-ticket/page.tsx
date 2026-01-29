import { Sidebar } from "@/components/Sidebar";
import { TicketCenter } from "@/components/TicketCenter";

export default function SubmitTicket() {
  return (
    <>
      <Sidebar />
      <div className="ml-64">
        <TicketCenter />
      </div>
    </>
  );
}

