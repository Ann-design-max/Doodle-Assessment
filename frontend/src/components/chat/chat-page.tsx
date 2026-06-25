"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { ChatShell } from "./chat-shell";
import { SidebarProvider } from "@/components/ui/sidebar";

type Message = {
  _id: string;
  message: string;
  author: string;
  createdAt: string;
};

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3001/api/v1";

const API_TOKEN =
  process.env.NEXT_PUBLIC_API_TOKEN ?? "super-secret-doodle-token";

export function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentUser = "Anastestia Onyekaba";

  const isMounted = useRef(false);

  // =========================
  // FETCH MESSAGES
  // =========================
  const fetchMessages = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/messages`, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
        cache: "no-store",
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.log("FETCH ERROR:", errorText);
        throw new Error(errorText || "Unable to load messages.");
      }

      const data = (await response.json()) as Message[];

      setMessages((prev) => {
        const prevLast = prev.at(-1)?._id;
        const newLast = data.at(-1)?._id;

        if (prev.length === data.length && prevLast === newLast) {
          return prev;
        }

        return data;
      });

      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to load messages."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // =========================
  // INITIAL LOAD + POLLING
  // =========================
  useEffect(() => {
    if (isMounted.current) return;
    isMounted.current = true;

    void fetchMessages();

    const interval = window.setInterval(() => {
      void fetchMessages();
    }, 5000);

    return () => window.clearInterval(interval);
  }, []);

  // =========================
  // SEND MESSAGE
  // =========================
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!draft.trim()) {
      setError("Please add a message.");
      return;
    }

    setIsSending(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_TOKEN}`,
        },
        body: JSON.stringify({
          message: draft.trim(),
          author: currentUser,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        console.log("POST ERROR:", data);
        throw new Error(
          data?.error?.message ||
            data?.message ||
            "Unable to send message."
        );
      }

      setDraft("");
      await fetchMessages();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to send message.");
    } finally {
      setIsSending(false);
    }
  };

  // =========================
  // RENDER 
  // =========================
  return (
    <SidebarProvider defaultOpen>
      <ChatShell
        messages={messages}
        isLoading={isLoading}
        draft={draft}
        error={error}
        isSending={isSending}
        currentUser={currentUser}
        onDraftChange={setDraft}
        onSubmit={handleSubmit}
      />
    </SidebarProvider>
  );
}