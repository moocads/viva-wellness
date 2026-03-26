"use client";

import Link from "next/link";
import { FormEvent } from "react";

export function ContactForm() {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // 后续可接 API / 邮件服务
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="mb-2 block text-sm font-medium">
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="John Doe"
            className="w-full border border-border bg-background px-3 py-2.5 text-sm outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="mb-2 block text-sm font-medium">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="john@email.com"
            className="w-full border border-border bg-background px-3 py-2.5 text-sm outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-phone" className="mb-2 block text-sm font-medium">
          Phone Number
        </label>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="(123)-456-7890"
          className="w-full border border-border bg-background px-3 py-2.5 text-sm outline-none focus-visible:ring-1 focus-visible:ring-ring"
        />
      </div>

      <div>
        <label htmlFor="contact-message" className="mb-2 block text-sm font-medium">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          placeholder=""
          className="w-full resize-y border border-border bg-background px-3 py-2.5 text-sm outline-none focus-visible:ring-1 focus-visible:ring-ring"
        />
      </div>

      <label className="flex cursor-pointer items-start gap-3 text-sm text-muted-foreground">
        <input
          type="checkbox"
          name="consent"
          className="mt-1 h-4 w-4 shrink-0 rounded border-border"
        />
        <span>
          I agree to receive communications from Lavo Flooring.{" "}
          <Link href="#" className="font-semibold text-foreground underline underline-offset-2 hover:no-underline">
            Privacy Policy
          </Link>
        </span>
      </label>

      <button
        type="submit"
        className="w-full bg-foreground py-3 text-sm font-medium tracking-wide text-background transition-opacity hover:opacity-90"
      >
        Send
      </button>
    </form>
  );
}
