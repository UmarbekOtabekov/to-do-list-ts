import { Slide, ToastContainer } from "react-toastify"
import Home from "./Pages/Home"

function App() {

  return (
    <div className="min-h-screen bg-gray-300">
      <Home />
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        theme="colored"
        transition={Slide}
      />
    </div>
  )
}

export default App