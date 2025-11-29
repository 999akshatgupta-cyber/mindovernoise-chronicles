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

  const vapiRef = useRef<VapiInstance | null>(null);

  const initializeVapi = useCallback(() => {
    if (!publicKey) {
      setError("Missing Vapi public key. Check environment configuration.");
      return null;
    }

    const instance = new Vapi(publicKey) as VapiInstance;

    if (assistantId) {
      try {
        instance.setAssistant?.(assistantId);
      } catch (err) {
        console.warn("setAssistant not supported on this SDK version", err);
      }
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
  }, [ensureVapi, upsertConversationEntry]);

  const startCall = useCallback(async () => {
    const instance = ensureVapi();
    if (!instance) return;

    if (!assistantId) {
      setError("Missing Vapi assistant ID. Check environment configuration.");
      return;
    }

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

  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-[60] flex w-full max-w-[20rem] flex-col items-end gap-3 sm:bottom-8 sm:right-8">
      <div ref={liveMessageRef} className="sr-only" aria-live="polite" aria-atomic="true" />

      {error && (
        <Alert
          variant="destructive"
          className="pointer-events-auto max-w-sm border-destructive/50 bg-destructive/10 text-destructive"
        >
          <AlertTitle>Voice assistant unavailable</AlertTitle>
          <AlertDescription className="text-destructive">{error}</AlertDescription>
        </Alert>
      )}

      {(conversation.length > 0 || isActive) && (
        <div className="pointer-events-auto w-full rounded-2xl border border-border/60 bg-background/95 shadow-xl backdrop-blur">
          <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 overflow-hidden rounded-full bg-gray-100">
                <img 
                  src="/voice-assistant-logo.jpg" 
                  alt="" 
                  className="h-full w-full object-cover"
                  aria-hidden="true"
                />
              </div>
              <div>
                <p className="text-sm font-medium">Voice assistant</p>
                <p className="text-xs text-muted-foreground">
                  {isActive ? "Listening…" : "Tap the mic to start a conversation"}
                </p>
              </div>
            </div>
            <span
              className={cn(
                "inline-flex h-2 w-2 rounded-full",
                isActive ? "bg-emerald-500" : "bg-muted-foreground/40",
              )}
            />
          </div>

          <ScrollArea className="max-h-64 px-4 py-3">
            <div className="flex flex-col gap-3">
              {conversation.map((entry) => (
                <div
                  key={entry.id}
                  className={cn(
                    "rounded-xl px-3 py-2 text-sm shadow-sm",
                    entry.role === "assistant"
                      ? "ml-0 mr-auto bg-muted text-foreground"
                      : "ml-auto mr-0 bg-primary text-primary-foreground",
                  )}
                >
                  <span className="block text-xs font-medium uppercase tracking-wide opacity-70">
                    {entry.role === "assistant" ? "Assistant" : "You"}
                  </span>
                  <span className="mt-1 block whitespace-pre-wrap leading-relaxed">{entry.text}</span>
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
          "pointer-events-auto h-14 w-14 rounded-full shadow-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          isActive ? "bg-red-600 hover:bg-red-600/90" : "bg-primary hover:bg-primary/90",
          isLoading && "cursor-progress opacity-90",
          !isActive && !isLoading && "p-0 overflow-hidden" // Remove padding for image
        )}
        onClick={handleToggle}
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="h-6 w-6 animate-spin" />
        ) : isActive ? (
          <MicOff className="h-6 w-6" />
        ) : (
          <img 
            src="/voice-assistant-logo.jpg" 
            alt="Start voice assistant" 
            className="h-full w-full object-cover"
          />
        )}
        <span className="sr-only">{micLabel}</span>
      </Button>
    </div>
  );
};

export default VoiceAssistant;
