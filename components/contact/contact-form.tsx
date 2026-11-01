"use client";

import { type FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { sendEmail } from "@/actions/sendEmail";
import { contactLinks } from "@/lib/data";

const field =
  "w-full rounded-lg border-2 border-black bg-white px-4 py-3 text-[16px] text-black placeholder:text-black/50";

export default function ContactForm() {
  const [pending, setPending] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setPending(true);
    try {
      const { error } = await sendEmail(new FormData(form));
      if (error) {
        toast.error(error);
        return;
      }
      toast.success("Message sent");
      form.reset();
    } catch {
      // The action itself failed (network, server error, missing API key).
      toast.error(`Couldn't send your message. Email me at ${contactLinks.email} instead.`);
    } finally {
      setPending(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="mt-7 grid max-w-[460px] gap-3">
      <label className="grid gap-1 text-sm font-semibold">
        Your email
        <input name="senderEmail" type="email" required maxLength={500} className={field} autoComplete="email" />
      </label>
      <label className="grid gap-1 text-sm font-semibold">
        Message
        <textarea name="message" required maxLength={5000} rows={4} className={field} />
      </label>
      <button
        type="submit"
        disabled={pending}
        className="pill justify-self-start !border-black !bg-black !text-butter disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
