import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ListContacts from './pages/ListContacts'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ListContacts/>
    </>
  )
}

export default App
