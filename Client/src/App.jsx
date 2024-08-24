import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PresentaionQuality from './Pages/PresentationQuality/PresentationQuality'

function App() {
  const [count, setCount] = useState(0)

  return (
    <PresentaionQuality></PresentaionQuality>
  )
}

export default App
