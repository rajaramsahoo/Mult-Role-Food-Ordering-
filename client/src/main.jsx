import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './context/AuthProvider'
import { ResProvider } from './context/ResProvider'
import { MenuProvider } from './context/MenuProvider'
import { CartProvider } from './context/CartProvider'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <MenuProvider> <ResProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </ResProvider></MenuProvider>
      </CartProvider>
    </BrowserRouter>
  </StrictMode>,
)
