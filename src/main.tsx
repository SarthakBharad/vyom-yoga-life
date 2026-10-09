import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

if (import.meta.env.PROD) {
  const loadAnalytics = () => {
    import('./config/analytics')
      .then(m => m.initAnalytics())
      .catch(() => {
      })
  }

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(loadAnalytics, { timeout: 4000 })
  } else {
    setTimeout(loadAnalytics, 2000)
  }
}