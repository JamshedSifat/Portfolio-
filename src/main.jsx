import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from "react-router/dom";
import {router} from "../src/Router/Routes.jsx"
import { ThemeProvider } from '../src/Components/Context/ThemeContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={router}>
      </RouterProvider>
    </ThemeProvider>
  </StrictMode>,
)