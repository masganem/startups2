import { Outlet } from 'react-router-dom'
import { HeaderBar } from './components/Layout/HeaderBar'
import { PageShell } from './components/Layout/PageShell'
import { user } from './data/mockData'

function App() {
  return (
    <div className="min-h-screen bg-[#05040b] pb-10">
      <div className="mx-auto flex min-h-screen w-full max-w-screen-sm flex-col">
        <HeaderBar user={user} />
        <PageShell>
          <Outlet />
        </PageShell>
      </div>
    </div>
  )
}

export default App
