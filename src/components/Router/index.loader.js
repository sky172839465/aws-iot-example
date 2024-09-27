import { defer } from 'react-router-dom'

const loader = ({ request }) => {
  const { pathname } = new URL(request.url)
  console.log(pathname)
  return defer({})
}

export default loader
