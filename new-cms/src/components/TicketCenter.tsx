"use client";

import * as Tabs from "@radix-ui/react-tabs";
import Link from "next/link";
import { NewTicketForm } from "./NewTicketForm";
import { MyTickets } from "./MyTickets";

export function TicketCenter() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Ticket Center</h1>
              <p className="text-sm text-gray-600 mt-1">
                Submit website updates, bug reports, or new feature requests. Provide complete details to speed up delivery.
              </p>
            </div>
            <Link
              href="/"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs.Root defaultValue="new-ticket" className="w-full">
          <Tabs.List className="flex gap-2 mb-6">
            <Tabs.Trigger
              value="new-ticket"
              className="px-6 py-4 text-base font-bold text-gray-700 rounded-lg border-2 border-transparent data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:border-blue-600 hover:bg-gray-100 hover:text-gray-900 transition-all"
            >
              New Ticket
            </Tabs.Trigger>
            <Tabs.Trigger
              value="my-tickets"
              className="px-6 py-4 text-base font-bold text-gray-700 rounded-lg border-2 border-transparent data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:border-blue-600 hover:bg-gray-100 hover:text-gray-900 transition-all"
            >
              My Tickets
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="new-ticket" className="mt-0">
            <NewTicketForm />
          </Tabs.Content>

          <Tabs.Content value="my-tickets" className="mt-0">
            <MyTickets />
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  );
}

