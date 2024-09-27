import { Suspense } from 'react'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'

import SkeletonHome from '../SkeletonHome/index.jsx'
import ErrorElement from './ErrorElement.jsx'
import loader from './index.loader'
import Layout from './Layout.jsx'

const withErrorElement = (routes) => routes.map((item) => {
  const {
    element: Comp, ...route
  } = item
  return {
    ...route,
    element: <Comp />,
    errorElement: <ErrorElement />
  }
})

const Router = (props) => {
  const { routes, basename = '/' } = props
  const appBaseName = `${window.APP_BASENAME}${basename}`
  const totalRoutes = [
    {
      element: <Layout appBaseName={appBaseName} />,
      loader,
      children: withErrorElement([
        ...routes,
        {
          path: '/test',
          element: SkeletonHome
        },
        {
          path: '/*',
          element: ErrorElement
        }
      ])
    }
  ]
  // console.log(totalRoutes, appBaseName)
  const router = createBrowserRouter(totalRoutes, { basename: appBaseName })
  return (
    <Suspense
      fallback={(
        <SkeletonHome className='fixed top-0 z-0' />
      )}
    >
      <RouterProvider router={router} />
    </Suspense>
  )
}

export default Router