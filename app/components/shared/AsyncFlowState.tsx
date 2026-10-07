"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";

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
