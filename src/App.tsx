
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Index from './pages/Index'
import NotFound from './pages/NotFound'
import { Toaster } from 'sonner'

function App() {
  return (
    <Router>
      <Toaster position="top-center" richColors closeButton />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
