import { Box, Container } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { HeaderBar } from './components/Layout/HeaderBar'
import { PageShell } from './components/Layout/PageShell'
import { user } from './data/mockData'

function App() {
  return (
    <Box
      component="div"
      sx={{
        minHeight: '100vh',
        backgroundImage:
          'linear-gradient(180deg, #05040b 0%, #030313 45%, #040113 100%)',
        py: { xs: 3, sm: 5 },
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          py: { xs: 0, sm: 2 },
          pb: { xs: 12, sm: 14 },
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <PageShell>
            <Outlet />
          </PageShell>
        </Box>
        <HeaderBar user={user} />
      </Container>
    </Box>
  )
}

export default App
