import Login from './pages/Login'
import { Toaster } from 'react-hot-toast'
import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoutes from './components/ProtectedRoutes'
import ProtectedLayout from './components/ProtectedLayout'
import Dashboard from './pages/Dashboard'
import Sessions from './pages/Sessions'
import Pricing from './pages/Pricing'
import MeetingRoom from './pages/MeetingRoom'

const App = () => {
  return (
    <>
      <Toaster />
      <Routes>
        {/*Public Routes */}
        <Route path='/login' element={<Login mode='login' />} />
        <Route path='/register' element={<Login mode='register' />} />

        {/*Private Routes */}
        <Route element={<ProtectedRoutes />}>
          <Route element={<ProtectedLayout />}>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/session' element={<Sessions />} />
            <Route path='/pricing' element={<Pricing />} />

          </Route>
          <Route path='/meeting/:meetingId' element={<MeetingRoom />} />

        </Route>

        {/*other Routes */}
        <Route path='*' element={<Navigate to='/dashboard' replace />} />
      </Routes>
    </>
  )
}

export default App