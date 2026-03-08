import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Vapi from "@vapi-ai/web";
import { Loader2, Mic, MicOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

type ConversationEntry = {
  id: string;
  role: "user" | "assistant";
  text: string;
  final: boolean;
};

type VapiInstance = Vapi & {
  setAssistant?: (assistantId: string) => void;
};

const VoiceAssistant = () => {
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [conversation, setConversation] = useState<ConversationEntry[]>([]);
  const liveMessageRef = useRef<HTMLDivElement>(null);

  const publicKey = import.meta.env.VITE_VAPI_PUBLIC_KEY as string | undefined;
  const assistantId = import.meta.env.VITE_VAPI_ASSISTANT_ID as string | undefined;
  const isConfigured = Boolean(publicKey && assistantId);

  const vapiRef = useRef<VapiInstance | null>(null);

  const initializeVapi = useCallback(() => {
    if (!publicKey || !assistantId) {
      return null;
    }

    const instance = new Vapi(publicKey) as VapiInstance;

    try {
      instance.setAssistant?.(assistantId);
    } catch (err) {
      console.warn("setAssistant not supported on this SDK version", err);
    }

    return instance;
  }, [assistantId, publicKey]);

  const ensureVapi = useCallback(() => {
    if (vapiRef.current) {
      return vapiRef.current;
    }

    const instance = initializeVapi();
    vapiRef.current = instance;
    return instance;
  }, [initializeVapi]);

  const upsertConversationEntry = useCallback((role: "user" | "assistant", text: string, isFinal: boolean) => {
    if (!text) return;

    setConversation((prev) => {
      const last = prev.at(-1);

      if (last && last.role === role && !last.final) {
        return [
          ...prev.slice(0, -1),
          {
            ...last,
            text,
            final: isFinal || last.final,
          },
        ];
      }

      return [
        ...prev,
        {
          id: `${role}-${Date.now()}`,
          role,
          text,
          final: isFinal,
        },
      ];
    });
  }, []);

  useEffect(() => {
    if (!isConfigured) {
      return undefined;
    }

    const instance = ensureVapi();

    if (!instance) {
      return undefined;
    }

    const handleCallStart = () => {
      setIsActive(true);
      setError(null);
    };

    const handleCallEnd = () => {
      setIsActive(false);
      setIsLoading(false);
    };

    const handleMessage = (message: any) => {
      if (!message) return;

      if (message.type === "transcript") {
        const transcriptText = message.transcript ?? message.text ?? "";
        const isFinal = Boolean(message.isFinal ?? message.final);
        const role = message.role === "assistant" ? "assistant" : "user";
        upsertConversationEntry(role, transcriptText, isFinal);
      }

      if (message.type === "response" || message.type === "tool-response" || message.type === "assistant-message") {
        const responseText = message.message?.content ?? message.content ?? message.message ?? message.text ?? "";
        if (responseText) {
          upsertConversationEntry("assistant", responseText, true);
        }
      }

      if (liveMessageRef.current) {
        liveMessageRef.current.textContent = message.transcript ?? message.message ?? message.text ?? "";
      }
    };

    const handleError = (sdkError: any) => {
      console.error("Vapi error", sdkError);
      const message =
        sdkError?.message ??
        sdkError?.error?.message ??
        (typeof sdkError === "string" ? sdkError : "The voice assistant encountered an unexpected error.");
      setError(message);
      setIsActive(false);
      setIsLoading(false);
    };

    const handleCallStartFailed = (event: any) => {
      const reason = event?.error ?? event?.message ?? "Unable to start the call.";
      setError(reason);
      setIsActive(false);
      setIsLoading(false);
    };

    instance.on("call-start", handleCallStart);
    instance.on("call-end", handleCallEnd);
    instance.on("message", handleMessage);
    instance.on("error", handleError);
    instance.on("call-start-failed", handleCallStartFailed);

    return () => {
      instance.removeListener("call-start", handleCallStart);
      instance.removeListener("call-end", handleCallEnd);
      instance.removeListener("message", handleMessage);
      instance.removeListener("error", handleError);
      instance.removeListener("call-start-failed", handleCallStartFailed);
      instance.stop().catch(() => undefined);
      instance.removeAllListeners();
    };
  }, [ensureVapi, isConfigured, upsertConversationEntry]);

  const startCall = useCallback(async () => {
    const instance = ensureVapi();
    if (!instance || !assistantId) return;

    setIsLoading(true);
    setError(null);

    try {
      await instance.start(assistantId);
    } catch (err: any) {
      console.error("Failed to start Vapi call", err);
      const errorMessage =
        err?.name === "NotAllowedError"
          ? "Microphone access denied. Please enable mic permissions and try again."
          : err?.message ?? "Could not start the voice assistant.";
      setError(errorMessage);
      setIsActive(false);
      setIsLoading(false);
    }
  }, [assistantId, ensureVapi]);

  const stopCall = useCallback(async () => {
    if (!vapiRef.current) return;

    setIsLoading(true);

    try {
      await vapiRef.current.stop();
    } catch (err) {
      console.error("Failed to stop Vapi call", err);
    } finally {
      setIsLoading(false);
      setIsActive(false);
    }
  }, []);

  const handleToggle = useCallback(() => {
    if (isLoading) {
      return;
    }

    if (isActive) {
      void stopCall();
    } else {
      void startCall();
    }
  }, [isActive, isLoading, startCall, stopCall]);

  const micLabel = useMemo(() => {
    if (isLoading) return "Loading voice assistant";
    return isActive ? "Stop voice assistant" : "Start voice assistant";
  }, [isActive, isLoading]);

  if (!isConfigured) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-[60] flex w-full max-w-[22rem] flex-col items-end gap-3 sm:bottom-8 sm:right-8">
      <div ref={liveMessageRef} className="sr-only" aria-live="polite" aria-atomic="true" />

      {error && (
        <Alert className="pointer-events-auto max-w-sm rounded-[1.5rem] border border-destructive/30 bg-destructive/10 text-destructive">
          <AlertTitle>Voice assistant unavailable</AlertTitle>
          <AlertDescription className="text-destructive">{error}</AlertDescription>
        </Alert>
      )}

      {(conversation.length > 0 || isActive) && (
        <div className="panel-surface pointer-events-auto w-full rounded-[1.8rem]">
          <div className="flex items-center justify-between border-b border-white/8 px-4 py-4">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-[1rem] border border-primary/25 bg-primary/10 text-primary">
                <Mic className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-foreground">Voice layer</p>
                <p className="text-xs text-muted-foreground">
                  {isActive ? "Listening live" : "Tap the mic to start a conversation"}
                </p>
              </div>
            </div>
            <span
              className={cn(
                "inline-flex h-2.5 w-2.5 rounded-full",
                isActive ? "bg-primary shadow-[0_0_16px_hsl(var(--primary)/0.6)]" : "bg-muted-foreground/40",
              )}
            />
          </div>

          <ScrollArea className="max-h-72 px-4 py-3">
            <div className="flex flex-col gap-3">
              {conversation.map((entry) => (
                <div
                  key={entry.id}
                  className={cn(
                    "rounded-[1.2rem] px-4 py-3 text-sm shadow-sm",
                    entry.role === "assistant"
                      ? "mr-auto bg-white/[0.05] text-foreground"
                      : "ml-auto bg-primary text-primary-foreground",
                  )}
                >
                  <span className="block text-[0.62rem] font-semibold uppercase tracking-[0.18em] opacity-70">
                    {entry.role === "assistant" ? "Assistant" : "You"}
                  </span>
                  <span className="mt-2 block whitespace-pre-wrap leading-7">{entry.text}</span>
                </div>
              ))}

              {isActive && !conversation.length && (
                <p className="text-xs text-muted-foreground">Start speaking to see the live transcript.</p>
              )}
            </div>
          </ScrollArea>
        </div>
      )}

      <Button
        type="button"
        size="icon"
        aria-pressed={isActive}
        aria-label={micLabel}
        className={cn(
          "pointer-events-auto h-14 w-14 rounded-[1.25rem] border border-primary/30 shadow-[0_18px_40px_hsl(0_0%_0%/0.35)] ring-offset-0",
          isActive ? "bg-destructive text-destructive-foreground" : "bg-primary text-primary-foreground",
          isLoading && "cursor-progress opacity-90",
        )}
        onClick={handleToggle}
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : isActive ? (
          <MicOff className="h-5 w-5" />
        ) : (
          <Mic className="h-5 w-5" />
        )}
        <span className="sr-only">{micLabel}</span>
      </Button>
    </div>
  );
};

export default VoiceAssistant;
