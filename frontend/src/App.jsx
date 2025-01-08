import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Compare from './pages/Compare'
import CoinPage from './pages/CoinPage'
import Register from './pages/Register'

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path = "/" element={<Home/>}/>
      <Route path = "/dashboard" element={<Dashboard/>}/>
      <Route path = "/coin/:id" element={<CoinPage/>}/>
      <Route path = "/compare" element={<Compare/>}/>
      <Route path = "/register" element={<Register/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
} 

export default App
