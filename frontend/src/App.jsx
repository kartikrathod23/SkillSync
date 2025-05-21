import React from "react"
import { BrowserRouter as Router, Routes,Route } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import Features from "./pages/Features"
import Contact from "./pages/Contact"
import About from "./pages/About"
import Dashboard from "./pages/Dashboard"
import UserProfile from './pages/Profile'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/signup" element={<SignupPage/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/features" element={<Features/>} />
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/profile/:id" element={<UserProfile />} />
      </Routes>
    </Router>
  )
}

export default App
