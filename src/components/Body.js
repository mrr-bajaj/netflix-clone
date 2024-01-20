import React from 'react'
import Browse from './Browse'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './Login'

const Body = () => {

    const appRouter = createBrowserRouter([
        {
            path: '/',
            element: <Login></Login>
        },
        {
            path: 'browse',
            element: <Browse></Browse>
        }
    ])

  return (
    <div>
        <RouterProvider router={appRouter}></RouterProvider>
    </div>
  )
}

export default Body