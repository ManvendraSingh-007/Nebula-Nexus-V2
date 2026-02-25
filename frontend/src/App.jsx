import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import Navigation from './components/Navigation/Navigation'
import Login from './feature/auth/login/Login'
import Signup from './feature/auth/Signup/Signup'
import Home from './feature/pages/Home'


export function MainLayout() {
  return <>
    <Navigation />
    <Outlet />
  </>
}


export function AuthLayout() {
  return <Outlet />
}

const App = () => {
  const isLoggedIn = false // Replace with real auth state

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route path='' element={<Home />} />
        </Route>

        <Route path='/auth' element={<AuthLayout />}>
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<Signup />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App