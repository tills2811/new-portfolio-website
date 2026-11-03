import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { sendEmail, toast } = vi.hoisted(() => ({
  sendEmail: vi.fn(),
  toast: { success: vi.fn(), error: vi.fn() },
}));
vi.mock("@/actions/sendEmail", () => ({ sendEmail: (fd: FormData) => sendEmail(fd) }));
vi.mock("react-hot-toast", () => ({ default: toast }));

import ContactForm from "./contact-form";

function fill() {
  fireEvent.change(screen.getByLabelText("Your email"), { target: { value: "r@co.com" } });
  fireEvent.change(screen.getByLabelText("Message"), { target: { value: "Hi Shreyash" } });
}
const submit = () => fireEvent.submit(screen.getByRole("button", { name: "Send message" }).closest("form")!);

describe("ContactForm", () => {
  beforeEach(() => {
    sendEmail.mockReset();
    toast.success.mockReset();
    toast.error.mockReset();
  });

  it("success: toast.success(\"Message sent\") and fields cleared", async () => {
    sendEmail.mockResolvedValue({ data: { id: "1" } });
    render(<ContactForm />);
    fill();
    submit();
    await waitFor(() => expect(toast.success).toHaveBeenCalledWith("Message sent"));
    expect(screen.getByLabelText("Message")).toHaveValue("");
    expect(sendEmail.mock.calls[0][0].get("senderEmail")).toBe("r@co.com");
  });

  it('error {error:"Invalid sender email"}: toast.error with that text and message field keeps its value', async () => {
    sendEmail.mockResolvedValue({ error: "Invalid sender email" });
    render(<ContactForm />);
    fill();
    submit();
    await waitFor(() => expect(toast.error).toHaveBeenCalledWith("Invalid sender email"));
    expect(screen.getByLabelText("Message")).toHaveValue("Hi Shreyash");
    expect(toast.success).not.toHaveBeenCalled();
  });

  it("rejected action (e.g. missing API key): error toast and message kept", async () => {
    sendEmail.mockRejectedValue(new Error("Missing API key"));
    render(<ContactForm />);
    fill();
    submit();
    await waitFor(() => expect(toast.error).toHaveBeenCalled());
    expect(toast.error.mock.calls[0][0]).toMatch(/couldn't send/i);
    expect(screen.getByLabelText("Message")).toHaveValue("Hi Shreyash");
    expect(screen.getByRole("button", { name: "Send message" })).toBeEnabled();
  });

  it("button disabled while pending", async () => {
    let resolve!: (v: unknown) => void;
    sendEmail.mockReturnValue(new Promise((r) => (resolve = r)));
    render(<ContactForm />);
    fill();
    submit();
    await waitFor(() => expect(screen.getByRole("button", { name: /Send/ })).toBeDisabled());
    resolve({ data: {} });
    await waitFor(() => expect(screen.getByRole("button", { name: "Send message" })).toBeEnabled());
  });

  it("submitting before hydration never puts the message in the URL (method is post)", () => {
    render(<ContactForm />);
    expect(screen.getByRole("button", { name: "Send message" }).closest("form")).toHaveAttribute("method", "post");
  });

  it("fields have required and length limits", () => {
    render(<ContactForm />);
    expect(screen.getByLabelText("Your email")).toHaveAttribute("maxLength", "500");
    expect(screen.getByLabelText("Your email")).toBeRequired();
    expect(screen.getByLabelText("Message")).toHaveAttribute("maxLength", "5000");
  });
});
