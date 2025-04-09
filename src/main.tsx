import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router/router'
import { CommerceProvider } from './context/CommerceProvider'



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CommerceProvider>
      <RouterProvider router={router} />
    </CommerceProvider>
  </StrictMode>,
)
