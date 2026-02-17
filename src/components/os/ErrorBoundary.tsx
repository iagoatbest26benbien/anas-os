"use client";

import { Component, type ReactNode, type ErrorInfo } from "react";

interface Props {
  children: ReactNode;
  appName?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`[${this.props.appName}] Error:`, error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-full flex flex-col items-center justify-center gap-3 p-6 text-center">
          <span className="text-3xl" aria-hidden="true">⚠️</span>
          <p className="text-red-400 font-medium">Application crashed</p>
          <p className="text-neutral-500 text-sm">{this.state.error?.message}</p>
          <button
            className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-sm text-white transition-colors"
            onClick={() => this.setState({ hasError: false, error: null })}
          >
            Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
