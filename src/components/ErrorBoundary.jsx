import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Uncaught React Error:', error, errorInfo);
  }

  handleReset = () => {
    localStorage.clear();
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0b0f19] text-white flex items-center justify-center p-6 font-sans">
          <div className="max-w-md w-full glass-panel rounded-3xl p-8 border border-red-500/30 text-center shadow-2xl space-y-6">
            <div className="h-16 w-16 rounded-2xl bg-red-600/20 text-red-400 border border-red-500/30 flex items-center justify-center mx-auto">
              <AlertTriangle className="h-8 w-8" />
            </div>

            <div>
              <h2 className="text-2xl font-black text-white">Application Error Detected</h2>
              <p className="text-xs text-gray-400 mt-2">
                {this.state.error?.message || 'An unexpected UI state error occurred.'}
              </p>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-gray-800 text-[11px] font-mono text-red-300 text-left overflow-x-auto">
              {String(this.state.error)}
            </div>

            <button
              onClick={this.handleReset}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25 transition-all"
            >
              <RefreshCw className="h-4 w-4" /> Reset Application & Clear Local Cache
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
