import React, { Component, ErrorInfo, ReactNode } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="flex min-h-screen items-center justify-center p-4">
                    <Alert variant="destructive" className="max-w-md">
                        <AlertTitle>Something went wrong</AlertTitle>
                        <AlertDescription>
                            {this.state.error?.message || "An unexpected error occurred."}
                        </AlertDescription>
                    </Alert>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
