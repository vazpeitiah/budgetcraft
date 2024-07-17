import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import i18n from 'i18next'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { initReactI18next } from 'react-i18next'

import es from 'locale/es/translation.json'
import { AlertsProvider } from 'providers/AlertsProvider'
import { queryClient } from 'queries/queryClient'

import './index.css'
import AppRouter from './router/AppRouter'

i18n.use(initReactI18next).init({
  resources: {
    es: {
      translation: es
    }
  },
  fallbackLng: 'es',
  interpolation: {
    escapeValue: false
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AlertsProvider>
        <AppRouter />
      </AlertsProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
)
