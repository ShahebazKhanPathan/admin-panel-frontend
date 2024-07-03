import { Divider } from "@chakra-ui/react"
import Navbar from "./components/Navbar"
import { Outlet } from "react-router-dom"

function App() {
  return (
    <>
      <Navbar />
      <Divider />
      <Outlet/>
    </>
  )
}

export default App
