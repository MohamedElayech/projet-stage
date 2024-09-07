import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PresentaionQuality from './Pages/PresentationQuality/PresentationQuality'
import Home from './Pages/Home'
import PresentaionQualityResult from './Pages/PresentationQuality/PresentationQualityResult'

function App() {
  const [count, setCount] = useState(0)

  return (
  <Home></Home>
    // <PresentaionQuality></PresentaionQuality>
    // <PresentaionQualityResult></PresentaionQualityResult>
  )
}

export default App
