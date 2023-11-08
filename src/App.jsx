import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Recipe from './pages/FullRecipe'
import Results from './pages/Results'

export default function App() {

  return (
    <>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/recipe/:id' element={<Recipe />} />
        <Route path='/search/:id' element={<Results />} />
      </Routes>
      <Footer />
    </BrowserRouter>
    </>
  )
}