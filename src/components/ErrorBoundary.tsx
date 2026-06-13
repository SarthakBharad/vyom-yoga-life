import { Component, ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

/**
 * ErrorBoundary catches JavaScript errors anywhere in the child component tree
 * and displays a graceful error page instead of crashing
 */
export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error boundary caught:', error, errorInfo)
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-cream dark:bg-ink">
          <div className="text-center max-w-md px-6">
            <div className="text-8xl mb-6">⚠️</div>
            <h1 className="text-h2 mb-4 text-text-primary">Something went wrong</h1>
            <p className="text-body text-text-secondary mb-8 leading-relaxed">
              We encountered an unexpected error. Please try refreshing the page or return to home.
            </p>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mb-8 p-4 bg-red-100 dark:bg-red-900/20 rounded-lg text-left">
                <p className="text-xs font-mono text-red-800 dark:text-red-300 break-words">
                  {this.state.error.message}
                </p>
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="px-7 py-3.5 rounded-full bg-terracotta text-white font-semibold hover:bg-walnut transition shadow-card"
              >
                Refresh Page
              </button>
              <Link
                to="/"
                className="px-7 py-3.5 rounded-full border border-terracotta text-terracotta font-semibold hover:bg-terracotta/5 transition"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}