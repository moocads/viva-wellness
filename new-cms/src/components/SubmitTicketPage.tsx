"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import * as Select from "@radix-ui/react-select";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as Accordion from "@radix-ui/react-accordion";
import * as Label from "@radix-ui/react-label";
import { ChevronDown, Check, X, AlertTriangle, CheckCircle2 } from "lucide-react";
import Link from "next/link";

// Types
type RequestType = "Content Update" | "Design Change" | "Bug/Issue" | "New Feature" | "SEO/Tracking" | "Other";
type Priority = "Low" | "Normal" | "High" | "Urgent";

interface FileAttachment {
  id: string;
  file: File;
  name: string;
  size: number;
}

interface FormState {
  ticketTitle: string;
  requestType: RequestType | "";
  priority: Priority | "";
  pageUrl: string;
  specificSection: string;
  description: string;
  referenceLink: string;
  attachments: FileAttachment[];
  requestedDeadline: string;
  approvalBeforePublishing: boolean;
  confirmAccurate: boolean;
  confirmUrgent: boolean;
}

interface FormErrors {
  ticketTitle?: string;
  requestType?: string;
  priority?: string;
  pageUrl?: string;
  description?: string;
  referenceLink?: string;
  attachments?: string;
  confirmAccurate?: string;
  confirmUrgent?: string;
}

// Mock current user
const CURRENT_USER = {
  name: "John Doe",
  email: "john.doe@example.com",
};

// Constants
const STORAGE_KEY = "ticket_draft";
const AUTOSAVE_DELAY = 1500; // 1.5 seconds
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_FILE_TYPES = ["image/png", "image/jpeg", "application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

// Validation functions
function validateUrl(url: string): boolean {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

function validateForm(state: FormState): FormErrors {
  const errors: FormErrors = {};

  if (!state.ticketTitle.trim()) {
    errors.ticketTitle = "Ticket title is required";
  } else if (state.ticketTitle.length > 80) {
    errors.ticketTitle = "Ticket title must be 80 characters or less";
  }

  if (!state.requestType) {
    errors.requestType = "Request type is required";
  }

  if (!state.priority) {
    errors.priority = "Priority is required";
  }

  if (!state.pageUrl.trim()) {
    errors.pageUrl = "Page URL is required";
  } else if (!validateUrl(state.pageUrl)) {
    errors.pageUrl = "Please enter a valid URL";
  }

  if (!state.description.trim()) {
    errors.description = "Description is required";
  } else if (state.description.trim().length < 30) {
    errors.description = "Description must be at least 30 characters";
  }

  if (state.referenceLink.trim() && !validateUrl(state.referenceLink)) {
    errors.referenceLink = "Please enter a valid URL";
  }

  if (state.attachments.length > 5) {
    errors.attachments = "Maximum 5 files allowed";
  }

  if (!state.confirmAccurate) {
    errors.confirmAccurate = "Please confirm the information is accurate";
  }

  if (state.priority === "Urgent" && !state.confirmUrgent) {
    errors.confirmUrgent = "Please confirm you understand urgent requests may affect other timelines";
  }

  return errors;
}

function isFormValid(state: FormState, errors: FormErrors): boolean {
  return Object.keys(errors).length === 0 && 
         state.ticketTitle.trim() !== "" &&
         state.requestType !== "" &&
         state.priority !== "" &&
         state.pageUrl.trim() !== "" &&
         validateUrl(state.pageUrl) &&
         state.description.trim().length >= 30 &&
         (state.referenceLink.trim() === "" || validateUrl(state.referenceLink)) &&
         state.attachments.length <= 5 &&
         state.confirmAccurate &&
         (state.priority !== "Urgent" || state.confirmUrgent);
}

// Debounce helper
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Helper components
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xl font-semibold text-gray-900 mb-4">{children}</h2>
  );
}

function Field({
  label,
  error,
  required,
  children,
  id,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  id: string;
}) {
  return (
    <div className="space-y-2">
      <Label.Root htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label.Root>
      {children}
      {error && (
        <p className="text-sm text-red-600 flex items-center gap-1">
          <AlertTriangle className="w-4 h-4" />
          {error}
        </p>
      )}
    </div>
  );
}

// Select component wrapper
function CustomSelect({
  value,
  onValueChange,
  options,
  placeholder,
  id,
  error,
}: {
  value: string;
  onValueChange: (value: string) => void;
  options: string[];
  placeholder: string;
  id: string;
  error?: string;
}) {
  return (
    <Select.Root value={value} onValueChange={onValueChange}>
      <Select.Trigger
        id={id}
        className={`inline-flex h-10 items-center justify-between rounded-md border px-3 py-2 text-sm bg-white w-full ${
          error
            ? "border-red-300 focus:border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        } focus:outline-none focus:ring-2`}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      >
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

// Main component
export function SubmitTicketPage() {
  const [formState, setFormState] = useState<FormState>({
    ticketTitle: "",
    requestType: "",
    priority: "",
    pageUrl: "",
    specificSection: "",
    description: "",
    referenceLink: "",
    attachments: [],
    requestedDeadline: "",
    approvalBeforePublishing: false,
    confirmAccurate: false,
    confirmUrgent: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const debouncedState = useDebounce(formState, AUTOSAVE_DELAY);

  // Load draft from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const draft = JSON.parse(saved);
        // Restore form state (except files which can't be serialized)
        setFormState((prev) => ({
          ...prev,
          ...draft,
          attachments: [], // Files can't be restored from localStorage
        }));
      } catch (e) {
        console.error("Failed to load draft:", e);
      }
    }
  }, []);

  // Autosave to localStorage
  useEffect(() => {
    if (debouncedState.ticketTitle || debouncedState.description) {
      const draft = {
        ...debouncedState,
        attachments: [], // Don't save files to localStorage
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    }
  }, [debouncedState]);

  const updateField = useCallback((field: keyof FormState, value: any) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field as keyof FormErrors];
        return newErrors;
      });
    }
  }, [errors]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newAttachments: FileAttachment[] = [];
    const newErrors: FormErrors = { ...errors };

    files.forEach((file) => {
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        newErrors.attachments = `Invalid file type. Allowed: PNG, JPG, PDF, DOC, DOCX`;
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        newErrors.attachments = `File ${file.name} exceeds 10MB limit`;
        return;
      }
      if (formState.attachments.length + newAttachments.length >= 5) {
        newErrors.attachments = "Maximum 5 files allowed";
        return;
      }

      newAttachments.push({
        id: `${Date.now()}-${Math.random()}`,
        file,
        name: file.name,
        size: file.size,
      });
    });

    setErrors(newErrors);
    setFormState((prev) => ({
      ...prev,
      attachments: [...prev.attachments, ...newAttachments],
    }));

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeAttachment = (id: string) => {
    setFormState((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((a) => a.id !== id),
    }));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm(formState);
    setErrors(newErrors);

    if (!isFormValid(formState, newErrors)) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Clear localStorage
    localStorage.removeItem(STORAGE_KEY);

    // Reset form (except user info is read-only, so no need to reset)
    setFormState({
      ticketTitle: "",
      requestType: "",
      priority: "",
      pageUrl: "",
      specificSection: "",
      description: "",
      referenceLink: "",
      attachments: [],
      requestedDeadline: "",
      approvalBeforePublishing: false,
      confirmAccurate: false,
      confirmUrgent: false,
    });

    setErrors({});
    setIsSubmitting(false);
    setShowSuccess(true);

    // Hide success message after 5 seconds
    setTimeout(() => setShowSuccess(false), 5000);
  };

  const handleSaveDraft = () => {
    const draft = {
      ...formState,
      attachments: [],
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const formValid = isFormValid(formState, errors);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Submit a Ticket</h1>
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

      {/* Success Banner */}
      {showSuccess && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <p className="text-sm text-green-800">
              {isSubmitting ? "Ticket submitted successfully!" : "Draft saved successfully!"}
            </p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Info */}
              <section className="bg-white rounded-lg border border-gray-200 p-6">
                <SectionTitle>Basic Info</SectionTitle>
                <div className="space-y-6">
                  <Field
                    label="Ticket Title"
                    id="ticketTitle"
                    required
                    error={errors.ticketTitle}
                  >
                    <input
                      type="text"
                      id="ticketTitle"
                      value={formState.ticketTitle}
                      onChange={(e) => updateField("ticketTitle", e.target.value)}
                      maxLength={80}
                      className={`w-full rounded-md border px-3 py-2 text-sm ${
                        errors.ticketTitle
                          ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      } focus:outline-none focus:ring-2`}
                      aria-invalid={!!errors.ticketTitle}
                      aria-describedby={errors.ticketTitle ? "ticketTitle-error" : undefined}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {formState.ticketTitle.length}/80 characters
                    </p>
                  </Field>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Field
                      label="Request Type"
                      id="requestType"
                      required
                      error={errors.requestType}
                    >
                      <CustomSelect
                        id="requestType"
                        value={formState.requestType}
                        onValueChange={(value) => updateField("requestType", value as RequestType)}
                        options={["Content Update", "Design Change", "Bug/Issue", "New Feature", "SEO/Tracking", "Other"]}
                        placeholder="Select request type"
                        error={errors.requestType}
                      />
                    </Field>

                    <Field
                      label="Priority"
                      id="priority"
                      required
                      error={errors.priority}
                    >
                      <CustomSelect
                        id="priority"
                        value={formState.priority}
                        onValueChange={(value) => updateField("priority", value as Priority)}
                        options={["Low", "Normal", "High", "Urgent"]}
                        placeholder="Select priority"
                        error={errors.priority}
                      />
                    </Field>
                  </div>
                </div>
              </section>

              {/* Where to change */}
              <section className="bg-white rounded-lg border border-gray-200 p-6">
                <SectionTitle>Where to Change</SectionTitle>
                <div className="space-y-6">
                  <Field
                    label="Page URL"
                    id="pageUrl"
                    required
                    error={errors.pageUrl}
                  >
                    <input
                      type="url"
                      id="pageUrl"
                      value={formState.pageUrl}
                      onChange={(e) => updateField("pageUrl", e.target.value)}
                      placeholder="https://example.com/page"
                      className={`w-full rounded-md border px-3 py-2 text-sm ${
                        errors.pageUrl
                          ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      } focus:outline-none focus:ring-2`}
                      aria-invalid={!!errors.pageUrl}
                    />
                  </Field>

                  <Field
                    label="Specific Section / Block"
                    id="specificSection"
                  >
                    <input
                      type="text"
                      id="specificSection"
                      value={formState.specificSection}
                      onChange={(e) => updateField("specificSection", e.target.value)}
                      placeholder="e.g., Hero banner, Footer, Pricing table"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring-2"
                    />
                  </Field>
                </div>
              </section>

              {/* Details */}
              <section className="bg-white rounded-lg border border-gray-200 p-6">
                <SectionTitle>Details</SectionTitle>
                <div className="space-y-6">
                  <Field
                    label="Description"
                    id="description"
                    required
                    error={errors.description}
                  >
                    <textarea
                      id="description"
                      value={formState.description}
                      onChange={(e) => updateField("description", e.target.value)}
                      rows={6}
                      minLength={30}
                      className={`w-full rounded-md border px-3 py-2 text-sm resize-y ${
                        errors.description
                          ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      } focus:outline-none focus:ring-2`}
                      aria-invalid={!!errors.description}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {formState.description.length} characters (minimum 30)
                    </p>
                  </Field>

                  <Field
                    label="Reference / Example Link"
                    id="referenceLink"
                    error={errors.referenceLink}
                  >
                    <input
                      type="url"
                      id="referenceLink"
                      value={formState.referenceLink}
                      onChange={(e) => updateField("referenceLink", e.target.value)}
                      placeholder="https://example.com/reference"
                      className={`w-full rounded-md border px-3 py-2 text-sm ${
                        errors.referenceLink
                          ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      } focus:outline-none focus:ring-2`}
                      aria-invalid={!!errors.referenceLink}
                    />
                  </Field>
                </div>
              </section>

              {/* Attachments */}
              <section className="bg-white rounded-lg border border-gray-200 p-6">
                <SectionTitle>Attachments</SectionTitle>
                <div className="space-y-4">
                  <Field
                    label="Upload Files"
                    id="attachments"
                    error={errors.attachments}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      id="attachments"
                      multiple
                      accept=".png,.jpg,.jpeg,.pdf,.doc,.docx"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full border-2 border-dashed border-gray-300 rounded-lg px-4 py-6 text-sm text-gray-600 hover:border-blue-500 hover:bg-blue-50 transition-colors"
                    >
                      Click to upload files (PNG, JPG, PDF, DOC, DOCX - Max 10MB each, 5 files max)
                    </button>
                  </Field>

                  {formState.attachments.length > 0 && (
                    <div className="space-y-2">
                      {formState.attachments.map((attachment) => (
                        <div
                          key={attachment.id}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                        >
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {attachment.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {formatFileSize(attachment.size)}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeAttachment(attachment.id)}
                            className="ml-4 text-gray-400 hover:text-red-600 transition-colors"
                            aria-label="Remove file"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </section>

              {/* Expectations */}
              <section className="bg-white rounded-lg border border-gray-200 p-6">
                <SectionTitle>Expectations</SectionTitle>
                <div className="space-y-6">
                  <Field label="Requested Deadline" id="requestedDeadline">
                    <input
                      type="date"
                      id="requestedDeadline"
                      value={formState.requestedDeadline}
                      onChange={(e) => updateField("requestedDeadline", e.target.value)}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring-2"
                    />
                  </Field>

                  <div className="flex items-center gap-3">
                    <Checkbox.Root
                      id="approvalBeforePublishing"
                      checked={formState.approvalBeforePublishing}
                      onCheckedChange={(checked) =>
                        updateField("approvalBeforePublishing", checked === true)
                      }
                      className="flex h-5 w-5 items-center justify-center rounded border-2 border-gray-300 bg-white data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <Checkbox.Indicator>
                        <Check className="w-4 h-4 text-white" />
                      </Checkbox.Indicator>
                    </Checkbox.Root>
                    <Label.Root
                      htmlFor="approvalBeforePublishing"
                      className="text-sm text-gray-700 cursor-pointer"
                    >
                      Approval before publishing
                    </Label.Root>
                  </div>
                </div>
              </section>

              {/* Confirmation */}
              <section className="bg-white rounded-lg border border-gray-200 p-6">
                <SectionTitle>Confirmation</SectionTitle>
                <div className="space-y-4">
                  {formState.priority === "Urgent" && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-yellow-800 mb-1">
                            Urgent Request Notice
                          </p>
                          <p className="text-sm text-yellow-700">
                            Urgent requests may affect other timelines and require additional resources.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Checkbox.Root
                        id="confirmAccurate"
                        checked={formState.confirmAccurate}
                        onCheckedChange={(checked) =>
                          updateField("confirmAccurate", checked === true)
                        }
                        className="mt-0.5 flex h-5 w-5 items-center justify-center rounded border-2 border-gray-300 bg-white data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        aria-required="true"
                      >
                        <Checkbox.Indicator>
                          <Check className="w-4 h-4 text-white" />
                        </Checkbox.Indicator>
                      </Checkbox.Root>
                      <div className="flex-1">
                        <Label.Root
                          htmlFor="confirmAccurate"
                          className="text-sm text-gray-700 cursor-pointer"
                        >
                          I confirm the information provided is accurate.
                          <span className="text-red-500 ml-1">*</span>
                        </Label.Root>
                        {errors.confirmAccurate && (
                          <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                            <AlertTriangle className="w-4 h-4" />
                            {errors.confirmAccurate}
                          </p>
                        )}
                      </div>
                    </div>

                    {formState.priority === "Urgent" && (
                      <div className="flex items-start gap-3">
                        <Checkbox.Root
                          id="confirmUrgent"
                          checked={formState.confirmUrgent}
                          onCheckedChange={(checked) =>
                            updateField("confirmUrgent", checked === true)
                          }
                          className="mt-0.5 flex h-5 w-5 items-center justify-center rounded border-2 border-gray-300 bg-white data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          aria-required="true"
                        >
                          <Checkbox.Indicator>
                            <Check className="w-4 h-4 text-white" />
                          </Checkbox.Indicator>
                        </Checkbox.Root>
                        <div className="flex-1">
                          <Label.Root
                            htmlFor="confirmUrgent"
                            className="text-sm text-gray-700 cursor-pointer"
                          >
                            I understand urgent requests may affect other timelines.
                            <span className="text-red-500 ml-1">*</span>
                          </Label.Root>
                          {errors.confirmUrgent && (
                            <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                              <AlertTriangle className="w-4 h-4" />
                              {errors.confirmUrgent}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </section>

              {/* Form Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  type="submit"
                  disabled={!formValid || isSubmitting}
                  className="flex-1 sm:flex-none px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {isSubmitting ? "Submitting..." : "Submit Ticket"}
                </button>
                <button
                  type="button"
                  onClick={handleSaveDraft}
                  className="flex-1 sm:flex-none px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Save Draft
                </button>
              </div>
            </form>
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24">
              {/* Mobile Accordion */}
              <Accordion.Root
                type="single"
                collapsible
                className="lg:hidden mb-4"
                value={previewOpen ? "preview" : undefined}
                onValueChange={(value) => setPreviewOpen(value === "preview")}
              >
                <Accordion.Item value="preview" className="bg-white rounded-lg border border-gray-200">
                  <Accordion.Trigger className="w-full px-6 py-4 flex items-center justify-between text-left font-semibold text-gray-900 hover:bg-gray-50 transition-colors">
                    Ticket Preview
                    <ChevronDown className="w-5 h-5 text-gray-500 transition-transform data-[state=open]:rotate-180" />
                  </Accordion.Trigger>
                  <Accordion.Content className="px-6 pb-4">
                    <TicketPreview formState={formState} currentUser={CURRENT_USER} />
                  </Accordion.Content>
                </Accordion.Item>
              </Accordion.Root>

              {/* Desktop Preview */}
              <div className="hidden lg:block bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Ticket Preview</h3>
                <TicketPreview formState={formState} currentUser={CURRENT_USER} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Preview Component
function TicketPreview({
  formState,
  currentUser,
}: {
  formState: FormState;
  currentUser: { name: string; email: string };
}) {
  return (
    <div className="space-y-4 text-sm">
      <div className="border-b border-gray-200 pb-4">
        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Submitted By</p>
        <p className="font-medium text-gray-900">{currentUser.name}</p>
        <p className="text-gray-600">{currentUser.email}</p>
      </div>

      {formState.ticketTitle && (
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Title</p>
          <p className="text-gray-900">{formState.ticketTitle}</p>
        </div>
      )}

      {formState.requestType && (
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Request Type</p>
          <p className="text-gray-900">{formState.requestType}</p>
        </div>
      )}

      {formState.priority && (
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Priority</p>
          <span
            className={`inline-block px-2 py-1 rounded text-xs font-medium ${
              formState.priority === "Urgent"
                ? "bg-red-100 text-red-800"
                : formState.priority === "High"
                ? "bg-orange-100 text-orange-800"
                : formState.priority === "Normal"
                ? "bg-blue-100 text-blue-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {formState.priority}
          </span>
        </div>
      )}

      {formState.pageUrl && (
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Page URL</p>
          <a
            href={formState.pageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline break-all"
          >
            {formState.pageUrl}
          </a>
        </div>
      )}

      {formState.specificSection && (
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Section</p>
          <p className="text-gray-900">{formState.specificSection}</p>
        </div>
      )}

      {formState.description && (
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Description</p>
          <p className="text-gray-900 whitespace-pre-wrap">{formState.description}</p>
        </div>
      )}

      {formState.referenceLink && (
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Reference Link</p>
          <a
            href={formState.referenceLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline break-all"
          >
            {formState.referenceLink}
          </a>
        </div>
      )}

      {formState.attachments.length > 0 && (
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Attachments</p>
          <ul className="space-y-1">
            {formState.attachments.map((att) => (
              <li key={att.id} className="text-gray-900">
                {att.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {formState.requestedDeadline && (
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Deadline</p>
          <p className="text-gray-900">
            {new Date(formState.requestedDeadline).toLocaleDateString()}
          </p>
        </div>
      )}

      <div className="pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Options</p>
        <div className="space-y-1">
          {formState.approvalBeforePublishing && (
            <p className="text-gray-900">✓ Approval before publishing</p>
          )}
          {formState.confirmAccurate && (
            <p className="text-gray-900">✓ Information confirmed</p>
          )}
          {formState.confirmUrgent && (
            <p className="text-gray-900">✓ Urgent request acknowledged</p>
          )}
        </div>
      </div>
    </div>
  );
}



