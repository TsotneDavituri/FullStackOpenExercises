import { Link } from 'react-router-dom'

const Menu = () => {
  const padding = {
    paddingRight: 5,
  }
  return (
    <>
      <Link style={padding} to="/">
        blogs
      </Link>
      <Link style={padding} to="/create">
        create
      </Link>
      <Link style={padding} to="/users">
        users
      </Link>
      <Link style={padding} to="/user">
        look up user
      </Link>
    </>
  )
}

export default Menu
