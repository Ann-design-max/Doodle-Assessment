import { useEffect, useRef, type FormEvent, KeyboardEvent } from "react";
import { MessageSquareText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type MessageComposerProps = {
  draft: string;
  error: string | null;
  isSending: boolean;
  onDraftChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function MessageComposer({
  draft,
  error,
  isSending,
  onDraftChange,
  onSubmit,
}: MessageComposerProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const resizeTextarea = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 160)}px`;
  };

  useEffect(() => {
    resizeTextarea();
  }, [draft]);

  // handle Enter to send, Shift+Enter for newline
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      if (!draft.trim() || isSending) return;

      const fakeEvent = {
        preventDefault: () => {},
      } as FormEvent<HTMLFormElement>;

      onSubmit(fakeEvent);

      // reset height after send
      requestAnimationFrame(() => {
        if (textareaRef.current) {
          textareaRef.current.style.height = "auto";
        }
      });
    }
  };

  return (
    <div className="flex w-full flex-col gap-2 border border-border bg-secondary p-2 lg:px-6">
      <form
        className="flex w-full flex-row items-end gap-2"
        onSubmit={onSubmit}
      >
        <div className="min-w-0 flex-1">
          <Textarea
            ref={textareaRef}
            value={draft}
            onChange={(event) => onDraftChange(event.target.value)}
            onInput={resizeTextarea}
            onKeyDown={handleKeyDown}
            rows={1}
            placeholder="Share something helpful..."
            disabled={isSending}
          />

          {error ? (
            <p className="mt-2 rounded-2xl border border-primary/20 bg-primary/10 px-3 py-2 text-sm text-primary">
              {error}
            </p>
          ) : null}
        </div>

        <Button
          type="submit"
          variant="default"
          size="default"
          disabled={draft.trim().length === 0 || isSending}
        >
          {isSending ? (
            <>
              <MessageSquareText className="size-4 animate-pulse" />
              Sending...
            </>
          ) : (
            <>Send</>
          )}
        </Button>
      </form>
    </div>
  );
}