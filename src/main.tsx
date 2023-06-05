import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import routes from './routes/Routes'
import './index.css'
import { SWRConfig } from 'swr'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
const router = createBrowserRouter(routes)
root.render(
  <React.StrictMode>
    <SWRConfig>
      <RouterProvider router={router} />
    </SWRConfig>
  </React.StrictMode>
)
