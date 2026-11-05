"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";

type RetriableModuleOptions = {
  timeoutMs?: number;
  retries?: number;
};

function loadWithTimeout<T>(loader: () => Promise<T>, timeoutMs: number) {
  return new Promise<T>((resolve, reject) => {
    const timeoutId = globalThis.setTimeout(() => reject(new Error(`Content loading timed out after ${timeoutMs}ms`)), timeoutMs);
    loader().then(
      (module) => {
        globalThis.clearTimeout(timeoutId);
        resolve(module);
      },
      (error) => {
        globalThis.clearTimeout(timeoutId);
        reject(error);
      },
    );
  });
}

/**
 * Late-stage flows are separate browser chunks. Give transient mobile-network
 * failures one automatic retry and stop an indefinitely pending request from
 * leaving the loading animation on screen forever.
 */
export async function loadRetriableModule<T>(
  loader: () => Promise<T>,
  { timeoutMs = 15_000, retries = 1 }: RetriableModuleOptions = {},
): Promise<T> {
  let lastError: unknown;
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      return await loadWithTimeout(loader, timeoutMs);
    } catch (error) {
      lastError = error;
      if (attempt < retries) await new Promise((resolve) => globalThis.setTimeout(resolve, 350));
    }
  }
  throw lastError instanceof Error ? lastError : new Error("Content loading failed");
}

export function FlowLoadingFallback() {
  return (
    <section className="flow-load-state" role="status" aria-label="內容載入中" aria-live="polite" aria-busy="true">
      <span className="flow-load-spinner" aria-hidden="true" />
    </section>
  );
}

type FlowLoadErrorBoundaryProps = {
  children: ReactNode;
  resetKey: string;
};

type FlowLoadErrorBoundaryState = {
  hasError: boolean;
};

export class FlowLoadErrorBoundary extends Component<FlowLoadErrorBoundaryProps, FlowLoadErrorBoundaryState> {
  state: FlowLoadErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): FlowLoadErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Failed to load a journey flow", error, info.componentStack);
  }

  componentDidUpdate(previousProps: FlowLoadErrorBoundaryProps) {
    if (this.state.hasError && previousProps.resetKey !== this.props.resetKey) {
      this.setState({ hasError: false });
    }
  }

  private reloadPage = () => {
    window.location.reload();
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <section className="flow-load-state flow-load-state--error" role="alert">
        <div className="flow-load-card">
          <span className="flow-load-error-mark" aria-hidden="true">!</span>
          <div>
            <h1>這段內容暫時載入失敗</h1>
            <p>請確認網路連線後重新載入頁面。</p>
            <button className="primary" type="button" onClick={this.reloadPage}>重新載入</button>
          </div>
        </div>
      </section>
    );
  }
}
