import { Routes, Route } from "react-router"

import AuthLayout from "./components/Auth/auth-layout"
import Login from "./components/Auth/login"
import Signup from "./components/Auth/signup"
import Home from "./components/Home/home"

function App() {

  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>
      <Route path="/" element={<Home />} />
    </Routes>
  )
}

export default App
