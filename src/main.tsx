import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import { StartScreen } from './modules/auth/StartScreen'
import { SearchScreen } from './modules/search/SearchScreen'
import { CompanyScreen } from './modules/company/CompanyScreen'
import { ReportBugScreen } from './modules/report/ReportBugScreen'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { index: true, element: <StartScreen /> },
      { path: 'search', element: <SearchScreen /> },
      { path: 'company/:companyId', element: <CompanyScreen /> },
      { path: 'report', element: <ReportBugScreen /> },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
)
