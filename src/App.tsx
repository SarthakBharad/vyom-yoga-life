import { Analytics } from '@vercel/analytics/react'
import { ThemeProvider } from './context/ThemeContext'
import ErrorBoundary from './components/ErrorBoundary'
import AppRouter from './routes/AppRouter'

function App() {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <AppRouter />
      </ErrorBoundary>
      {/* Vercel Web Analytics — renders nothing; sends data only on Vercel deployments */}
      <Analytics />
    </ThemeProvider>
  )
}

export default App