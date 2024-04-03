import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import RootLayout from './layouts/root-layout'
import SignInPage from './routes/sign-in'
import SignUpPage from './routes/sign-up'
import UploadFile from './components/upload-file'
import About from './routes/about'
import Home from './routes/home'
import DocumentViewer from './components/document-viewer'
 
const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/sign-in", element: <SignInPage /> },
      { path: "/sign-up", element: <SignUpPage /> },
      {path: "/upload", element: <UploadFile />},
      {path: "/files/:id", element: <DocumentViewer />}
    ]
  }
])
 
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)