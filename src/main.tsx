import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './authContext/AuthProvider.tsx'
import { OnboardingProvider } from './context/OnboardingProvider.tsx'


createRoot(document.getElementById('root')!).render(

  <BrowserRouter>
    <AuthProvider>
      <OnboardingProvider>
        <App />
      </OnboardingProvider>
    </AuthProvider>
  </BrowserRouter>

)
