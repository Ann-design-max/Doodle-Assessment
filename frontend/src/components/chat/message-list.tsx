import { useEffect, useRef } from "react";

type Message = {
  _id: string;
  message: string;
  author: string;
  createdAt: string;
};

type MessageListProps = {
  messages: Message[];
  isLoading: boolean;
  currentUser: string;
};

function formatTimestamp(value: string) {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export function MessageList({
  messages,
  isLoading,
  currentUser,
}: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <section className="flex flex-col h-full min-h-0 w-full overflow-hidden my-4">
      <div className="flex-1 min-h-0 overflow-y-auto px-6 py-6">
        {isLoading ? (
          <div className="flex h-full items-center justify-center rounded-md border border-dashed border-border bg-muted/40 p-6 text-sm text-black/70">
            Loading conversation...
          </div>
        ) : messages.length === 0 ? (
          <div className="flex h-full items-center justify-center rounded-md border border-dashed border-border bg-muted/40 p-6 text-center text-sm text-black/70">
            No messages have been posted yet. Start the conversation.
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {messages.map((message) => {
              const isMine = message.author === currentUser;

              return (
                <div
                  key={message._id}
                  className={`flex ${
                    isMine ? "justify-end" : "justify-start"
                  }`}
                >
                  <article
                    className={[
                      "w-fit max-w-105 lg:max-w-2xl xl:max-w-4xl px-4 py-3 rounded-[3px] border border-gray-300 text-black",
                      isMine
                        ? "bg-accent"
                        : "bg-white",
                    ].join(" ")}
                  >
                    {/* Author label for others */}
                    {!isMine && (
                      <p className="mb-1 text-sm text-black/40">
                        {message.author}
                      </p>
                    )}

                    {/* Message text */}
                    <p className="whitespace-pre-wrap text-md font-medium leading-6">
                      {message.message}
                    </p>

                    {/* Timestamp */}
                    <p
                      className={`mt-2 text-sm text-black/40  ${
                        isMine ? "text-right" : "text-left"
                      }`}
                    >
                      {formatTimestamp(message.createdAt)}
                    </p>
                  </article>
                </div>
              );
            })}

            {/* Auto-scroll anchor */}
            <div ref={bottomRef} />
            <br/>
          </div>
        )}
      </div>
    </section>
  );
}