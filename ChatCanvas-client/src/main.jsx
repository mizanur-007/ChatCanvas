import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './Routes/Routes.jsx'
import { ThemeProvider, createTheme } from '@mui/material'
import AuthProvider from './Provider/AuthProvider.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { HelmetProvider } from 'react-helmet-async'
import 'react-awesome-button/dist/styles.css';



const theme = createTheme({
  palette: {
    primary: {
      main: '#76c893',
      light: '#CCF8E7',
      lighter: '#ECF8F4',
      bronze:'#CD7F32'
    },
    secondary: {
      main: '#b5e48c',
      light:'#caf0f8'
    },
  },
});

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
<HelmetProvider>
<ThemeProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
    <AuthProvider>
    <RouterProvider router={router}></RouterProvider>
    <ToastContainer />
    </AuthProvider>
    </QueryClientProvider>
    </ThemeProvider>
</HelmetProvider>
  </React.StrictMode>,
)
