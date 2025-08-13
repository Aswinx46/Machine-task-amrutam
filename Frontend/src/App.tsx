
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserRoute from './routes/user/UserRoute'
import DoctorRoute from './routes/doctor/DoctorRoute'
function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/*' element={<UserRoute />} />
        <Route path='/doctor/*' element={<DoctorRoute />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
