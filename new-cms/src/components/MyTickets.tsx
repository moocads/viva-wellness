"use client";

import { useState, useMemo } from "react";
import * as Select from "@radix-ui/react-select";
import * as Dialog from "@radix-ui/react-dialog";
import { ChevronDown, Check, Search, Eye, Send, Clock } from "lucide-react";

// Types
type RequestType = "Content Update" | "Design Change" | "Bug/Issue" | "New Feature" | "SEO/Tracking" | "Other";
type Priority = "Low" | "Normal" | "High" | "Urgent";
type Status = "New" | "In Progress" | "Waiting on Client" | "Completed";

interface Ticket {
  id: string;
  ticketId: string;
  title: string;
  status: Status;
  priority: Priority;
  requestType: RequestType;
  pageUrl: string;
  specificSection: string;
  description: string;
  referenceLink: string;
  attachments: string[];
  requestedDeadline: string;
  approvalBeforePublishing: boolean;
  submittedBy: { name: string; email: string };
  createdAt: string;
  updatedAt: string;
  comments: Comment[];
}

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
}

// Mock data
const MOCK_TICKETS: Ticket[] = [
  {
    id: "1",
    ticketId: "TK-1024",
    title: "Update homepage hero banner image",
    status: "In Progress",
    priority: "High",
    requestType: "Content Update",
    pageUrl: "https://example.com",
    specificSection: "Hero banner",
    description: "Need to update the hero banner image with the new product launch image. The current image is outdated.",
    referenceLink: "https://example.com/reference",
    attachments: ["hero-banner.jpg"],
    requestedDeadline: "2024-02-15",
    approvalBeforePublishing: true,
    submittedBy: { name: "John Doe", email: "john.doe@example.com" },
    createdAt: "2024-01-10T10:00:00Z",
    updatedAt: "2024-01-12T14:30:00Z",
    comments: [
      {
        id: "c1",
        author: "Support Team",
        content: "We've started working on this. Expected completion: 2 days.",
        timestamp: "2024-01-11T09:00:00Z",
      },
    ],
  },
  {
    id: "2",
    ticketId: "TK-1023",
    title: "Fix mobile menu not displaying correctly",
    status: "New",
    priority: "Urgent",
    requestType: "Bug/Issue",
    pageUrl: "https://example.com/mobile",
    specificSection: "Navigation menu",
    description: "The mobile menu is not displaying correctly on iOS devices. It appears cut off and some items are not clickable.",
    referenceLink: "",
    attachments: ["screenshot1.png", "screenshot2.png"],
    requestedDeadline: "",
    approvalBeforePublishing: false,
    submittedBy: { name: "John Doe", email: "john.doe@example.com" },
    createdAt: "2024-01-13T08:00:00Z",
    updatedAt: "2024-01-13T08:00:00Z",
    comments: [],
  },
  {
    id: "3",
    ticketId: "TK-1022",
    title: "Add new pricing tier to pricing page",
    status: "Completed",
    priority: "Normal",
    requestType: "New Feature",
    pageUrl: "https://example.com/pricing",
    specificSection: "Pricing table",
    description: "We need to add a new 'Enterprise' pricing tier to the pricing page with custom pricing information.",
    referenceLink: "https://example.com/enterprise-info",
    attachments: [],
    requestedDeadline: "2024-01-20",
    approvalBeforePublishing: true,
    submittedBy: { name: "John Doe", email: "john.doe@example.com" },
    createdAt: "2024-01-05T12:00:00Z",
    updatedAt: "2024-01-10T16:00:00Z",
    comments: [
      {
        id: "c2",
        author: "Support Team",
        content: "This has been completed and is ready for review.",
        timestamp: "2024-01-10T16:00:00Z",
      },
    ],
  },
  {
    id: "4",
    ticketId: "TK-1021",
    title: "Update footer contact information",
    status: "Waiting on Client",
    priority: "Low",
    requestType: "Content Update",
    pageUrl: "https://example.com",
    specificSection: "Footer",
    description: "Please update the footer contact information with the new phone number and email address.",
    referenceLink: "",
    attachments: ["contact-info.pdf"],
    requestedDeadline: "",
    approvalBeforePublishing: false,
    submittedBy: { name: "John Doe", email: "john.doe@example.com" },
    createdAt: "2024-01-08T10:00:00Z",
    updatedAt: "2024-01-11T11:00:00Z",
    comments: [
      {
        id: "c3",
        author: "Support Team",
        content: "We need the new contact information to proceed. Please provide the updated details.",
        timestamp: "2024-01-11T11:00:00Z",
      },
    ],
  },
];

// Helper functions
function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "1 day ago";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return `${Math.floor(diffDays / 30)} months ago`;
}

function getStatusColor(status: Status): string {
  switch (status) {
    case "New":
      return "bg-blue-100 text-blue-800";
    case "In Progress":
      return "bg-yellow-100 text-yellow-800";
    case "Waiting on Client":
      return "bg-orange-100 text-orange-800";
    case "Completed":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

function getPriorityColor(priority: Priority): string {
  switch (priority) {
    case "Urgent":
      return "bg-red-100 text-red-800";
    case "High":
      return "bg-orange-100 text-orange-800";
    case "Normal":
      return "bg-blue-100 text-blue-800";
    case "Low":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

function CustomSelect({
  value,
  onValueChange,
  options,
  placeholder,
}: {
  value: string;
  onValueChange: (value: string) => void;
  options: string[];
  placeholder: string;
}) {
  return (
    <Select.Root value={value} onValueChange={onValueChange}>
      <Select.Trigger className="inline-flex h-10 items-center justify-between rounded-md border border-gray-300 px-3 py-2 text-sm bg-white w-full focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring-2">
        <Select.Value placeholder={placeholder} />
        <Select.Icon>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="overflow-hidden bg-white rounded-md shadow-lg border border-gray-200 z-50">
          <Select.Viewport className="p-1">
            {options.map((option) => (
              <Select.Item
                key={option}
                value={option}
                className="relative flex items-center px-3 py-2 text-sm rounded-sm cursor-pointer focus:bg-blue-50 focus:outline-none data-[highlighted]:bg-blue-50"
              >
                <Select.ItemText>{option}</Select.ItemText>
                <Select.ItemIndicator className="absolute right-2">
                  <Check className="w-4 h-4 text-blue-600" />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}

// Ticket Details Dialog
function TicketDetailsDialog({
  ticket,
  open,
  onOpenChange,
}: {
  ticket: Ticket | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<Comment[]>(ticket?.comments || []);

  const handleAddComment = () => {
    if (!comment.trim() || !ticket) return;
    
    const newComment: Comment = {
      id: `c${Date.now()}`,
      author: "You",
      content: comment,
      timestamp: new Date().toISOString(),
    };
    
    setComments([...comments, newComment]);
    setComment("");
  };

  if (!ticket) return null;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto z-50 p-6">
          <Dialog.Title className="text-2xl font-bold text-gray-900 mb-4">
            {ticket.title}
          </Dialog.Title>

          <div className="space-y-6">
            {/* Submitted By */}
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Submitted By</h3>
              <p className="text-gray-900">{ticket.submittedBy.name}</p>
              <p className="text-sm text-gray-600">{ticket.submittedBy.email}</p>
            </div>

            {/* Basic Info */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Basic Info</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Ticket ID</p>
                  <p className="text-gray-900 font-medium">{ticket.ticketId}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Request Type</p>
                  <p className="text-gray-900">{ticket.requestType}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Priority</p>
                  <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                    {ticket.priority}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Status</p>
                  <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getStatusColor(ticket.status)}`}>
                    {ticket.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Where to Change */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Where to Change</h3>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Page URL</p>
                  <a
                    href={ticket.pageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline break-all"
                  >
                    {ticket.pageUrl}
                  </a>
                </div>
                {ticket.specificSection && (
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Specific Section</p>
                    <p className="text-gray-900">{ticket.specificSection}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Details */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Details</h3>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Description</p>
                  <p className="text-gray-900 whitespace-pre-wrap">{ticket.description}</p>
                </div>
                {ticket.referenceLink && (
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Reference Link</p>
                    <a
                      href={ticket.referenceLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline break-all"
                    >
                      {ticket.referenceLink}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Attachments */}
            {ticket.attachments.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Attachments</h3>
                <ul className="space-y-1">
                  {ticket.attachments.map((att, idx) => (
                    <li key={idx} className="text-gray-900">
                      {att}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Timeline / Comments */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Timeline / Comments</h3>
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="border-l-2 border-gray-200 pl-4">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-medium text-gray-900">{comment.author}</p>
                      <p className="text-xs text-gray-500">{formatRelativeTime(comment.timestamp)}</p>
                    </div>
                    <p className="text-sm text-gray-700">{comment.content}</p>
                  </div>
                ))}
              </div>

              {/* Add Comment */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add a comment..."
                  rows={3}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring-2 resize-y"
                />
                <div className="flex items-center justify-between mt-2">
                  <button
                    type="button"
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Upload file
                  </button>
                  <button
                    type="button"
                    onClick={handleAddComment}
                    disabled={!comment.trim()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6 pt-6 border-t border-gray-200">
            <Dialog.Close asChild>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors">
                Close
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

// Main component
export function MyTickets() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Latest updated");
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredTickets = useMemo(() => {
    let filtered = [...MOCK_TICKETS];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (ticket) =>
          ticket.title.toLowerCase().includes(query) ||
          ticket.ticketId.toLowerCase().includes(query)
      );
    }

    // Status filter
    if (statusFilter !== "All") {
      if (statusFilter === "Open") {
        filtered = filtered.filter(
          (ticket) =>
            ticket.status === "New" ||
            ticket.status === "In Progress" ||
            ticket.status === "Waiting on Client"
        );
      } else {
        filtered = filtered.filter((ticket) => ticket.status === statusFilter);
      }
    }

    // Type filter
    if (typeFilter !== "All") {
      filtered = filtered.filter((ticket) => ticket.requestType === typeFilter);
    }

    // Sort
    filtered.sort((a, b) => {
      const dateA = new Date(a.updatedAt).getTime();
      const dateB = new Date(b.updatedAt).getTime();
      return sortBy === "Latest updated" ? dateB - dateA : dateA - dateB;
    });

    return filtered;
  }, [searchQuery, statusFilter, typeFilter, sortBy]);

  const handleViewDetails = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring-2"
            />
          </div>

          {/* Status Filter */}
          <CustomSelect
            value={statusFilter}
            onValueChange={setStatusFilter}
            options={["All", "Open", "New", "In Progress", "Waiting on Client", "Completed"]}
            placeholder="Status"
          />

          {/* Type Filter */}
          <CustomSelect
            value={typeFilter}
            onValueChange={setTypeFilter}
            options={[
              "All",
              "Content Update",
              "Design Change",
              "Bug/Issue",
              "New Feature",
              "SEO/Tracking",
              "Other",
            ]}
            placeholder="Type"
          />

          {/* Sort */}
          <CustomSelect
            value={sortBy}
            onValueChange={setSortBy}
            options={["Latest updated", "Oldest updated"]}
            placeholder="Sort by"
          />
        </div>
      </div>

      {/* Tickets List */}
      {filteredTickets.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <p className="text-gray-600 mb-4">No tickets found matching your filters.</p>
          <button
            onClick={() => {
              setSearchQuery("");
              setStatusFilter("All");
              setTypeFilter("All");
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredTickets.map((ticket) => (
            <div
              key={ticket.id}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-semibold text-gray-900">{ticket.ticketId}</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(ticket.status)}`}>
                      {ticket.status}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                      {ticket.priority}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{ticket.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>{ticket.requestType}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {formatRelativeTime(ticket.updatedAt)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleViewDetails(ticket)}
                  className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  View details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Ticket Details Dialog */}
      <TicketDetailsDialog
        ticket={selectedTicket}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
}

