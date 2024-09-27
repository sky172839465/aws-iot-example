

import Root from './components/Root'
import Router from './components/Router'
import getRoutes from './components/Router/getRoutes'

const pages = import.meta.glob('./**/pages/**/index.jsx')
const loaders = import.meta.glob('./**/pages/**/index.loader.js')
const dynamicRoutes = getRoutes(pages, loaders, true)

function App() {
  return (
    <Root>
      <Router
        routes={dynamicRoutes}
        isAuthRoutes={false}
        isRootRoutes
      />
    </Root>
  )
}

export default App
