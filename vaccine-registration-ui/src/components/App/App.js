import { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "../Home/Home"
import Navbar from "../Navbar/Navbar"
import Register from "../Register/Register"
import Login from "../Login/Login"
import Portal from "../Portal/Portal"
import Update from "../Update/Update"
import Cancel  from "../Cancel/Cancel"
import "./App.css"

export default function App() {
  const [appState, setAppState] = useState({})

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar user={appState.user} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register setAppState={setAppState} />} />
          <Route path="/login" element={<Login setAppState={setAppState} />} />
          <Route
            path="/portal"
            element={<Portal setAppState={setAppState} appState={appState} user={appState?.user} />}
          />
          <Route
            path="/update"
            element={<Update setAppState={setAppState} appState={appState} user={appState?.user} />}
          />
          <Route
            path="/cancel"
            element={<Cancel setAppState={setAppState} appState={appState} user={appState?.user} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
