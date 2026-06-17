import React from 'react';

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode; name?: string },
  { hasError: boolean; error: Error | null }
> {
  state = { hasError: false, error: null as Error | null };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: unknown) {
    console.error(`Section crashed (${this.props.name || 'Unknown'}):`, error, info);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback !== undefined) return this.props.fallback;
      return (
        <div className="p-4 bg-red-900/50 border border-red-500 rounded text-red-200 z-50 relative m-4">
          <h3 className="font-bold">Component Crashed: {this.props.name || 'Unknown'}</h3>
          <p className="text-sm font-mono mt-2 break-all">{this.state.error?.message || 'Unknown error'}</p>
        </div>
      );
    }
    return this.props.children;
  }
}
