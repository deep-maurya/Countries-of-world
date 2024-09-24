
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider } from './Components/Context/AuthContext.jsx'


createRoot(document.getElementById('root')).render(
  <>
  
    <BrowserRouter>
    <AuthProvider>
        <ChakraProvider>
            <App />
        </ChakraProvider>
        </AuthProvider>
    </BrowserRouter>
  
  </>
)
