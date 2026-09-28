import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app/App.jsx'
import { AuthProvider } from './modules/auth/context/AuthContext.jsx'
import { ProductProvider } from './modules/product/context/ProductContext.jsx'

createRoot(document.getElementById('root')).render(  
  <AuthProvider>
    <ProductProvider>
      <App />
    </ProductProvider>    
  </AuthProvider>
)
