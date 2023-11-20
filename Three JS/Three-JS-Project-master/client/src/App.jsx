import Home from "./pages/home"
import Customizer from "./pages/Customizer"
import CanvasModel from "./canvas"

function App() {


  return (
    <>
      <div className="app transition-all ease-in"> 

        <Home />
        <Customizer />
        <CanvasModel />
        
      </div>
    </>
  )
}

export default App
