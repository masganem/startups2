import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import { StartScreen } from './modules/auth/StartScreen'
import { SearchScreen } from './modules/search/SearchScreen'
import { CompanyScreen } from './modules/company/CompanyScreen'
import { ReportBugScreen } from './modules/report/ReportBugScreen'
import { appTheme } from './styles/muiTheme'

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
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
)
